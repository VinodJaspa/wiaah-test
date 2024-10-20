import React from "react";
import { IoTicket } from "react-icons/io5";
import yup, { object, string } from "yup";
import {
  BoxShadow,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  DiscountTicketIcon,
} from "ui";
import { useTranslation } from "react-i18next";

const VoucherSchema = object().shape({
  code: string().required("Enter a voucher code"),
});

export interface VoucherInputProps {
  onSuccess?: (code: string) => Promise<boolean>;
}
export const VoucherInput: React.FC<VoucherInputProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<{ code: string }>();
  const [errMsg, setErrorMsg] = React.useState<{
    error: boolean;
    msg: string;
  }>();

  async function validate(): Promise<false | string> {
    return VoucherSchema.validate(value).then(
      (res) => {
        setErrorMsg(undefined);
        return res.code;
      },
      (rej) => {
        setErrorMsg({ error: true, msg: rej.message });
        return false;
      },
    );
  }

  async function handleSubmit() {
    const valid = await validate();
    if (onSuccess && valid) {
      const Valid: boolean = await onSuccess(valid);
      if (Valid) {
        setErrorMsg({
          error: false,
          msg: "Successfully added voucher code",
        });
      } else {
        setErrorMsg({
          error: true,
          msg: "Invalid voucher code",
        });
      }
    }
  }
  return (
    <div className="bg-white p-6 rounded-3xl">
      <div className="flex flex-col gap-6 items-end">
        <div className="w-full">
          <p className="font-semibold text-2xl">{t("Voucher")}</p>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <InputGroup className="w-full rounded-xl">
            <InputLeftElement className="text-2xl pr-[0px]">
              <DiscountTicketIcon />
            </InputLeftElement>
            <Input
              placeholder={t("Voucher")}
              className="w-full h-12 pl-[0.25rem] placeholder-[#B2B2B2] placeholder-"
              id="VoucherInput"
            />
          </InputGroup>
          <Button
            className="self-end text-lg font-semibold px-[1.5rem] py-[0.75rem]"
            colorScheme="darkbrown"
            id="ApplyVoucherButton"
            onClick={handleSubmit}
          >
            {t("Apply")}
          </Button>
        </div>
      </div>
    </div>
  );
};
