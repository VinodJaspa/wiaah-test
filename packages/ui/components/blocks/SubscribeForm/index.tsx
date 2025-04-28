import React, { FC } from "react";
import { FaAt, FaUserAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Button, Input, InputGroup, InputLeftElement } from "../../partials";
import { useSubscribeToNewsletterMutation } from "../../features/Newsletter";
import { useForm } from "utils";
import * as yup from "yup";

export interface SubscribeFormProps { }

export const SubscribeForm: FC<SubscribeFormProps> = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { form, inputProps, isValid } = useForm<Parameters<typeof mutate>[0]>(
    {
      email: "",
      name: "",
    },
    {},
    {
      yupSchema: yup.object({
        email: yup.string().email().required(),
        name: yup.string().min(3).required(),
      }),
    },
  );
  const { mutate } = useSubscribeToNewsletterMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid()) {
          mutate(form);
        }
      }}
      className="block w-full space-y-4 lg:col-span-2"
    >
      <p className="text-white uppercase font-bold">{t("Wiaah Alert En")}</p>
      <p className="text-sm text-gray-400">
        {t("Register now to get updates on promotions and coupons")}
      </p>

      <InputGroup>
        <InputLeftElement>
          <FaAt className="pointer-events-none h-4 w-4 text-gray-400" />
        </InputLeftElement>
        <Input {...inputProps("email")} placeholder={t("Email")} className="" />
      </InputGroup>

      <InputGroup>
        <InputLeftElement>
          <FaUserAlt className="pointer-events-none h-4 w-4 text-gray-400" />
        </InputLeftElement>
        <Input {...inputProps("name")} placeholder={t("Name")} className="" />
      </InputGroup>

      <Button
        colorScheme="darkbrown"
        type="submit"
        className="px-3.5 py-2 uppercase"
        disabled={!isValid()}
      >
        {t("Subscribe")}
      </Button>
    </form>
  );
};
