import React from "react";
import { IoTicket } from "react-icons/io5";
import { object, string } from "yup";
import {
  BoxShadow,
  Input,
  Button,
  InputGroup,
  InputLeftElement,

} from "ui";
import { useTranslation } from "react-i18next";
import { MdDiscount } from "react-icons/md";

const VoucherSchema = object().shape({
  code: string().required("Enter a voucher code"),
});

export interface VoucherInputProps {
  onSuccess?: (code: string) => Promise<boolean>;
}

export const VoucherInput: React.FC<VoucherInputProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<{ code: string }>({ code: "" });
  const [errMsg, setErrorMsg] = React.useState<{ error: boolean; msg: string }>();

  async function validate(): Promise<false | string> {
    return VoucherSchema.validate(value)
      .then((res) => {
        setErrorMsg(undefined);
        return res.code;
      })
      .catch((rej) => {
        setErrorMsg({ error: true, msg: rej.message });
        return false;
      });
  }

  async function handleSubmit() {
    const valid = await validate();
    if (onSuccess && valid) {
      const success: boolean = await onSuccess(valid);
      if (success) {
        setErrorMsg({ error: false, msg: "Successfully added voucher code" });
      } else {
        setErrorMsg({ error: true, msg: "Invalid voucher code" });
      }
    }
  }

  return (
    <BoxShadow className="bg-white p-4 rounded-xl">
      <div className="flex flex-col gap-3 w-full">
        <p className="font-semibold text-base">{t("Voucher")}</p>
        <div className="relative">
          <div className="flex flex-col gap-8 w-full">
            <MdDiscount className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setValue({ ...value, code: e.target.value })}
              className="w-full pl-10 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

        </div>
        {errMsg && (
          <p
            className={`text-sm ${errMsg.error ? "text-red-500" : "text-green-600"
              }`}
          >
            {errMsg.msg}
          </p>
        )}

        <div className="flex justify-end">
          <Button
            className="text-sm font-semibold px-4 py-1.5"
            colorScheme="darkbrown"
            id="ApplyVoucherButton"
            onClick={handleSubmit}
          >
            {t("Apply")}
          </Button>
        </div>
      </div>
    </BoxShadow>
  );
};
