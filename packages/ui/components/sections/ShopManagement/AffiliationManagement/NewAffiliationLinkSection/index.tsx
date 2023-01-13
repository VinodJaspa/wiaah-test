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
  Affiliation,
  CreateAffiliationInput,
} from "@UI";
import { products } from "../../../../../placeholder";
import { useGetMyProducts } from "@features/Products/services/queries/useGetMyProducts";

export interface NewAffiliationLinkSectionProps {
  values?: CreateAffiliationInput;
  onSubmit?: (data: CreateAffiliationInput) => any;
  children?: React.ReactNode;
  onBack?: () => any;
}

const MAX_DISCOUNT = 100;
const DISCOUNT_INCREMENTAL = 5;

export function NewAffiliationLinkSection({
  onSubmit,
  values,
  onBack,
}: NewAffiliationLinkSectionProps) {
  const { data: prods } = useGetMyProducts({ args: { page: 1, take: 10000 } });
  const { t } = useTranslation();
  const { cancelNew } = React.useContext(AffiliationManagementContext);
  const isEdit = !!values;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col sm:flex-row w-full justify-between items-center">
          <p className="text-4xl ">
            {isEdit ? t("Edit Affiliation") : t("Create New Affiliation")}
          </p>
          <Button
            onClick={() => {
              cancelNew();
              onBack && onBack();
            }}
          >
            {t("back", "Back")}
          </Button>
        </div>
        <Divider className="border-primary" />
      </div>
      <Formik<CreateAffiliationInput>
        initialValues={{
          commision: 0,
          itemId: "",
          itemType: "product",
          validFor: 65,
        }}
        onSubmit={(data) => {
          onSubmit && onSubmit(data);
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
                  <SelectOption key={prod.id + i} value={prod.id}>
                    {prod.title}
                  </SelectOption>
                ))}
            </FormikInput>
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
}
