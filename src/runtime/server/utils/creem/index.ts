// The following nitropack import is from https://github.com/nuxt/module-builder/issues/141#issuecomment-2078248248
import type {} from 'nitropack'
import type { RuntimeConfig } from 'nuxt/schema'
import { consola } from 'consola'
import { defu } from 'defu'
import type {
  FetchRequest,
  FetchOptions,
  MappedResponseType,
  ResponseType,
} from 'ofetch'
import {
  ofetch,
} from 'ofetch'

import { useRuntimeConfig } from '#imports'

// TODO: map each api endpoint and method
export function useFetchCreem<
  T = any,
  R extends ResponseType = 'json',
>(
  req: FetchRequest,
  options?: FetchOptions<R> & {
    creemConfig?: keyof RuntimeConfig['creem']
  },
): Promise<MappedResponseType<R, T>> {
  const { creemConfig, ...opts } = options || {}
  const { tokens, version, environment } = useRuntimeConfig().creem
  const apiURL = environment === 'test' ? 'test-api' : 'api'
  const baseURL = `https://${apiURL}.creem.io/${version}`


  if (!tokens.test || !tokens.live) {
    consola.error('Missing Creem API Token.')
  }
  // console.log(tokens.test)
  const creem = ofetch.create({
    baseURL,
    onRequest({ options }) {
      options.headers = defu<Headers, HeadersInit[]>(options.headers, {
        'x-api-key': `${useRuntimeConfig().creem.tokens[useRuntimeConfig().creem.environment]}`,
        'content-type': 'application/json',
        'Accept': 'application/json',
      })
    },
  })

  return creem<T, R>(req, {
    ...opts,
  })
}
