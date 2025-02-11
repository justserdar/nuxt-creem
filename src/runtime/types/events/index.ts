// Base type for all events
export type WebhookEvent = {
  id: string
  eventType: string
  createdAt: number
  object: EventObject
}

// Define the EventObject type
export type EventObject =
  | SubscriptionEventObject
  | RefundEventObject
  | CheckoutEventObject

// Define the SubscriptionEventObject type
export type SubscriptionEventObject = {
  id: string
  object: 'subscription'
  product: Product
  customer: Customer
  collectionMethod: 'charge_automatically'
  status: 'active' | 'canceled'
  lastTransactionId?: string
  lastTransactionDate?: string
  nextTransactionDate?: string
  currentPeriodStartDate: string
  currentPeriodEndDate: string
  canceledAt: null | string
  createdAt: string
  updatedAt: string
  metadata: Metadata
  mode: 'local' | 'test' | 'live'
  items?: SubscriptionItem[]
}

// Define the RefundEventObject type
export type RefundEventObject = {
  id: string
  object: 'refund'
  status: 'succeeded'
  refundAmount: number
  refundCurrency: string
  reason: string
  transaction: Transaction
  subscription: Subscription
  checkout: Checkout
  order: Order
  customer: Customer
  createdAt: number
  mode: 'local' | 'test' | 'live'
}

// Define the CheckoutEventObject type
export type CheckoutEventObject = {
  id: string
  object: 'checkout'
  requestId: string
  status: 'completed'
  metadata: Metadata
  mode: 'local' | 'test' | 'live'
}

// Define the Product type
export type Product = {
  id: string
  name: string
  description: string
  imageUrl: string | null
  price: number
  currency: string
  billingType: 'recurring' | 'one-time'
  billingPeriod: 'every-month' | 'every-year'
  status: 'active'
  taxMode: 'exclusive'
  taxCategory: 'saas'
  defaultSuccessUrl: string
  createdAt: string
  updatedAt: string
  mode: 'local' | 'test' | 'live'
}

// Define the Customer type
export type Customer = {
  id: string
  object: 'customer'
  email: string
  name: string
  country: string
  createdAt: string
  updatedAt: string
  mode: 'local' | 'test' | 'live'
}

// Define the Metadata type
export type Metadata = {
  customData: string
  internalCustomerId: string
}

// Define the Transaction type
export type Transaction = {
  id: string
  object: 'transaction'
  amount: number
  amountPaid: number
  currency: string
  type: string
  taxCountry: string
  taxAmount: number
  status: 'refunded'
  refundedAmount: number
  order: string
  subscription: string
  description: string
  periodStart: number
  periodEnd: number
  createdAt: number
  mode: 'local' | 'test' | 'live'
}

// Define the Subscription type
export type Subscription = {
  id: string
  object: 'subscription'
  product: string
  customer: string
  collectionMethod: 'charge_automatically'
  status: 'canceled'
  lastTransactionId: string
  lastTransactionDate: string
  currentPeriodStartDate: string
  currentPeriodEndDate: string
  canceledAt: string
  createdAt: string
  updatedAt: string
  metadata: Metadata
  mode: 'local' | 'test' | 'live'
}

// Define the Checkout type
export type Checkout = {
  id: string
  object: 'checkout'
  requestId: string
  status: 'completed'
  metadata: Metadata
  mode: 'local' | 'test' | 'live'
}

// Define the Order type
export type Order = {
  id: string
  customer: string
  product: string
  amount: number
  currency: string
  status: 'paid'
  type: 'recurring'
  createdAt: string
  updatedAt: string
  mode: 'local' | 'test' | 'live'
}

// Define the SubscriptionItem type
export type SubscriptionItem = {
  object: 'subscription_item'
  id: string
  productId: string
  priceId: string
  units: number
  createdAt: string
  updatedAt: string
  mode: 'local' | 'test' | 'live'
}
