import type { RuntimeConfig } from 'nuxt/schema'

export type CreemConfig = keyof RuntimeConfig['creem']
export interface CreemPagination {
  total_records: number
  total_pages: number
  current_page: number
  next_page: number
  prev_page: number
}

export * from './creem/checkout'
export * from './creem/product'
export * from './creem/customer'
export * from './creem/transactions'
export * from './creem/license'
export * from './creem/discount'
export * from './creem/subscription'
