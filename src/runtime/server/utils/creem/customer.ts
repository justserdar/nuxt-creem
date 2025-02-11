import type {
  CreemCustomerBody,
} from '../../../types/creem/customer'

import {
  useFetchCreem,
} from './index'

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
    portal:
    <T>(body: CreemCustomerBody) => useFetchCreem<T>(`/customers/billing`, {
      method: 'POST',
      body,
    }),
  }
}
