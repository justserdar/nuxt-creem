<script setup lang="ts">
const { data: products } = await useFetch('/api/v1/products/list', {
  headers: {
    'content-type': 'application/json',
  },
})

const buyProduct = async (product: any) => {
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
    <UPageHero
      title="Creem X Official Nuxt Module Support"
      description="Import Nuxt Creem and start sending payments left and right."
      align="left"
      :links="[{ label: 'Learn More', color: 'black', size: 'lg' }, { label: 'Create a Creem Account', to: 'https://www.creem.io/', external: true, color: 'gray', size: 'lg', trailingIcon: 'i-heroicons-arrow-right-20-solid' }]"
    >
      <img
        src="https://picsum.photos/420/420"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      />
    </UPageHero>
    <UPageBody>
      <UPageGrid>
        <UPageCard 
          v-for="product in products.items" 
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
