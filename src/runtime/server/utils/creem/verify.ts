import * as crypto from 'node:crypto'
import type {
  RedirectParams,
} from '../../../types/creem/callback'

export function generateSignature(params: RedirectParams, apiKey: string): string {
  const data = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .concat(`salt=${apiKey}`)
    .join('|')
  return crypto.createHash('sha256').update(data).digest('hex')
}
