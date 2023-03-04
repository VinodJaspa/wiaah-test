import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  PersonIcon,
  LockIcon,
  AspectRatio,
  useAdminLoginMutation,
} from "ui";
import { LogoIcon } from "ui/components/partials/icons/LogoIcon";
import { useForm } from "utils";

export const LoginView: React.FC = () => {
  const { t } = useTranslation();

  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>({
    email: "",
    password: "",
  });
  const { mutate } = useAdminLoginMutation();

  return (
    <div className="w-screen overflow-clip h-screen relative flex items-center justify-center bg-primary">
      <div className="flex flex-col w-[min(98%,20rem)] uppercase gap-8">
        <LogoIcon className="text-[10rem] mb-4 text-white self-center" />
        <div className="flex flex-col gap-4">
          <InputGroup className="border py-1 rounded border-white text-white">
            <InputLeftElement className="px-2">
              <PersonIcon />
            </InputLeftElement>
            <Input
              {...inputProps("email")}
              className="text-white placeholder-white bg-transparent"
              placeholder={t("email")}
            />
          </InputGroup>
          <InputGroup className="border py-1 rounded border-white text-white">
            <InputLeftElement className="px-2">
              <LockIcon />
            </InputLeftElement>
            <Input
              {...inputProps("password")}
              className="text-white placeholder-white bg-transparent"
              placeholder={t("password")}
            />
          </InputGroup>
        </div>
        <div className="flex flex-col uppercase gap-2 w-full">
          <Button
            className="bg-white py-2 rounded uppercase"
            colorScheme="white"
          >
            {t("login")}
          </Button>
          <p className="text-white normal-case text-right">
            {t("Forgot your password") + " ?"}
          </p>
        </div>
      </div>
      <div className="w-[50%] text-white text-opacity-10 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
        <AspectRatio ratio={1}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 838 838"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M695 419C695 571.431 571.431 695 419 695C266.569 695 143 571.431 143 419C143 266.569 266.569 143 419 143C571.431 143 695 266.569 695 419Z"
              fill="currentColor"
            />
            <path
              d="M799 419C799 628.868 628.868 799 419 799C209.132 799 39 628.868 39 419C39 209.132 209.132 39 419 39C628.868 39 799 209.132 799 419Z"
              stroke="currentColor"
              stroke-width="77"
            />
          </svg>
        </AspectRatio>
      </div>
      <div className="absolute w-[80vw] text-white text-opacity-10 top-0 right-0">
        <AspectRatio ratio={83 / 100}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1190 986"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M289 192.5C160.6 193.7 42.8333 65 0 0.5H1190V984C830.5 1001 735.833 865 733.5 774.5C731.167 684 1008.67 406.5 867.5 240.5C787.9 146.9 448.667 169.5 289 192.5Z"
              fill="currentColor"
            />
          </svg>
        </AspectRatio>
      </div>
    </div>
  );
};
