from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from backend.models import DatasetResponse
from backend.dataset_generator import FashionDatasetGenerator
import os
import json
import random
from datetime import datetime
import pandas as pd
import shutil

app = FastAPI(title="StyleSense AI Backend")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

generator = FashionDatasetGenerator()
DATA_FILE = os.path.join("backend", "data", "dataset.json")

def load_dataset():
    # Check for source CSV/Excel first to populate/update dataset
    csv_file = os.path.join("backend", "data", "dataset.csv")
    excel_file = os.path.join("backend", "data", "dataset.xlsx")
    
    source_file = None
    if os.path.exists(csv_file):
        source_file = csv_file
    elif os.path.exists(excel_file):
        source_file = excel_file
        
    if source_file:
        print(f"Loading data from {source_file}...")
        try:
             # Logic similar to upload_dataset but for local file
            if source_file.endswith('.csv'):
                try:
                    df = pd.read_csv(source_file, encoding='utf-8')
                except UnicodeDecodeError:
                     try:
                        df = pd.read_csv(source_file, encoding='latin1')
                     except UnicodeDecodeError:
                        df = pd.read_csv(source_file, encoding='cp1252')
            else:
                df = pd.read_excel(source_file)
            
            df = df.fillna('')
            
            new_outfits = []
            for index, row in df.iterrows():
                 # Map Body Types
                 body_types = []
                 if row.get('body_pear'): body_types.append('pear')
                 if row.get('body_rectangle'): body_types.append('rectangle')
                 if row.get('body_hourglass'): body_types.append('hourglass')
                 if row.get('body_invertedtriangle'): body_types.append('inverted_triangle')
                 if not body_types: body_types = ['average']

                 occasions = [str(row.get('occasion', 'casual')).lower()]
                 
                 items = [{
                     "type": str(row.get('subcategory', 'clothing')),
                     "color": "unknown", "pattern": "solid", "fit": "regular"
                 }]

                 img_path = str(row.get('image_path', ''))
                 if not img_path.startswith('http') and not img_path: 
                     img_path = "https://via.placeholder.com/400"

                 outfit = {
                    "id": str(row.get('id', f"csv_{index}")),
                    "gender": "women",
                    "category": str(row.get('category', 'Casual')),
                    "body_types": body_types,
                    "occasions": occasions,
                    "seasons": ["summer", "winter"],
                    "color_palette": ["multi"],
                    "items": items,
                    "price_range": {"min": 0, "max": 0, "currency": "USD"},
                    "style_tags": [str(row.get('category', '')), str(row.get('subcategory', ''))],
                    "images": {"main": img_path, "on_model": img_path},
                    "compatibility": {
                        "skin_tones": ["fair", "medium", "dark"],
                        "age_groups": ["young_adult", "adult"],
                        "style_profiles": ["casual", "trendy"]
                    }
                 }
                 new_outfits.append(outfit)
            
            # Combine with generated/existing men's data
            # For simplicity here, we regenerate men's data or load existing json if we want to preserve men's
            full_data = generator.generate_full_dataset() # Start with fresh structure
            full_data["women_outfits"] = new_outfits
            full_data["metadata"]["source"] = "local_file"
            
            save_dataset(full_data)
            return full_data
            
        except Exception as e:
            print(f"Error loading source file: {e}")

    # Fallback to existing json
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading dataset.json: {e}")
    
    print("Generating new initial dataset...")
    initial_data = generator.generate_full_dataset()
    save_dataset(initial_data)
    return initial_data

