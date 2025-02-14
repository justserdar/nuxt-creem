import type { CreemPagination } from '..'

export interface CreemTransactionBody {
  items: {
    id: string
    mode: 'test' | 'live'
    object: string
    amount: number
    amount_paid: number
    currency: string
    type: string
    tax_country: string
    tax_amount: number
    status: string
    refunded_amount: number
    order: object
    subscription: object
    customer: object
    description: string
    period_start: number
    period_end: number
    created_at: number
  }[]
}

export interface CreemTransactionListBody {
  items: CreemTransactionBody['items']
  pagination: CreemPagination
}
