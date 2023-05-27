import { useRouting } from "@UI/../routing";
import { useForm } from "@UI/../utils/src";
import {
  Button,
  Checkbox,
  HStack,
  Input,
  Link,
  LogoColouredIcon,
} from "@partials";
import React from "react";
import { useSigninMutation } from "../services";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const SellerSigninView: React.FC = () => {
  const { t } = useTranslation();
  const { getUrl } = useRouting();

  const { mutate: signin } = useSigninMutation();
  const { form, inputProps } = useForm<Parameters<typeof signin>[0]>(
    {
      email: "",
      password: "",
    },
    {},
    {
      yupSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      }),
    }
  );

  return (
    <div className="flex flex-col gap-10 w-[min(100%, 24rem)] p-8 h-full justify-center items-center">
      <LogoColouredIcon className="text-9xl" />
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <Input {...inputProps("email")} className="w-full" />
          <Input isPassword {...inputProps("password")} className="w-full" />
        </div>

        <HStack className="justify-between w-full">
          <HStack>
            <Checkbox />
            <p className="text-sm">{t("Remember me")}</p>
          </HStack>

          <Link href={getUrl((r) => r.visitChangePassword())}>
            <button>
              <p className="text-sm">{t("forgot password?")}</p>
            </button>
          </Link>
        </HStack>
      </div>
      <Button
        onClick={() => signin(form)}
        className="font-medium w-full"
        colorScheme="darkbrown"
      >
        {t("Sign in")}
      </Button>

      <p>
        {t("Don't have an account?")}
        <span>
          <Link href={getUrl((r) => r.visitRegister())}>
            <button className="text-primary">{t("Register")}</button>
          </Link>
        </span>
      </p>
    </div>
  );
};
