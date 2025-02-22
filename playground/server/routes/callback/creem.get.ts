export default defineCreemCheckoutCallbackHandler(async (event) => {
  const method = event.req.method

  if (method === 'GET') {
    const query = getQuery(event)
    // Handle your logic here
    return sendRedirect(event, '/')
  }
  else {
    throw createError({ statusCode: 405, statusMessage: 'HTTP method is not allowed.' })
  }
})
