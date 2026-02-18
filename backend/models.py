from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class FashionItem(BaseModel):
    type: str
    color: str
    pattern: str = "solid"
    fit: str = "regular"
    style: Optional[str] = None
    material: Optional[str] = None

class PriceRange(BaseModel):
    min: float
    max: float
    currency: str = "USD"

class Images(BaseModel):
    main: str
    on_model: Optional[str] = None
    angles: List[str] = []

class Compatibility(BaseModel):
    skin_tones: List[str] = []
    body_types: List[str] = []
    age_groups: List[str] = []
    style_profiles: List[str] = []

class OutfitData(BaseModel):
    id: str
    gender: str
    category: str
    items: List[FashionItem]
    price_range: PriceRange
    style_tags: List[str]
    images: Images
    compatibility: Compatibility
    body_types: List[str] = []
    occasions: List[str] = []
    seasons: List[str] = []
    color_palette: List[str] = []

class DatasetResponse(BaseModel):
    men_outfits: List[OutfitData] = []
    women_outfits: List[OutfitData] = []
    metadata: Dict[str, Any] = {}

class RecommendationRequest(BaseModel):
    gender: Optional[str] = None
    occasion: Optional[str] = None
    color_preference: Optional[str] = None
    budget_range: Optional[str] = None # e.g., "50-100"
    body_type: Optional[str] = None
