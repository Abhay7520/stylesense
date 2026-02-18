// Fashion Dataset Generator for StyleSense AI

export interface FashionItem {
  type: string
  color: string
  pattern?: string
  fit?: string
  style?: string
  material?: string
}

export interface OutfitData {
  id: string
  gender: 'men' | 'women'
  category: string
  body_types: string[]
  occasions: string[]
  seasons: string[]
  color_palette: string[]
  items: FashionItem[]
  price_range: {
    min: number
    max: number
    currency: string
  }
  style_tags: string[]
  images: {
    main: string
    details?: string[]
    on_model?: string
  }
  compatibility: {
    skin_tones: string[]
    age_groups: string[]
    style_profiles: string[]
  }
}

// Men's Fashion Data Templates
const menOutfitTemplates = {
  casual: {
    items: [
      { type: 'tshirt', color: 'white', pattern: 'solid', fit: 'regular' },
      { type: 'jeans', color: 'blue', pattern: 'solid', fit: 'slim' },
      { type: 'sneakers', color: 'white', style: 'casual' }
    ],
    price_range: { min: 30, max: 120 },
    style_tags: ['casual', 'comfortable', 'everyday']
  },
  business: {
    items: [
      { type: 'shirt', color: 'white', pattern: 'solid', fit: 'slim' },
      { type: 'pants', color: 'navy', pattern: 'solid', fit: 'tailored' },
      { type: 'shoes', color: 'brown', style: 'oxford' },
      { type: 'belt', color: 'brown', style: 'leather' }
    ],
    price_range: { min: 100, max: 300 },
    style_tags: ['professional', 'classic', 'elegant']
  },
  formal: {
    items: [
      { type: 'suit_jacket', color: 'black', pattern: 'solid', fit: 'slim' },
      { type: 'dress_shirt', color: 'white', pattern: 'solid', fit: 'slim' },
      { type: 'pants', color: 'black', pattern: 'solid', fit: 'slim' },
      { type: 'shoes', color: 'black', style: 'dress_shoes' },
      { type: 'tie', color: 'black', pattern: 'solid' }
    ],
    price_range: { min: 200, max: 800 },
    style_tags: ['formal', 'sophisticated', 'classic']
  }
}

// Women's Fashion Data Templates
const womenOutfitTemplates = {
  casual: {
    items: [
      { type: 'top', color: 'pink', pattern: 'solid', fit: 'relaxed' },
      { type: 'jeans', color: 'blue', pattern: 'solid', fit: 'skinny' },
      { type: 'shoes', color: 'white', style: 'sneakers' }
    ],
    price_range: { min: 40, max: 150 },
    style_tags: ['casual', 'feminine', 'comfortable']
  },
  business: {
    items: [
      { type: 'blouse', color: 'white', pattern: 'solid', fit: 'regular' },
      { type: 'blazer', color: 'navy', pattern: 'solid', fit: 'structured' },
      { type: 'pants', color: 'gray', pattern: 'solid', fit: 'straight' },
      { type: 'heels', color: 'nude', height: '3_inches' }
    ],
    price_range: { min: 80, max: 250 },
    style_tags: ['professional', 'modern', 'elegant']
  },
  party: {
    items: [
      { type: 'dress', color: 'red', pattern: 'solid', fit: 'bodycon', length: 'midi' },
      { type: 'heels', color: 'black', height: '4_inches', style: 'stilettos' },
      { type: 'clutch', color: 'gold', style: 'evening' }
    ],
    price_range: { min: 100, max: 400 },
    style_tags: ['glamorous', 'bold', 'sexy']
  }
}

// Color palettes for different seasons and styles
const colorPalettes = {
  summer: ['white', 'beige', 'light_blue', 'coral', 'mint'],
  winter: ['black', 'navy', 'burgundy', 'forest_green', 'gray'],
  spring: ['pastel_pink', 'light_yellow', 'mint_green', 'lavender', 'peach'],
  autumn: ['orange', 'brown', 'mustard', 'burgundy', 'olive']
}

const bodyTypes = {
  men: ['slim', 'athletic', 'average', 'heavy_build'],
  women: ['petite', 'slim', 'athletic', 'curvy', 'plus_size']
}

const occasions = {
  men: ['casual', 'business', 'formal', 'date_night', 'weekend', 'sports', 'beach'],
  women: ['casual', 'business', 'party', 'date_night', 'brunch', 'wedding', 'beach']
}

