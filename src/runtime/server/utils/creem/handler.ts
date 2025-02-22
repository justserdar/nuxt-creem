import { defineEventHandler, getHeaders, getQuery, readBody, type EventHandler, type EventHandlerRequest } from 'h3'
import type { RedirectParams } from '../../../shared/types/creem/callback'
import { generateSignature, generateWebHookSignature } from './verify'
import { useRuntimeConfig } from '#imports'

export const defineCreemWebhookResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const body = await readBody(event)
      const headers = getHeaders(event)
      const signature = headers['creem-signature']
      const secret = useRuntimeConfig().creem?.webhook_secret

      if (!secret) {
        console.error('No Creem Webhook Secret found, add it to your runtime config.')
        return { statusCode: 500, message: 'Internal Server Error: No secret found' }
      }

      const computedSignature = generateWebHookSignature(JSON.stringify(body), secret)
      const isValid = signature === computedSignature

      if (!isValid) {
        console.log('Nuxt Creem: Invalid Webhook Signature')
        return { statusCode: 403, message: 'Forbidden: Invalid Nuxt Creem Webhook Signature' }
      }

      return handler(event)
    }
    catch (err) {
      console.error('Error in Creem Webhook:', err)
      return { err }
    }
  })

export const defineCreemCheckoutCallbackHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const payload: RedirectParams = getQuery<RedirectParams>(event)
      const environment = useRuntimeConfig().creem.environment
      const apiToken = useRuntimeConfig().creem?.tokens[environment]
      const signature = getQuery(event).signature

      if (!apiToken) {
        console.error('No Creem API Token found, add it to your runtime config.')
        return { statusCode: 500, message: 'Internal Server Error: No token found' }
      }

      const computedSignature = generateSignature(payload, apiToken)
      const isValid = signature === computedSignature

      if (!isValid) {
        console.log('Nuxt Creem: Invalid Checkout Callback Signature')
        return { statusCode: 403, message: 'Forbidden: Invalid Nuxt Creem Checkout Redirect Signature' }
      }

      return handler(event)
    }
    catch (err) {
      console.error('Error in Creem Webhook:', err)
      return { err }
    }
  })
