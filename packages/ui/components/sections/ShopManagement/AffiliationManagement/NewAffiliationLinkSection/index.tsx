import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
import {
  Button,
  Divider,
  AffiliationManagementContext,
  FormikInput,
  Select,
  SelectProps,
  DateInput,
  Menu,
  MenuButton,
  MenuList,
  SelectOption,
} from "ui";
import { products } from "../../../../../placeholder";

export interface NewAffiliationLinkSectionProps {}

const MAX_DISCOUNT = 100;
const DISCOUNT_INCREMENTAL = 5;

const prods = products
  ? products.map((prod) => ({
      productId: prod.id,
      productName: prod.name,
    }))
  : [];
export const NewAffiliationLinkSection: React.FC<NewAffiliationLinkSectionProps> =
  ({}) => {
    const { t } = useTranslation();
    const { cancelNew } = React.useContext(AffiliationManagementContext);

    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            <p className="text-4xl ">
              {t("create_new_affiliation", "Create New Affiliation")}
            </p>
            <Button onClick={cancelNew}>{t("back", "Back")}</Button>
          </div>
          <Divider className="border-primary" />
        </div>
        <Formik
          initialValues={{
            productId: null,
            commission: null,
            price: null,
            productLink: null,
            expiryDate: null,
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-4">
              <FormikInput<SelectProps>
                onOptionSelect={(value) => {
                  setFieldValue("productId", value);
                }}
                as={Select}
                name="productId"
                placeholder={t("select_product", "Select Product")}
              >
                {prods &&
                  prods.map((prod, i) => (
                    <SelectOption
                      key={prod.productId + i}
                      value={prod.productId}
                    >
                      {prod.productName}
                    </SelectOption>
                  ))}
              </FormikInput>
              <FormikInput
                placeholder={t("price", "Price")}
                type={"number"}
                name={"price"}
              />
              <FormikInput<SelectProps>
                onOptionSelect={(v) => setFieldValue("commission", v)}
                placeholder={t("commission", "Commission") + " %"}
                as={Select}
                label={t("set_commission_percent", "Set Commission Percent")}
                name={"commission"}
              >
                {[...Array(MAX_DISCOUNT / DISCOUNT_INCREMENTAL)].map((_, i) => (
                  <SelectOption value={i * DISCOUNT_INCREMENTAL}>
                    {i * DISCOUNT_INCREMENTAL}%
                  </SelectOption>
                ))}
              </FormikInput>
              <FormikInput
                placeholder={t("product_link", "Product Link")}
                name={"productLink"}
              />
              <div className="w-full flex gap-2 items-center">
                <FormikInput
                  placeholder={t("choose_expiry_date", "Choose Expiry Date")}
                  name={"expiryDate"}
                  className="w-96"
                />
                <Menu isLazy>
                  <MenuButton>
                    <BiCalendarEdit className="cursor-pointer text-2xl" />
                  </MenuButton>
                  <MenuList className="left-0 origin-top-left">
                    <DateInput
                      onDaySelect={(date) => setFieldValue("expiryDate", date)}
                    />
                  </MenuList>
                </Menu>
              </div>
              <div className="flex w-full justify-end">
                <Button onClick={cancelNew} className="w-fit" type="submit">
                  {t("create", "Create")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
