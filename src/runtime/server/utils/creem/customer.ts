import type {
  CreemCustomerBody,
} from '../../../types/creem/customer'

import {
  useFetchCreem,
} from '#imports'

export function useCreemCustomer() {
  return {
    get:
    <T>(customerId: CreemCustomerBody['id'], email: CreemCustomerBody['email']) => useFetchCreem<T>(`/customers`, {
      method: 'GET',
      query: {
        customerId,
        email,
      },
    }),
  }
}
