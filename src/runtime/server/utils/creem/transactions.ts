import type {
  CreemTransactionListBody,
} from '../../../types/creem/transactions'

import {
  useFetchCreem,
} from '#imports'

export function useCreemTransactions() {
  return {
    list:
    <T>(customerId: CreemTransactionListBody['items'][0]['id'], pageNumber: number, pageSize: number) => useFetchCreem<T>(`/transactions/search`, {
      method: 'GET',
      query: {
        customerId,
        pageNumber,
        pageSize,
      },
    }),
  }
}
