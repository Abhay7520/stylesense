import random
from typing import List, Dict, Any
from datetime import datetime
from backend.models import OutfitData, FashionItem, PriceRange, Images, Compatibility

# Men's Fashion Data Templates
MEN_OUTFIT_TEMPLATES = {
    'casual': {
        'items': [
            {'type': 'tshirt', 'color': 'white', 'pattern': 'solid', 'fit': 'regular'},
            {'type': 'jeans', 'color': 'blue', 'pattern': 'solid', 'fit': 'slim'},
            {'type': 'sneakers', 'color': 'white', 'style': 'casual'}
        ],
        'price_range': {'min': 30, 'max': 120},
        'style_tags': ['casual', 'comfortable', 'everyday']
    },
    'business': {
        'items': [
            {'type': 'shirt', 'color': 'white', 'pattern': 'solid', 'fit': 'slim'},
            {'type': 'pants', 'color': 'navy', 'pattern': 'solid', 'fit': 'tailored'},
            {'type': 'shoes', 'color': 'brown', 'style': 'oxford'},
            {'type': 'belt', 'color': 'brown', 'style': 'leather'}
        ],
        'price_range': {'min': 100, 'max': 300},
        'style_tags': ['professional', 'classic', 'elegant']
    },
    'formal': {
        'items': [
            {'type': 'suit_jacket', 'color': 'black', 'pattern': 'solid', 'fit': 'slim'},
            {'type': 'dress_shirt', 'color': 'white', 'pattern': 'solid', 'fit': 'slim'},
            {'type': 'pants', 'color': 'black', 'pattern': 'solid', 'fit': 'slim'},
            {'type': 'shoes', 'color': 'black', 'style': 'dress_shoes'},
            {'type': 'tie', 'color': 'black', 'pattern': 'solid'}
        ],
        'price_range': {'min': 200, 'max': 800},
        'style_tags': ['formal', 'sophisticated', 'classic']
    }
}

# Women's Fashion Data Templates
WOMEN_OUTFIT_TEMPLATES = {
    'casual': {
        'items': [
            {'type': 'top', 'color': 'pink', 'pattern': 'solid', 'fit': 'relaxed'},
            {'type': 'jeans', 'color': 'blue', 'pattern': 'solid', 'fit': 'skinny'},
            {'type': 'shoes', 'color': 'white', 'style': 'sneakers'}
        ],
        'price_range': {'min': 40, 'max': 150},
        'style_tags': ['casual', 'feminine', 'comfortable']
    },
    'business': {
        'items': [
            {'type': 'blouse', 'color': 'white', 'pattern': 'solid', 'fit': 'regular'},
            {'type': 'blazer', 'color': 'navy', 'pattern': 'solid', 'fit': 'structured'},
            {'type': 'pants', 'color': 'gray', 'pattern': 'solid', 'fit': 'straight'},
            {'type': 'heels', 'color': 'nude', 'height': '3_inches'}
        ],
        'price_range': {'min': 80, 'max': 250},
        'style_tags': ['professional', 'modern', 'elegant']
    },
    'party': {
        'items': [
            {'type': 'dress', 'color': 'red', 'pattern': 'solid', 'fit': 'bodycon', 'length': 'midi'},
            {'type': 'heels', 'color': 'black', 'height': '4_inches', 'style': 'stilettos'},
            {'type': 'clutch', 'color': 'gold', 'style': 'evening'}
        ],
        'price_range': {'min': 100, 'max': 400},
        'style_tags': ['glamorous', 'bold', 'sexy']
    }
}

COLOR_PALETTES = {
    'summer': ['white', 'beige', 'light_blue', 'coral', 'mint'],
    'winter': ['black', 'navy', 'burgundy', 'forest_green', 'gray'],
    'spring': ['pastel_pink', 'light_yellow', 'mint_green', 'lavender', 'peach'],
    'autumn': ['orange', 'brown', 'mustard', 'burgundy', 'olive']
}

BODY_TYPES = {
    'men': ['slim', 'athletic', 'average', 'heavy_build'],
    'women': ['petite', 'slim', 'athletic', 'curvy', 'plus_size']
}

OCCASIONS = {
    'men': ['casual', 'business', 'formal', 'date_night', 'weekend', 'sports', 'beach'],
    'women': ['casual', 'business', 'party', 'date_night', 'brunch', 'wedding', 'beach']
}

