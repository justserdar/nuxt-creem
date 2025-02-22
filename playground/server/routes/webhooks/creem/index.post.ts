export default defineCreemWebhookResponseHandler(async (event) => {
  const body = await readBody(event)
  // Handle your logic here
  return {
    status: 200,
    message: 'Webhook received'
  }
})
