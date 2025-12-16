import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectOption } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { banks } from "@/data/mockData";
import { RecipientBankDetails } from "@/types/checkout";
import { recipientBankSchema } from "@/schema/global.schema";
import { useState } from "react";

interface RecipientBankFormProps {
  details: RecipientBankDetails;
  onDetailsChange: (details: RecipientBankDetails) => void;
  onBack: () => void;
  onNext: () => void;
}

export function RecipientBankForm({
  details,
  onDetailsChange,
  onBack,
  onNext,
}: RecipientBankFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bankOptions: SelectOption[] = banks.map((bank) => ({
    value: bank.value,
    label: bank.label,
  }));

  //? Mock account name lookup
  const handleAccountNumberChange = (accountNumber: string) => {
    onDetailsChange({
      ...details,
      accountNumber,
      accountName: accountNumber.length >= 10 ? "ODUTUGA GBEKE" : undefined,
    });
    //? Clear error when user starts typing
    if (errors.accountNumber) {
      setErrors((prev) => ({ ...prev, accountNumber: "" }));
    }
  };

  const handleBankChange = (bank: string) => {
    onDetailsChange({ ...details, bank });
    if (errors.bank) {
      setErrors((prev) => ({ ...prev, bank: "" }));
    }
  };

  const handleSubmit = () => {
    const result = recipientBankSchema.safeParse(details);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error: { path: (string | number)[]; message: string }) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  const isValid = recipientBankSchema.safeParse(details).success;

  return (
    <div className="flex w-full flex-col items-start justify-start gap-y-6 min-h-[500px]">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 -ml-1"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h2 className="text-sm font-medium text-[#013941]">
          Recipient details
        </h2>
        <p className="w-1 h-1"></p>
      </div>

      <div className="w-full space-y-5 pt-2">
        <div>
          <Label className="text-sm font-medium text-[#013941] mb-2 block">
            Bank
          </Label>
          <Select
            options={bankOptions}
            value={details.bank}
            onValueChange={handleBankChange}
            placeholder="Select an option"
          />
          {errors.bank && (
            <p className="text-sm text-red-600 mt-1">{errors.bank}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-[#013941] mb-2 block">
            Account number
          </Label>
          <Input
            type="text"
            value={details.accountNumber}
            onChange={(e) => handleAccountNumberChange(e.target.value)}
            placeholder="Enter your account number"
            maxLength={10}
            className="rounded-3xl h-12"
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-600 mt-1">{errors.accountNumber}</p>
          )}
          {details.accountName && (
           <>
              <Label className="text-sm font-medium text-[#013941] mt-5 mb-2 block">
            Account Name
          </Label>
            <div className="mt-2 h-12 rounded-3xl bg-gray-50 border border-gray-200">
              <p className="text-sm flex p-3 font-medium text-gray-900">
                {details.accountName}
              </p>
            </div>
           </>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full h-12  text-base font-medium rounded-3xl bg-[#013941] hover:bg-[#0D5D56] text-white disabled:opacity-50 disabled:cursor-not-allowed mt-12"
      >
        Next
      </Button>
    </div>
  );
}
