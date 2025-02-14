export interface CreemCustomerBody {
  id: string
  mode: 'test' | 'live'
  object: string
  email: string
  name: string
  country: string
  created_at: string
  updated_at: string
}

export interface CreemCustomerPortalBody {
  customer_portal_link: string
}
