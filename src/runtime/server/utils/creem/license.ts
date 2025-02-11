import type {
  CreemLicenseBody,
} from '../../../types/creem/license'

import {
  useFetchCreem,
} from './index'

export function useCreemLicense() {
  return {
    validate:
    <T>(instanceId: CreemLicenseBody['instance']['id'], key: CreemLicenseBody['key']) => useFetchCreem<T>(`/licenses/validate`, {
      method: 'POST',
      body: {
        instanceId,
        key,
      },
    }),
    activate:
    <T>(instanceName: CreemLicenseBody['instance']['name'], key: CreemLicenseBody['key']) => useFetchCreem<T>(`/licenses/activate`, {
      method: 'POST',
      body: {
        instanceName,
        key,
      },
    }),
    deactivate:
    <T>(instanceName: CreemLicenseBody['instance']['name'], key: CreemLicenseBody['key']) => useFetchCreem<T>(`/licenses/deactivate`, {
      method: 'POST',
      body: {
        instanceName,
        key,
      },
    }),
  }
}
