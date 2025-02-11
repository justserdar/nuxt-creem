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
            <UButton @click="buyProduct(product)">
              Buy Product
            </UButton>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>
