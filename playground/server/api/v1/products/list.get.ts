export default defineEventHandler(async (event) => {
  const products = await useCreemProducts().list()
  return products
})

