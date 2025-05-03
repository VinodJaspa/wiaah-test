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
  usePaginationControls,
  ScrollPaginationWrapper,
  useResponsive,
  SectionHeader,
  useCreateNewAffiliationMutation,
  InputGroup,
  InputLeftElement,
  DollarIcon,
  Input,
  DateFormInput,
} from "@UI";
import * as yup from "yup";
import { useGetMyProducts } from "@features/Products";
import { CreateAffiliationInput } from "@features/API";
import { mapArray, useForm } from "@UI/../utils/src";

export interface NewAffiliationLinkSectionProps {
  values?: CreateAffiliationInput;
  onSubmit?: (data: CreateAffiliationInput) => any;
  children?: React.ReactNode;
  onBack?: () => any;
}

const MAX_DISCOUNT = 100;
const DISCOUNT_INCREMENTAL = 5;

export function AffiliationForm({
  onSubmit,
  values,
  onBack,
}: NewAffiliationLinkSectionProps) {
  const { isMobile } = useResponsive();

  const { pagination, controls } = usePaginationControls();

  const { data: prods } = useGetMyProducts({ pagination });

const { t } = useTranslation();

  const { cancelNew } = React.useContext(AffiliationManagementContext);

  const isEdit = !!values;

  const { selectProps, inputProps, dateInputProps, form } = useForm<
    Parameters<typeof mutate>[0]["args"]
  >({
    commision: 0,
    expireAt: "",
    itemId: "",
    itemType: "",
  });
  const { mutate, isLoading } = useCreateNewAffiliationMutation();

  return (
    <div className="flex flex-col gap-8 py-2 px-2">
      <div className="flex flex-col gap-2 w-full">
        <SectionHeader
          sectionTitle={
            isEdit ? t("Edit Affiliation") : t("Create New Affiliation")
          }
          className="flex w-full gap-2 sm:justify-between items-center"
        >
          {isMobile ? null : (
            <Button
              onClick={() => {
                cancelNew();
                onBack && onBack();
              }}
            >
              {t("Back")}
            </Button>
          )}
        </SectionHeader>
        {isMobile ? null : <Divider className="border-primary" />}
      </div>
      {isMobile ? (
        <div className="flex flex-col gap-4">
          <Select {...selectProps("itemId")} label={t("Product")}>
            {mapArray(prods, (v, i) => (
              <SelectOption key={v.id + i} value={v.id}>
                {v.title}
              </SelectOption>
            ))}
          </Select>

          <div className="flex flex-col gap-1">
            <p>{t("Commission percent")}</p>
            <InputGroup>
              <InputLeftElement>
                <DollarIcon className="text-2xl" />
              </InputLeftElement>
              <Input type="number" {...inputProps("commision")} />
            </InputGroup>
          </div>

          <div>
            <p>{t("Expiry Date")}</p>
            <DateFormInput {...dateInputProps("expireAt")} />
          </div>
          <Button
            loading={isLoading}
            colorScheme="darkbrown"
            onClick={() => mutate({ args: form })}
            className="self-end"
          >
            {t("Create")}
          </Button>
        </div>
      ) : (
        <Formik<CreateAffiliationInput>
          initialValues={{
            commision: 0,
            itemId: "",
            itemType: "product",
            expireAt: "",
          }}
          validationSchema={yup.object({
            commision: yup.number().min(1).max(95).required(),
            expireAt: yup.string().required(),
            itemId: yup.string().required(),
            itemType: yup.string().required(),
          })}
          onSubmit={(data) => {
            onSubmit && onSubmit(data);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-4">
              <FormikInput<SelectProps>
                onOptionSelect={(value) => {
                  setFieldValue("itemId", value);
                }}
                value={values.itemId}
                as={Select}
                name="productId"
                placeholder={t("select_product", "Select Product")}
              >
                <ScrollPaginationWrapper controls={controls}>
                  {prods &&
                    prods.map((prod, i) => (
                      <SelectOption key={prod.id + i} value={prod.id}>
                        {prod.title}
                      </SelectOption>
                    ))}
                </ScrollPaginationWrapper>
              </FormikInput>
              <FormikInput<SelectProps>
                onOptionSelect={(v) => setFieldValue("commision", v)}
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
                  name={"expireAt"}
                  className="w-96"
                />
                <Menu isLazy>
                  <MenuButton>
                    <BiCalendarEdit className="cursor-pointer text-2xl" />
                  </MenuButton>
                  <MenuList className="left-0 origin-top-left">
                    <DateInput
                      onDaySelect={(date) => setFieldValue("expireAt", date)}
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
      )}
    </div>
  );
}
