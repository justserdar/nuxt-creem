<script setup lang="ts">
import type { CreemProduct, CreemProductList } from '~/types/creem'

const { data: products, status } = await useFetch<CreemProductList>('/api/v1/products/list', {
  headers: {
    'content-type': 'application/json',
  },
})

const buyProduct = async (product: CreemProduct) => {
  const checkoutSessionUrl = await $fetch('/api/v1/checkout', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: {
      product,
    },
  })
  await navigateTo(checkoutSessionUrl, { external: true })
}
</script>

<template>
  <UPage class="max-w-5xl mx-auto">
    <UPageHeader>
      <template #title>
        <h1>
          Nuxt UI Pro - Creem.io Module Playground
        </h1>
      </template>
    </UPageHeader>
    <UPageBody>
      <div v-if="status === 'pending'">
        <UPageCard
          title="Loading Products..."
        >
          <template #default>
            <h2 class="text-xl font-bold rounded-md">
              Loading Products...
            </h2>
          </template>
        </UPageCard>
      </div>
      <UPageGrid v-else-if="status === 'success'">
        <UPageCard
          v-for="product in products?.items"
          :key="product.id"
          :title="product.name"
          :link="product"
        >
          <template #default>
            <h2 class="text-xl font-bold rounded-md">
              {{ product.name }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ product.description }}
            </p>
            <span class="text-xl text-gray-500">
              $ {{ product.price / 100 }}
            </span>
          </template>
          <template #footer>
            <UButton
              :disabled="status === 'pending'"
              @click="buyProduct(product)"
            >
              <template #icon>
                <UIcon
                  name="i-heroicons-arrow-right"
                />
              </template>
              <template #default>
                <span v-if="status === 'pending'">
                  Loading...
                </span>
                <span  v-else>
                  Buy Product
                </span>
              </template>
            </UButton>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>
