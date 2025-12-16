export type CheckoutTab = "crypto-to-cash" | "cash-to-crypto" | "crypto-to-fiat-loan"

export type CheckoutStep = 
  | "payment-details"
  | "recipient-bank"
  | "recipient-contact"
  | "send-payment"
  | "processing"

export interface Currency {
  code: string
  name: string
  symbol?: string
  icon?: string
}

export interface Wallet {
  id: string
  name: string
  icon?: string
}

export interface PaymentDetails {
  payAmount: string
  payCurrency: string
  receiveAmount: string
  receiveCurrency: string
  payFrom: string
  payTo: string
}

export interface RecipientBankDetails {
  bank: string
  accountNumber: string
  accountName?: string
}

export interface RecipientContactDetails {
  email: string
  phoneNumber: string
  countryCode: string
}

