import { useForm } from "utils";
import React, { forwardRef, useImperativeHandle } from "react";
import { useSignupMutation, useVerifyEmailMutation } from "../services";
import { AccountGenderEnum, RegisterAccountType } from "@features/API";
import { BoxShadow, Button, EmailIcon, HStack, Input, Radio } from "@partials";
import { DateFormInput } from "@blocks";
import { useTranslation } from "react-i18next";

export const VerifyAccountEmail = forwardRef(
  (
    {
      onSuccess,
      showSubmit,
    }: {
      onSuccess: () => any;
      showSubmit?: boolean;
    },
    ref
  ) => {
  const { t } = useTranslation();
    const { inputProps, dateInputProps, form, handleChange } = useForm<
      Parameters<typeof verify>[0]
    >(
      {
        code: "",
      },
      {},
      {
        addLabel: true,
      }
    );

    const [error, setError] = React.useState("");

    const { mutate: verify } = useVerifyEmailMutation();

    const submit = () =>
      verify(form, {
        onSuccess(data, variables, context) {
          console.log("success");
          onSuccess();
        },

        onError: (err) => {
          const _err = err as Error;
          setError(_err.message);
        },
      });

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col w-full gap-4">
        <p className="font-semibold text-2xl">{t("Verify Your Email")}</p>
        <div className="my-auto w-[min(30rem,100%)]">
          <BoxShadow>
            <div className="w-full h-full">
              <div className="h-full w-full flex justify-center items-center">
                <EmailIcon className="text-2xl"></EmailIcon>
              </div>
              <Input {...inputProps("code")} />
            </div>
          </BoxShadow>
        </div>
        {showSubmit ? (
          <HStack className="justify-end">
            <Button onClick={submit}>{t("Submit")}</Button>
          </HStack>
        ) : null}
      </div>
    );
  }
);
