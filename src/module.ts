import type { RuntimeConfig } from '@nuxt/schema'
import { defineNuxtModule, createResolver, addServerImportsDir } from '@nuxt/kit'
import { consola } from 'consola'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  environment: 'test' | 'live'
  version: string
  return_url: string
  tokens: {
    test: string
    live: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-creem',
    configKey: 'creem',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    environment: 'test',
    version: 'v1',
    tokens: {
      test: '',
      live: '',
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#creem'] = runtimeDir

    const moduleOptions = nuxt.options.runtimeConfig.creem = defu<
      RuntimeConfig['creem'],
      ModuleOptions[]
    >(
      nuxt.options.runtimeConfig.creem,
      options,
    )

    if (moduleOptions?.environment === 'test' && moduleOptions.tokens?.test === '') {
      consola.warn('Please provide a valid API Token for Test mode for your Creem API.')
    }
    else if (moduleOptions?.environment === 'live' && moduleOptions.tokens?.live === '') {
      consola.warn('Please provide a valid API Token for Live mode for your Creem API.')
    }

    addServerImportsDir(resolve(runtimeDir, 'server', 'utils', 'creem'))
  },
})

declare module '@nuxt/schema' {
  interface NuxtOptions {
    creem: ModuleOptions
    runtimeConfig: {
      creem: ModuleOptions
    }
  }
}
