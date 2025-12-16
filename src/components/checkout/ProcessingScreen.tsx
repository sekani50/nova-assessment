import { Copy, Check } from "lucide-react";
import { useState } from "react";
import novaLogo from "@/assets/nova-logo.png";

export function ProcessingScreen() {
  const [copied, setCopied] = useState(false);
  const transactionId = "NC123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoHome = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center  py-8">
      <div className="mb-16 flex items-center justify-center">
        <img src={novaLogo} alt="NOVACRUST" className="h-6" />
      </div>

      <div className="text-center space-y-6 max-w-md w-full px-4 flex-1 flex flex-col items-center justify-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-600 p-6">
            <Check className="h-16 w-16 text-white" />
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-semibold text-[#013941] font-sans">
            Your transaction is processing.
          </h2>
          <p className="text-gray-500 text-base font-sans">
            The recipient will receive it shortly.
          </p>
        </div>

        {/* Transaction ID Box */}
        <div className="bg-gray-100 rounded-3xl p-3 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm font-sans">
                Transaction ID
              </span>
              <span className="text-gray-900 font-medium font-sans">
                {transactionId}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              aria-label="Copy transaction ID"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Go back to home link */}
        <button
          onClick={handleGoHome}
          className="text-[#013941] text-base font-medium font-sans hover:underline mt-8"
        >
          Go back to home
        </button>
      </div>
    </div>
  );
}
