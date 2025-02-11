import type {
  CreemProduct,
} from '../../../types/creem/product'

import {
  useFetchCreem,
} from './index'

export function useCreemProducts() {
  return {
    list:
    <T>() => useFetchCreem<T>(`/products/search`, {
      method: 'GET',
    }),
    get:
    <T>(productId: CreemProduct['id']) => useFetchCreem<T>(`/products`, {
      method: 'GET',
      query: {
        product_id: productId,
      },
    }),
    create:
    <T>(body: CreemProduct) => useFetchCreem<T>(`/products`, {
      method: 'POST',
      body,
    }),
  }
}
