export interface CreemDiscountBody {
  id: string
  mode: 'test' | 'live'
  object: string
  status: string
  name: string
  code: string
  type: string
  amount: number
  percentage: number
  expiry_date: string
  max_redemptions: number
  duration: string
  duration_in_months: number
  applies_to_products: string[]
}
