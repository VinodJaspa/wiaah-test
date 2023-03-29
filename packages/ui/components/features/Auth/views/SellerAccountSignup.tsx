import { useForm } from "utils";
import React, { forwardRef, useImperativeHandle } from "react";
import { useSignupMutation } from "../services";
import { AccountGenderEnum, RegisterAccountType } from "@features/API";
import { Button, HStack, Input, Radio } from "@partials";
import { DateFormInput } from "@blocks";
import { useTranslation } from "react-i18next";

export const AccountSignup = forwardRef(
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
      Parameters<typeof Signup>[0]
    >(
      {
        accountType: RegisterAccountType.Seller,
        birthDate: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        gender: AccountGenderEnum.Male,
      },
      { accountType: RegisterAccountType.Seller },
      {
        addLabel: true,
      }
    );

    const [error, setError] = React.useState("");

    const { mutate: Signup } = useSignupMutation();

    const submit = () =>
      Signup(form, {
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
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-2xl">{t("Basic Informations")}</p>
        <HStack>
          <Input {...inputProps("firstName")} />
          <Input {...inputProps("lastName")} />
        </HStack>
        <Input {...inputProps("email")} />
        <Input {...inputProps("phone")} />
        <Input {...inputProps("password")} />
        <Input {...inputProps("confirmPassword")} />
        <DateFormInput {...dateInputProps("birthDate")} />
        <div>
          <p className="font-semibold text-lg">{t("Gender")}</p>
          <HStack>
            {Object.values(AccountGenderEnum)
              .reverse()
              .map((v, i) => (
                <Radio
                  name={"gender"}
                  checked={form.gender === v}
                  onChange={(e) =>
                    e.target.checked ? handleChange("gender", v) : null
                  }
                  key={v + i}
                >
                  {v}
                </Radio>
              ))}
          </HStack>
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
