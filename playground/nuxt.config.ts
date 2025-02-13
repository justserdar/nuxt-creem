export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  runtimeConfig: {
    creem: {
      environment: process.env.NUXT_CREEM_ENVIRONMENT,
      return_url: process.env.NUXT_CREEM_RETURN_URL,
      webhook_secret: process.env.NUXT_CREEM_WEBHOOK_SECRET,
      tokens: {
        test: process.env.NUXT_CREEM_TEST_TOKEN,
        live: process.env.NUXT_CREEM_LIVE_TOKEN,
      },
    },
    public: {
      site_url: process.env.NUXT_CREEM_SITE_URL,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-02-13',
  creem: {
    environment: process.env.NUXT_CREEM_ENVIRONMENT,
    return_url: process.env.NUXT_CREEM_RETURN_URL,
    webhook_secret: process.env.NUXT_CREEM_WEBHOOK_SECRET,
    tokens: {
      test: process.env.NUXT_CREEM_TEST_TOKEN,
      live: process.env.NUXT_CREEM_LIVE_TOKEN,
    },
  },
})
