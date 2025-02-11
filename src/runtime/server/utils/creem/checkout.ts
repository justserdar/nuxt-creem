import type { CreemCheckoutBody } from '../../../types/creem/checkout'

import {
  useFetchCreem,
} from '#imports'

export function useCreemCheckout() {
  return {
    createSession:
      <T>(body?: CreemCheckoutBody) => useFetchCreem<T>('/checkouts', {
        method: 'POST',
        body,
      }),
  }
}
