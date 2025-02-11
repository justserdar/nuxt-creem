export type CreemCheckoutBody = {
  id: string
  mode: 'test' | 'live'
  object: string
  status: string
  request_id: string
  product: Record<string, unknown>
  units: number
  order: {
    id: string
    mode: 'test' | 'live'
    object: string
    customer: Record<string, unknown>
    product: Record<string, unknown>
    amount: number
    currency: string
    fx_amount: number
    fx_currency: string
    fx_rate: number
    status: 'pending' | 'completed' | 'failed'
    type: 'subscription' | 'one-time'
    affiliate: string
    created_at: string
    updated_at: string
  }
  subscription: Record<string, unknown>
  customer: Record<string, unknown>
  custom_fields: Array<{
    type: string
    key: string
    label: string
    optional: boolean
    text: {
      max_length: number
      min_length: number
    }
  }>
  checkout_url: string
  success_url: string
  metadata: Array<Record<string, unknown>>
}