const skinTones = ['fair', 'light', 'medium', 'olive', 'dark', 'deep']
const ageGroups = ['teen', 'young_adult', 'adult', 'middle_aged', 'senior']
const styleProfiles = ['minimalist', 'classic', 'trendy', 'bohemian', 'sporty', 'elegant', 'casual']

export class FashionDatasetGenerator {
  private generateId(gender: string, category: string, index: number): string {
    return `${gender}_${category}_${String(index).padStart(3, '0')}`
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  private getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  private getRandomColorPalette(season: string): string[] {
    const seasonColors = colorPalettes[season as keyof typeof colorPalettes] || colorPalettes.summer
    return this.getRandomElements(seasonColors, 3)
  }

  private generateOutfitImageUrls(gender: string, category: string): string {
    // In a real implementation, these would be actual image URLs
    // For now, using Unsplash URLs as placeholders
    const seed = Math.random().toString(36).substring(7)
    return `https://source.unsplash.com/400x500/?${gender},${category},fashion&sig=${seed}`
  }

  generateMenOutfits(count: number = 50): OutfitData[] {
    const outfits: OutfitData[] = []
    const categories = Object.keys(menOutfitTemplates)
    const seasons = Object.keys(colorPalettes)

    for (let i = 0; i < count; i++) {
      const category = this.getRandomElement(categories)
      const template = menOutfitTemplates[category as keyof typeof menOutfitTemplates]
      const season = this.getRandomElement(seasons)

      const outfit: OutfitData = {
        id: this.generateId('men', category, i + 1),
        gender: 'men',
        category,
        body_types: [this.getRandomElement(bodyTypes.men)],
        occasions: [this.getRandomElement(occasions.men)],
        seasons: [season],
        color_palette: this.getRandomColorPalette(season),
        items: template.items,
        price_range: { ...template.price_range, currency: 'USD' },
        style_tags: template.style_tags,
        images: {
          main: this.generateOutfitImageUrls('men', category),
          on_model: this.generateOutfitImageUrls('men', category)
        },
        compatibility: {
          skin_tones: this.getRandomElements(skinTones, 3),
          age_groups: this.getRandomElements(ageGroups, 2),
          style_profiles: this.getRandomElements(styleProfiles, 2)
        }
      }

      outfits.push(outfit)
    }

    return outfits
  }

  generateWomenOutfits(count: number = 50): OutfitData[] {
    const outfits: OutfitData[] = []
    const categories = Object.keys(womenOutfitTemplates)
    const seasons = Object.keys(colorPalettes)

    for (let i = 0; i < count; i++) {
      const category = this.getRandomElement(categories)
      const template = womenOutfitTemplates[category as keyof typeof womenOutfitTemplates]
      const season = this.getRandomElement(seasons)

      const outfit: OutfitData = {
        id: this.generateId('women', category, i + 1),
        gender: 'women',
        category,
        body_types: [this.getRandomElement(bodyTypes.women)],
        occasions: [this.getRandomElement(occasions.women)],
        seasons: [season],
        color_palette: this.getRandomColorPalette(season),
        items: template.items,
        price_range: { ...template.price_range, currency: 'USD' },
        style_tags: template.style_tags,
        images: {
          main: this.generateOutfitImageUrls('women', category),
          on_model: this.generateOutfitImageUrls('women', category)
        },
        compatibility: {
          skin_tones: this.getRandomElements(skinTones, 3),
          age_groups: this.getRandomElements(ageGroups, 2),
          style_profiles: this.getRandomElements(styleProfiles, 2)
        }
      }

      outfits.push(outfit)
    }

    return outfits
  }

  generateFullDataset(menCount: number = 100, womenCount: number = 100) {
    return {
      men_outfits: this.generateMenOutfits(menCount),
      women_outfits: this.generateWomenOutfits(womenCount),
      metadata: {
        total_outfits: menCount + womenCount,
        generated_at: new Date().toISOString(),
        version: '1.0'
      }
    }
  }

  // Export to JSON file
  exportDataset(dataset: any, filename: string = 'fashion_dataset.json') {
    const dataStr = JSON.stringify(dataset, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = filename
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
}

// Usage example:
// const generator = new FashionDatasetGenerator()
// const dataset = generator.generateFullDataset(100, 100)
// generator.exportDataset(dataset, 'stylesense_dataset.json')