import * as crypto from 'node:crypto'
import type {
  RedirectParams,
} from '../../../types/creem/callback'

export function generateWebHookSignature(payload: string, secret: string): string {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  return computedSignature
}

export function generateSignature(params: RedirectParams, apiKey: string): string {
  const data = Object.entries(params)
    .filter(([key]) => key !== 'signature')
    .map(([key, value]) => `${key}=${value}`)
    .concat(`salt=${apiKey}`)
    .join('|')
  return crypto.createHash('sha256').update(data).digest('hex')
}