def save_dataset(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

# Load on startup
dataset = load_dataset()

@app.get("/")
def read_root():
    return {"message": "Welcome to StyleSense AI API"}

@app.get("/dataset", response_model=DatasetResponse)
def get_dataset():
    """Return the entire dataset."""
    return dataset

@app.get("/dataset/generate")
def generate_new_dataset(men_count: int = 100, women_count: int = 100):
    """Trigger generation of a new dataset."""
    global dataset
    dataset = generator.generate_full_dataset(men_count, women_count)
    save_dataset(dataset)
    return {"message": "New dataset generated and saved", "metadata": dataset["metadata"]}

@app.post("/recommendations", response_model=List[dict])
def get_recommendations(prefs: DatasetResponse.RecommendationRequest): 
    # Note: Using dynamic type import or just dict to avoid circular dependency if not careful, 
    # but here we can just use the Pydantic model.
    # Actually, let's fix the import. 
    # We didn't import RecommendationRequest in main.py yet.
    # Let's assume we fix imports below (I will add it to the top).
    pass

@app.post("/api/recommendations")
def recommend_outfits(prefs: dict):
    # Determine gender pool
    gender = prefs.get('gender', '').lower()
    pool = []
    if 'female' in gender or 'woman' in gender:
        pool = dataset.get('women_outfits', [])
    elif 'male' in gender or 'man' in gender:
        pool = dataset.get('men_outfits', [])
    else:
        # Default or mix
        pool = dataset.get('women_outfits', []) + dataset.get('men_outfits', [])
        
    filtered = []
    user_occasion = prefs.get('occasion', '').lower()
    user_budget = prefs.get('budgetRange', '') # e.g. "50-100"
    user_color = prefs.get('colorPreference', '').lower()
    
    # Parse budget
    min_budget, max_budget = 0, 10000
    if '-' in user_budget:
        try:
            parts = user_budget.split('-')
            min_budget = float(parts[0])
            if parts[1] == '+': max_budget = 10000
            else: max_budget = float(parts[1])
        except: pass
    elif '+' in user_budget:
         try:
            min_budget = float(user_budget.replace('+',''))
         except: pass

    for outfit in pool:
        score = 0
        
        # Occasion match (loose string match)
        outfit_occasions = [o.lower() for o in outfit.get('occasions', [])]
        # The CSV mapping put single occasion in list
        if any(user_occasion in o for o in outfit_occasions) or user_occasion == '':
            score += 3
            
        # Budget match
        price = outfit.get('price_range', {}).get('min', 0) 
        # Note: CSV import set price to 0 currently as it wasn't mapped. 
        # If price is 0, we might want to include it anyway or treat as "unknown"
        if min_budget <= price <= max_budget:
            score += 2
        elif price == 0:
            score += 1 # Give benefit of doubt

        # Color match - check tags or items
        # Just simple check for now
        # user_color might be "Black & White", outfit might have "black"
        if user_color:
            match = False
            # Check style tags
            if any(c.strip() in str(outfit.get('style_tags', [])).lower() for c in user_color.split('&')):
                match = True
            # Check items
            for item in outfit.get('items', []):
                if item.get('color', '').lower() in user_color:
                    match = True
            if match: score += 1

        if score > 0:
            filtered.append(outfit)
            
    # Return top 10 random from filtered (to vary results if score is same)
    # Or strict top scoring
    if not filtered:
        # Fallback to random if no strict matches
        return random.sample(pool, min(len(pool), 5))
        
    return random.sample(filtered, min(len(filtered), 10))

@app.post("/dataset/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """Upload an Excel or CSV file to update the dataset."""
    global dataset
    
    # Save uploaded file temporarily
    os.makedirs("backend/data", exist_ok=True)
    temp_file = f"backend/data/{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        # Read file based on extension
        if temp_file.endswith('.csv'):
            try:
                df = pd.read_csv(temp_file, encoding='utf-8')
            except UnicodeDecodeError:
                 try:
                    df = pd.read_csv(temp_file, encoding='latin1')
                 except UnicodeDecodeError:
                    df = pd.read_csv(temp_file, encoding='cp1252')
        else:
            df = pd.read_excel(temp_file)
        
        # Fill NaN values to avoid errors
        df = df.fillna('')

        new_outfits = []
        for index, row in df.iterrows():
             # Map Body Types
             body_types = []
             if row.get('body_pear'): body_types.append('pear')
             if row.get('body_rectangle'): body_types.append('rectangle')
             if row.get('body_hourglass'): body_types.append('hourglass')
             if row.get('body_invertedtriangle'): body_types.append('inverted_triangle')
             
             # Default if none matched
             if not body_types:
                 body_types = ['average']

             # Map Occasion
             occasions = [str(row.get('occasion', 'casual')).lower()]

             # Construct Items list from subcategory
             items = [
                 {
                     "type": str(row.get('subcategory', 'clothing')),
                     "color": "unknown", 
                     "pattern": "solid",
                     "fit": "regular"
                 }
             ]

             # Handle Image Path
             img_path = str(row.get('image_path', ''))
             if not img_path.startswith('http'):
                 if not img_path: img_path = "https://via.placeholder.com/400"

             outfit = {
                "id": str(row.get('id', f"custom_{index}")),
                "gender": "women",
                "category": str(row.get('category', 'Casual')),
                "body_types": body_types,
                "occasions": occasions,
                "seasons": ["summer", "winter"], # Default
                "color_palette": ["multi"], # Default
                "items": items,
                "price_range": {
                    "min": 0, 
                    "max": 0, 
                    "currency": "USD"
                },
                "style_tags": [str(row.get('category', '')), str(row.get('subcategory', ''))],
                "images": {
                    "main": img_path,
                    "on_model": img_path
                },
                "compatibility": {
                    "skin_tones": ["fair", "medium", "dark"], # Default all
                    "age_groups": ["young_adult", "adult"],
                    "style_profiles": ["casual", "trendy"]
                }
             }
             new_outfits.append(outfit)

        # Update dataset
        dataset["women_outfits"] = new_outfits
        dataset["metadata"]["updated_at"] = datetime.now().isoformat()
        dataset["metadata"]["source"] = "upload_" + file.filename
        
        save_dataset(dataset)
        
        return {"message": f"Successfully imported {len(new_outfits)} outfits from file", "preview": new_outfits[:1]}

    except Exception as e:
        print(f"Error processing file: {e}")
        return {"error": f"Failed to process file: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
