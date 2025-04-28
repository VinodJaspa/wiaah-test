import {
  Button,
  HStack,
  Input,
  useAdminGetAccount,
  useAdminUpdateAccountMutation,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "utils";

export const AccountSecuritySettings: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { mutate } = useAdminUpdateAccountMutation();
  const { form, inputProps, handleChange } = useForm<
    Parameters<typeof mutate>[0]
  >(
    { id: accountId },
    { id: accountId },
    { addLabel: true, addPlaceholder: true },
  );
  const { data: account } = useAdminGetAccount(accountId, {
    onSuccess(data) {
      handleChange("email", data.email);
    },
  });

  const isChanged = form.email !== account.email;

  return (
    <div className="flex flex-col gap-8">
      <p className="font-semibold text-xl">
        {t("Update Account Security Settings")}
      </p>
      <Input className="w-96" {...inputProps("email")} />
      <Input type={"password"} className="w-96" {...inputProps("password")} />

      <HStack className="justify-end">
        {isChanged ? (
          <Button
            onClick={() => {
              mutate(form);
            }}
          >
            {t("Update")}
          </Button>
        ) : null}
      </HStack>
    </div>
  );
};
