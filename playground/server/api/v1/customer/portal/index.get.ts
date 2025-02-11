export default defineEventHandler(async (event) => {
    const redirect = await useCreemCustomer().portal({
        customer_id: 'cust_xxxxxxx'
    })
    if(!redirect.customerPortalUrl) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Failed to create billing portal session',
        })
      }
    return redirect.customerPortalUrl
  })
  
  