import React from "react";
import { HStack, Spinner } from "ui";
import { MdError } from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface SpinnerFallbackProps {
  isLoading?: boolean;
  isError?: boolean;
}

export const SpinnerFallback: React.FC<SpinnerFallbackProps> = ({
  isLoading,
  children,
  isError,
}) => {
  const { t } = useTranslation();

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
