import { mapArray, useForm } from "@UI/../utils/src";
import { useSocialControls } from "@blocks";
import {
  useGetMyBalanceQuery,
  useGetMyFinancialAccountsQuery,
} from "@features/Billing";
import {
  ArrowLeftAlt1Icon,
  AspectRatio,
  Divider,
  Drawer,
  DrawerContent,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  PriceDisplay,
  Select,
  SelectOption,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const WithdrawalDrawer: React.FC = () => {
  const { closeWithdraw, value } = useSocialControls("showWithdraw");
const { t } = useTranslation();

  const { selectProps, inputProps, form } = useForm<{
    currency: string;
    amount: number;
  }>({
    amount: 0,
    currency: "USD",
  });

  const { data: balance } = useGetMyBalanceQuery();
  const { data: finAccounts } = useGetMyFinancialAccountsQuery();
  return (
    <Drawer position="bottom" full isOpen={!!value} onClose={closeWithdraw}>
      <DrawerContent className="overflow-hidden">
        <div className="flex flex-col gap-6 p-4">
          <HStack className="justify-center relative">
            <p className="text-lg font-semibold">{t("Withdraw")}</p>
            <ArrowLeftAlt1Icon
              onClick={() => closeWithdraw()}
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0"
            />
          </HStack>

          <div className="bg-primary px-6 h-[4.75rem] flex items-center justify-between rounded-xl">
            <p className="font-medium">{t("Available Balance")}:</p>

            <PriceDisplay
              className="text-lg font-bold"
              price={balance?.withdrawableBalance}
            />
          </div>
          <Select
            label={t("Withdraw to")}
            placeholder={t("Select financial account")}
          >
            {mapArray(finAccounts, ({ financialId, id, label }) => (
              <SelectOption value={financialId} key={id}>
                {label}
              </SelectOption>
            ))}
          </Select>

          <InputGroup className="rounded-lg">
            <InputLeftElement>
              <Select className="border-0" {...selectProps("currency")}>
                {["USD", "EUR"].map((v, i) => (
                  <SelectOption key={i} value={v}>
                    {v}
                  </SelectOption>
                ))}
              </Select>
              <Divider variant="vert" />
            </InputLeftElement>
            <Input {...inputProps("amount")} placeholder="000.." />
          </InputGroup>
          <div className="my-4"></div>
          <div className="flex flex-col  gap-2">
            <HStack className="justify-between">
              <p>{t("Currency")}</p>
              <p className="text-sm font-semibold">{"USD"}</p>
            </HStack>
            <HStack className="justify-between">
              <p>{t("US Dollar Equlivalent")}</p>
              <p className="text-sm font-semibold">{"1USD = 1.14EUR"}</p>
            </HStack>
            <HStack className="justify-between">
              <p>{t("Exchange Rate")}</p>
              <p className="text-sm font-semibold">{"1.14EUR = 1USD"}</p>
            </HStack>
            <HStack className="justify-between">
              <p>{t("Fees")}</p>
              <p className="text-sm font-semibold">{"FREE"}</p>
            </HStack>
            <Divider />
            <HStack className="justify-between">
              <p>{t("Transfer to Account")}</p>
              <PriceDisplay price={form.amount} className="font-bold text-lg" />
            </HStack>
          </div>
        </div>

        <div className="absolute flex rounded-full overflow-hidden left-1/2 -translate-x-1/2 bottom-0 translate-y-3/4 w-[150%]">
          <AspectRatio className="bg-black" ratio={1}>
            <div className="flex-col gap-6 items-center text-white py-10">
              <p className="text-center text-lg font-medium text-primary">
                {t("Press and Hold")}
              </p>
              <HStack className="gap-4 justify-center">
                <p className="text-lg font-semibold">{t("Withdraw")}</p>
                <p className="text-primary">|</p>
                <PriceDisplay price={form.amount} />
              </HStack>
            </div>
          </AspectRatio>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
