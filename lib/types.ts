export interface MainAccord {
  name: string
  color_hex: string
  intensity_percent: number
}

export interface PyramidNote {
  note: string
  image: string
}

export interface ShopFormula {
  available: boolean
  oil_percentage: string
  notes: string
}

export interface Perfume {
  url: string
  name: string
  gender: string
  name_arabic_variants: string
  brand: string
  brand_logo: string
  image_url: string
  image_url_2x: string
  description: string
  release_year: string
  perfumer: string
  main_accords: MainAccord[]
  pyramid: {
    [key: string]: PyramidNote[] | undefined
  }
  rating_value: string
  rating_count: string
  noses: string[]
  shop_formula?: ShopFormula
}
