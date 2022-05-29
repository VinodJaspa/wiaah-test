import { Form, Formik } from "formik";
import React from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { PriceType } from "types";
import {
  Divider,
  Button,
  Table,
  Tr,
  Td,
  Th,
  TBody,
  Switch,
  PriceDisplay,
  TableContainer,
} from "ui";
import { ShippingSettingsContext } from "../ShippingSettingsSection";

export const ShippingSettings: React.FC = () => {
  const { addNew } = React.useContext(ShippingSettingsContext);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-4xl ">
            {t("shipping_settings", "Shipping Settings")}
          </p>
          <Button onClick={addNew} outline>
            {t("add_shipping", "Add Shipping")}
          </Button>
        </div>
        <Divider className="border-primary" />
      </div>
      <p className="lg:text-xl ">
        {t(
          "define_your_shipping",
          "Define your shipping regions and how rates are calculated."
        )}{" "}
        <span className="text-primary cursor-pointer">
          {t("learn_more", "Learn more")}
        </span>
      </p>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({}) => {
          return (
            <Form>
              <TableContainer>
                <Table className="w-full">
                  <Tr>
                    <Th></Th>
                    <Th>{t("shipping_type", "Shipping Type")}</Th>
                    <Th>{t("shipping_calculation", "Shipping Calculation")}</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                  <TBody>
                    {ShippingMothedsData.map((mothed, i) => (
                      <Tr>
                        <Td className="pl-0">
                          <FlagIcon size={48} code={mothed.targetCountryCode} />
                        </Td>
                        <Td>{mothed.shippingName}</Td>
                        <Td>
                          {mothed.shippingCost.amount > 1 ? (
                            <PriceDisplay priceObject={mothed.shippingCost} />
                          ) : (
                            t("free_shipping", "Free Shipping")
                          )}
                        </Td>
                        <Td className="text-primary">
                          <div className="flex gap-2 items-center">
                            <BiEdit className="text-lg" />{" "}
                            {t("edit_shipping_rule", "Edit Shipping Rule")}
                          </div>
                        </Td>
                        <Td className="pr-0">
                          <div className="flex justify-end w-full">
                            <Switch />
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
              </TableContainer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

type ShippingMothedData = {
  shippingName: string;
  shippingCost: PriceType;
  targetCountryCode: FlagIconCode;
};

const ShippingMothedsData: ShippingMothedData[] = [
  {
    shippingName: "Paid Shipping",
    shippingCost: {
      amount: 25,
      currency: "USD",
    },
    targetCountryCode: "US",
  },
  {
    shippingName: "Free Shipping",
    shippingCost: {
      amount: 0,
      currency: "USD",
    },
    targetCountryCode: "CH",
  },
  {
    shippingName: "Click and Collect",
    shippingCost: {
      amount: 0,
      currency: "USD",
    },
    targetCountryCode: "FR",
  },
];
