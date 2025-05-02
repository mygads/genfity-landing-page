export interface Feature {
  name: string
  included: boolean
}

export interface Package {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  subcategory: string
  features: Feature[]
  popular?: boolean
  bgColor?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
}

export interface Addon {
  id: string
  name: string
  description: string
  price: number
  image: string
  category?: string
}
