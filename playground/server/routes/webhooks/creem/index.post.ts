export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const headers = getHeaders(event)
  const signature = headers['x-creem-signature']
  const secret = useRuntimeConfig().creem.webhook_secret
  const computedSignature = generateSignature(JSON.stringify(body), secret)
  if (signature !== computedSignature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature',
    })
  }
  console.log(body)
  return {
    status: 200,
    message: 'Webhook received',
  }
})
