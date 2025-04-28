import { HStack, Spinner } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdError } from "react-icons/md";

export interface SpinnerFallbackProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  children?: React.ReactNode;
}

export const SpinnerFallback: React.FC<SpinnerFallbackProps> = ({
  isLoading,
  children,
  isError,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  if (isError)
    return (
      <HStack>
        <MdError />
        <p>{t("something_went_wrong", "something went wrong")}</p>
      </HStack>
    );

  if (isLoading)
    return (
      <HStack className="text-xl w-full justify-center">
        <p>{t("loading", "Loading")}</p>
        <Spinner color="primary.main" />
      </HStack>
    );

  return <>{children}</>;
};
