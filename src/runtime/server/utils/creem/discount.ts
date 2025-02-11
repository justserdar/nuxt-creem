import type {
  CreemDiscountBody,
} from '../../../types/creem/discount'

import {
  useFetchCreem,
} from './index'

export function useCreemDiscount() {
  return {
    create:
    <T>(body: CreemDiscountBody) => useFetchCreem<T>(`/discounts`, {
      method: 'POST',
      body,
    }),
  }
}
