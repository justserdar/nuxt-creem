import type {
  CreemSubscriptionListBody,
} from '../../../types/creem/subscription'

import {
  useFetchCreem,
} from './index'

export function useCreemSubscriptions() {
  return {
    get:
    <T>(subscriptionId: CreemSubscriptionListBody['items'][0]['id']) => useFetchCreem<T>(`/subscriptions/${subscriptionId}`, {
      method: 'GET',
    }),
    update:
    <T>(subscriptionId: CreemSubscriptionListBody['items'][0]['id'], body: CreemSubscriptionListBody['items'][0]) => useFetchCreem<T>(`/subscriptions/${subscriptionId}`, {
      method: 'POST',
      body,
    }),
    cancel:
    <T>(subscriptionId: CreemSubscriptionListBody['items'][0]['id']) => useFetchCreem<T>(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
    }),
  }
}
