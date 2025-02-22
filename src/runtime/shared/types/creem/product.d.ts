import type { CreemPagination } from '..'

export interface CreemProduct {
  id: string
  mode: 'test' | 'live'
  object: string
  name: string
  description: string
  image_url: string
  features: {
    id: string
    type: string
    description: string
  }[]
  price: number
  currency: string
  billing_type: string
  billing_period: string
  status: string
  tax_mode: string
  tax_category: string
  product_url: string
  default_success_url: string
  created_at: string
  updated_at: string
}

export interface CreemProductList {
  items: CreemProduct[]
  pagination: CreemPagination
}
