import { ChooseWithInput, MultiChooseInput, useSocialControls } from "@blocks";
import {
  Button,
  Drawer,
  DrawerContent,
  HStack,
  Select,
  SelectOption,
  Textarea,
} from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import { useTranslation } from "react-i18next";
import React from "react";
import { Order } from "@features/API";

export const RequestRefundDrawer: React.FC = () => {
  const { cancelRequestRefund, value } = useSocialControls("requestRefundId");
  const isOpen = typeof value === "string";
  const { t } = useTranslation();
  const order = {} as Order;

  // TODO: get order and create refund request integration

  return (
    <Drawer
      position="bottom"
      full
      isOpen={isOpen}
      onClose={cancelRequestRefund}
    >
      <DrawerContent>
        <div className="flex flex-col gap-4">
          <SectionHeader sectionTitle={t("Refund request")} />
          <div className="h-full w-full overflow-y-scroll">
            <div className="p-2 rounded-xl flex flex-col gap-4">
              <HStack>
                <p>{t("Order ID")}</p>
                <p>{order?.id}</p>
              </HStack>
              <HStack>
                <p>{t("Paid amount and date")}:</p>
                <p className="flex gap-2">
                  {t("Paid")} <span>{order?.paid}</span>{" "}
                  <span>
                    {t("on")} {new Date(order.createdAt).toDateString()}
                  </span>
                </p>
              </HStack>

              <Select label={t("Cart Payment")}>
                <SelectOption value={""}></SelectOption>
              </Select>

              <ChooseWithInput
                options={[
                  { title: t("Full amount"), key: "full", input: undefined },
                  {
                    title: t("Partial amount of"),
                    key: "partial",
                    input: { placeholder: "$" },
                  },
                ]}
                name={t("Amount")}
                title={t("Amount")}
              />
              <Textarea
                label={t("Refund reason")}
                placeholder={t("Type why you want to refund") + "."}
              />
              <HStack className="justify-end">
                <Button colorScheme="white" onClick={cancelRequestRefund}>
                  {t("Cancel")}
                </Button>
                <Button colorScheme="darkbrown">{t("Submit")}</Button>
              </HStack>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
