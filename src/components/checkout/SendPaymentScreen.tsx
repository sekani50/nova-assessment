import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { PaymentDetails } from "@/types/checkout";

interface SendPaymentScreenProps {
  paymentDetails: PaymentDetails;
  onBack: () => void;
  onConfirm: () => void;
}

export function SendPaymentScreen({
  paymentDetails,
  onBack,
  onConfirm,
}: SendPaymentScreenProps) {
  const [copied, setCopied] = useState(false);
  const mockAddress = "4LiV4YjbxsL6739MKghUd";
  const mockNetwork = paymentDetails.payCurrency || "ETH";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 min-h-[500px]">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 -ml-1"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h2 className="text-sm font-medium text-[#013941]">
          Send {mockNetwork} to the address below
        </h2>
        <p className="w-1 h-1"></p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#E6FBF2] rounded-3xl  p-2 w-fit mx-auto">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-gray-900 break-all flex-1">
              {mockAddress}
            </span>
            <button
              onClick={() => handleCopy(mockAddress)}
              className="shrink-0 p-2 hover:bg-green-100 rounded-md transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="h-5 w-5 text-[#013941]" />
              ) : (
                <Copy className="h-5 w-5 text-[#013941]" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-50  rounded-3xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount to send</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {paymentDetails.payAmount} {paymentDetails.payCurrency}
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    `${paymentDetails.payAmount} ${paymentDetails.payCurrency}`
                  )
                }
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Copy className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Network</span>
            <span className="font-semibold text-gray-900">{mockNetwork}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Wallet</span>
            <span className="font-semibold text-gray-900">Other</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-4 ">
          <Info className="h-5 w-5  mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-500 leading-relaxed">
            Only send {paymentDetails.payCurrency} to this address. Ensure the
            sender is on the {mockNetwork} network otherwise you might lose your
            deposit.
          </p>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        className="w-full h-12 text-base font-medium rounded-3xl bg-[#013941] hover:bg-[#0D5D56] text-white mt-6"
      >
        I have sent it
      </Button>
    </div>
  );
}
