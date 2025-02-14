export interface CreemLicenseBody {
  id: string
  mode: 'test' | 'live'
  object: string
  status: string
  key: string
  activation: number
  activation_limit: number
  expires_at: string
  created_at: string
  instance: {
    id: string
    mode: 'test' | 'live'
    object: string
    name: string
    status: string
    created_at: string
  }
}
