import { defineEventHandler, getHeaders, readBody, type EventHandler, type EventHandlerRequest } from 'h3'
import { generateSignature } from './verify'
import { useRuntimeConfig } from '#imports'

export const defineCreemWebhookResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // Check if the request is for the specific webhook route
      const body = await readBody(event)
      const headers = getHeaders(event)
      const signature = headers['creem-signature']
      const secret = useRuntimeConfig().creem?.webhook_secret
      if (!secret) {
        console.error('No Creem Webhook Secret found, add it to your runtime config.')
        return { statusCode: 500, message: 'Internal Server Error: No secret found' }
      }
      const computedSignature = generateSignature(JSON.stringify(body), secret)
      const isValid = signature === computedSignature
      if (!isValid) {
        console.log('Invalid signature')
        return { statusCode: 403, message: 'Forbidden: Invalid Headers' }
      }
      console.log('Valid Creem Header Signature')

      // TODO: Handle all the webhook events (Types)
      if (body.eventType === 'checkout.completed') {
        console.log('Checkout completed')
      }

      return handler(event)
    }
    catch (err) {
      console.error('Error in Creem Webhook:', err)
      return { err }
    }
  })
