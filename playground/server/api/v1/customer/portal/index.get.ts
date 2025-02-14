export default defineEventHandler(async (event) => {
  const { customerId } = getQuery(event)
  if (!customerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer ID is required',
    })
  }
  const redirect = await useCreemCustomer().portal({
    customer_id: customerId,
  })
  if (!redirect.customerPortalUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to create billing portal session',
    })
  }
  return redirect.customerPortalUrl
})
