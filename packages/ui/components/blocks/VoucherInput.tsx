import { t } from "i18next";
import React from "react";
import { IoTicket } from "react-icons/io5";
import yup, { object, string } from "yup";
import {
  BoxShadow,
  Padding,
  FlexStack,
  Input,
  Button,
  Text,
} from "../partials";

const VoucherSchema = object().shape({
  code: string().min(1, "Enter a voucher code").required(),
});

export interface VoucherInputProps {
  onSuccess?: (code: string) => Promise<boolean>;
}
export const VoucherInput: React.FC<VoucherInputProps> = ({ onSuccess }) => {
  const [value, setValue] = React.useState<{ code: string }>();
  const [errMsg, setErrorMsg] =
    React.useState<{
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
        <Padding X={{ value: 2 }} Y={{ value: 1 }}>
          <FlexStack
            alignItems="end"
            direction="vertical"
            verticalSpacingInRem={1}
          >
            <div className="w-full">
              <Text size="3xl">{t("voucher", "Voucher")}</Text>
            </div>
            <Input
              icon={<IoTicket />}
              onValueChange={(value) => setValue({ code: value })}
              fullWidth
              message={errMsg}
              placeholder={t("enter_voucher", "Enter Voucher Code")}
            />
            <Button
              hexBackgroundColor="#000"
              paddingX={{ value: 2 }}
              paddingY={{ value: 0.5 }}
              onClick={handleSubmit}
            >
              {t("apply", "Apply")}
            </Button>
          </FlexStack>
        </Padding>
      </div>
    </BoxShadow>
  );
};
