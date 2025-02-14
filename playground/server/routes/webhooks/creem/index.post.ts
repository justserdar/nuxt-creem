export default defineCreemWebhookResponseHandler(async (event) => {
  const body = await readBody(event)
  console.log('Webhook received for: ', body.id)
  // Handle your logic here
  return {
    status: 200,
    message: 'Webhook received'
  }
})