SKIN_TONES = ['fair', 'light', 'medium', 'olive', 'dark', 'deep']
AGE_GROUPS = ['teen', 'young_adult', 'adult', 'middle_aged', 'senior']
STYLE_PROFILES = ['minimalist', 'classic', 'trendy', 'bohemian', 'sporty', 'elegant', 'casual']

class FashionDatasetGenerator:
    def _generate_id(self, gender: str, category: str, index: int) -> str:
        return f"{gender}_{category}_{str(index).zfill(3)}"

    def _get_random_element(self, array: List[Any]) -> Any:
        return random.choice(array)

    def _get_random_elements(self, array: List[Any], count: int) -> List[Any]:
        return random.sample(array, min(count, len(array)))

    def _get_random_color_palette(self, season: str) -> List[str]:
        season_colors = COLOR_PALETTES.get(season, COLOR_PALETTES['summer'])
        return self._get_random_elements(season_colors, 3)

    def _generate_outfit_image_urls(self, gender: str, category: str) -> str:
        # Placeholder logic
        seed = "".join(random.choices("abcdefghijklmnopqrstuvwxyz0123456789", k=7))
        return f"https://source.unsplash.com/400x500/?{gender},{category},fashion&sig={seed}"

    def generate_men_outfits(self, count: int = 50) -> List[Dict[str, Any]]:
        outfits = []
        categories = list(MEN_OUTFIT_TEMPLATES.keys())
        seasons = list(COLOR_PALETTES.keys())

        for i in range(count):
            category = self._get_random_element(categories)
            template = MEN_OUTFIT_TEMPLATES[category]
            season = self._get_random_element(seasons)

            # Reconstruct items as Pydantic models then dict
            items = [FashionItem(**item) for item in template['items']]
            
            outfit = OutfitData(
                id=self._generate_id('men', category, i + 1),
                gender='men',
                category=category,
                body_types=[self._get_random_element(BODY_TYPES['men'])],
                occasions=[self._get_random_element(OCCASIONS['men'])],
                seasons=[season],
                color_palette=self._get_random_color_palette(season),
                items=items,
                price_range=PriceRange(**template['price_range'], currency='USD'),
                style_tags=template['style_tags'],
                images=Images(
                    main=self._generate_outfit_image_urls('men', category),
                    on_model=self._generate_outfit_image_urls('men', category)
                ),
                compatibility=Compatibility(
                    skin_tones=self._get_random_elements(SKIN_TONES, 3),
                    age_groups=self._get_random_elements(AGE_GROUPS, 2),
                    style_profiles=self._get_random_elements(STYLE_PROFILES, 2)
                )
            )
            outfits.append(outfit.dict())
        
        return outfits

    def generate_women_outfits(self, count: int = 50) -> List[Dict[str, Any]]:
        outfits = []
        categories = list(WOMEN_OUTFIT_TEMPLATES.keys())
        seasons = list(COLOR_PALETTES.keys())

        for i in range(count):
            category = self._get_random_element(categories)
            template = WOMEN_OUTFIT_TEMPLATES[category]
            season = self._get_random_element(seasons)

            items = [FashionItem(**item) for item in template['items']]

            outfit = OutfitData(
                id=self._generate_id('women', category, i + 1),
                gender='women',
                category=category,
                body_types=[self._get_random_element(BODY_TYPES['women'])],
                occasions=[self._get_random_element(OCCASIONS['women'])],
                seasons=[season],
                color_palette=self._get_random_color_palette(season),
                items=items,
                price_range=PriceRange(**template['price_range'], currency='USD'),
                style_tags=template['style_tags'],
                images=Images(
                    main=self._generate_outfit_image_urls('women', category),
                    on_model=self._generate_outfit_image_urls('women', category)
                ),
                compatibility=Compatibility(
                    skin_tones=self._get_random_elements(SKIN_TONES, 3),
                    age_groups=self._get_random_elements(AGE_GROUPS, 2),
                    style_profiles=self._get_random_elements(STYLE_PROFILES, 2)
                )
            )
            outfits.append(outfit.dict())
            
        return outfits

    def generate_full_dataset(self, men_count: int = 100, women_count: int = 100):
        return {
            "men_outfits": self.generate_men_outfits(men_count),
            "women_outfits": self.generate_women_outfits(women_count),
            "metadata": {
                "total_outfits": men_count + women_count,
                "generated_at": datetime.now().isoformat(),
                "version": "1.0"
            }
        }
