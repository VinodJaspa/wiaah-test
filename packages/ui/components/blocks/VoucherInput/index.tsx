import React from "react";
import { IoTicket } from "react-icons/io5";
import yup, { object, string } from "yup";
import { BoxShadow, Input, Button, InputGroup, InputLeftElement } from "ui";
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
      }
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
    <BoxShadow>
      <div className="bg-white">
        <div className="flex flex-col px-4 py-4 gap-4 items-end">
          <div className="w-full">
            <p className="text-3xl">{t("Voucher")}</p>
          </div>
          <InputGroup className="w-full">
            <InputLeftElement>
              <IoTicket />
            </InputLeftElement>
            <Input
              placeholder={t("voucher...")}
              className="w-full h-12"
              id="VoucherInput"
            />
          </InputGroup>
          <Button id="ApplyVoucherButton" onClick={handleSubmit}>
            {t("Apply")}
          </Button>
        </div>
      </div>
    </BoxShadow>
  );
};
