import { defineNuxtModule, createResolver, addServerImportsDir, addImportsDir } from '@nuxt/kit'
import { consola } from 'consola'
import { defu } from 'defu'

// Module options TypeScript type definition
export type ModuleOptions = {
  environment: string
  version: string
  return_url: string
  webhook_secret: string
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
    webhook_secret: '',
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

    // Ensure moduleOptions is correctly typed
    const moduleOptions: ModuleOptions = nuxt.options.runtimeConfig.creem = defu(
      nuxt.options.runtimeConfig.creem as Partial<ModuleOptions>
    ) as ModuleOptions

    if (moduleOptions.environment === 'test' && moduleOptions.tokens.test === '') {
      consola.warn('Please provide a valid API Token for Test mode for your Creem API.')
    }
    else if (moduleOptions.environment === 'live' && moduleOptions.tokens.live === '') {
      consola.warn('Please provide a valid API Token for Live mode for your Creem API.')
    }
    options = moduleOptions
    addServerImportsDir(resolve(runtimeDir, 'server', 'utils', 'creem'))
    addImportsDir(resolve(runtimeDir, 'shared'))
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
