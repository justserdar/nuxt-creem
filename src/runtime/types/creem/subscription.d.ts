import type { CreemPagination } from '../index'

export type CreemSubscriptionBody = {
  id: string
  object: string
  customer_id: string
  product_id: string
  status: string
}

export type CreemSubscriptionListBody = {
  items: CreemSubscriptionBody[]
  pagination: CreemPagination
}
