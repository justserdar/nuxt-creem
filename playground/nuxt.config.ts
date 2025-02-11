export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  extends: ['@nuxt/ui-pro'],
  devtools: { enabled: true },
  runtimeConfig: {
    creem: {
      tokens: {
        test: process.env.NUXT_CREEM_TEST_TOKEN,
        live: process.env.NUXT_CREEM_LIVE_TOKEN,
      },
      environment: process.env.NUXT_CREEM_ENVIRONMENT,
      version: process.env.NUXT_CREEM_VERSION,
    },
  },
  compatibilityDate: '2025-02-11',
  future: {
    compatibilityVersion: 4,
  },
})
