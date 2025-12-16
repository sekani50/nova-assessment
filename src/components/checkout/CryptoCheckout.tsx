import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentDetailsForm } from "./PaymentDetailsForm"
import { RecipientBankForm } from "./RecipientBankForm"
import { RecipientContactForm } from "./RecipientContactForm"
import { SendPaymentScreen } from "./SendPaymentScreen"
import { ProcessingScreen } from "./ProcessingScreen"
import { ComingSoonScreen } from "./ComingSoonScreen"
import {
  CheckoutTab,
  CheckoutStep,
  PaymentDetails,
  RecipientBankDetails,
  RecipientContactDetails,
} from "@/types/checkout"
import { Card } from "../ui/card"

export function CryptoCheckout() {
  const [activeTab, setActiveTab] = useState<CheckoutTab>("crypto-to-cash")
  const [step, setStep] = useState<CheckoutStep>("payment-details")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    payAmount: "1.00",
    payCurrency: "ETH",
    receiveAmount: "1500.00",
    receiveCurrency: "NGN",
    payFrom: "",
    payTo: "",
  })
  const [bankDetails, setBankDetails] = useState<RecipientBankDetails>({
    bank: "",
    accountNumber: "",
  })
  const [contactDetails, setContactDetails] = useState<RecipientContactDetails>({
    email: "",
    phoneNumber: "",
    countryCode: "+234",
  })

  const handleNextStep = () => {
    if (step === "payment-details") {
      setStep("recipient-bank")
    } else if (step === "recipient-bank") {
      setStep("recipient-contact")
    } else if (step === "recipient-contact") {
      setStep("send-payment")
    } else if (step === "send-payment") {
      setStep("processing")
    }
  }

  const handleBackStep = () => {
    if (step === "recipient-bank") {
      setStep("payment-details")
    } else if (step === "recipient-contact") {
      setStep("recipient-bank")
    } else if (step === "send-payment") {
      setStep("recipient-contact")
    }
  }

  const handleTabChange = (tab: CheckoutTab) => {
    setActiveTab(tab)
    setStep("payment-details")
  }

  const renderContent = () => {
    if (activeTab === "cash-to-crypto" || activeTab === "crypto-to-fiat-loan") {
      return (
        <ComingSoonScreen
          title={activeTab === "cash-to-crypto" ? "Cash to Crypto" : "Crypto to Fiat Loan"}
          description={`${activeTab === "cash-to-crypto" ? "Cash to Crypto" : "Crypto to Fiat Loan"} is almost here. Enter your email and we'll let you know the moment it's live.`}
        />
      )
    }

    if (step === "processing") {
      return <ProcessingScreen />
    }

    if (step === "send-payment") {
      return (
        <SendPaymentScreen
          paymentDetails={paymentDetails}
          onBack={handleBackStep}
          onConfirm={handleNextStep}
        />
      )
    }

    if (step === "recipient-contact") {
      return (
        <RecipientContactForm
          details={contactDetails}
          onDetailsChange={setContactDetails}
          onBack={handleBackStep}
          onNext={handleNextStep}
        />
      )
    }

    if (step === "recipient-bank") {
      return (
        <RecipientBankForm
          details={bankDetails}
          onDetailsChange={setBankDetails}
          onBack={handleBackStep}
          onNext={handleNextStep}
        />
      )
    }

    return (
      <PaymentDetailsForm
        paymentDetails={paymentDetails}
        onPaymentDetailsChange={setPaymentDetails}
        onNext={handleNextStep}
      />
    )
  }

  const shouldShowTabs = step === "payment-details"  || 
    (activeTab === "cash-to-crypto" || activeTab === "crypto-to-fiat-loan")

  return (
    <div className="min-h-screen bg-white">
      <Card className="max-w-xl rounded-3xl my-4 mx-auto px-4 py-8">
        {shouldShowTabs && (
          <div className="mb-8">
            <Tabs value={activeTab} className="w-full" onValueChange={(value) => handleTabChange(value as CheckoutTab)}>
              <TabsList className="flex mx-auto h-12 items-center justify-center rounded-full bg-gray-100 p-1 w-fit ">
                <TabsTrigger 
                  value="crypto-to-cash"
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-[#013941] data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
                >
                  Crypto to cash
                </TabsTrigger>
                <TabsTrigger 
                  value="cash-to-crypto"
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-[#013941] data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
                >
                  Cash to crypto
                </TabsTrigger>
                <TabsTrigger 
                  value="crypto-to-fiat-loan"
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-[#013941] data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
                >
                  Crypto to fiat loan
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className={shouldShowTabs ? "mt-6" : ""}>{renderContent()}</div>
      </Card>
    </div>
  )
}

