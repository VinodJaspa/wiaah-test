import { Form, Formik } from "formik";
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
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
  SectionHeader,
  useGetMyShippingRules,
  FlagIcon,
} from "@UI";
import { ShippingSettingsContext } from "../ShippingSettingsSection";

export const ShippingSettings: React.FC = () => {
  const { addNew } = React.useContext(ShippingSettingsContext);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { data } = useGetMyShippingRules();

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("shipping_settings", "Shipping Settings")}>
        {isMobile ? (
          <FiPlusSquare className="text-2xl" onClick={addNew} />
        ) : (
          <Button onClick={addNew} outline>
            {t("add_shipping", "Add Shipping")}
          </Button>
        )}
      </SectionHeader>
      <p className="lg:text-xl ">
        {t("Define your shipping regions and how rates are calculated.")}{" "}
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
                    <Th>{t("Shipping Type")}</Th>
                    <Th>{t("Shipping Calculation")}</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                  <TBody>
                    {data
                      ? data.map((method, i) => (
                          <Tr>
                            <Td className="pl-0">
                              {method?.countries?.at(0)?.code ? (
                                <FlagIcon
                                  size={"48"}
                                  code={method.countries.at(0)!.code}
                                />
                              ) : null}
                            </Td>
                            <Td>{method.name}</Td>
                            <Td>
                              {method.cost > 1 ? (
                                <PriceDisplay price={method.cost} />
                              ) : (
                                t("Free Shipping")
                              )}
                            </Td>
                            <Td className="text-primary">
                              <div className="flex gap-2 items-center">
                                <BiEdit className="text-lg" />
                                {t("Edit Shipping Rule")}
                              </div>
                            </Td>
                            <Td className="pr-0">
                              <div className="flex justify-end w-full">
                                <Switch />
                              </div>
                            </Td>
                          </Tr>
                        ))
                      : null}
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
