export default defineEventHandler(async () => {
  const products = await useCreemProducts().list()
  return products
})
