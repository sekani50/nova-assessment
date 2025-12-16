import { z } from "zod"

//? Payment Details Schema
export const paymentDetailsSchema = z.object({
  payAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
  payCurrency: z.string().min(1, "Please select a currency to pay"),
  receiveAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
  receiveCurrency: z.string().min(1, "Please select a currency to receive"),
  payFrom: z.string().min(1, "Please select a wallet"),
  payTo: z.string().min(1, "Please select a payment method"),
})

export type PaymentDetailsSchema = z.infer<typeof paymentDetailsSchema>

//? Recipient Bank Details Schema
export const recipientBankSchema = z.object({
  bank: z.string().min(1, "Please select a bank"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits")
    .max(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),
  accountName: z.string().optional(),
})

export type RecipientBankSchema = z.infer<typeof recipientBankSchema>

//? Recipient Contact Details Schema
export const recipientContactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "")
        return digitsOnly.length >= 10
      },
      {
        message: "Phone number must contain at least 10 digits",
      }
    ),
  countryCode: z.string().min(1, "Country code is required"),
})

export type RecipientContactSchema = z.infer<typeof recipientContactSchema>

//? Coming Soon Email Schema
export const comingSoonEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
})

export type ComingSoonEmailSchema = z.infer<typeof comingSoonEmailSchema>

