export default defineEventHandler(async (event) => {
  const { product } = await readBody(event)
  const config = useRuntimeConfig()
  const session = await useCreemCheckout().createSession({ product_id: product.id, return_url: `${config.public.site_url}${config.creem.return_url}` })
  if (!session.checkout_url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to create checkout session',
    })
  }
  return session.checkout_url
})
