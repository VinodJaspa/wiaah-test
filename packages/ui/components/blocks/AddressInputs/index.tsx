import {
  BoldText,
  Button,
  FilterInput,
  FlexStack,
  Grid,
  Input,
  PhoneNumberInput,
  Prefix,
  SearchFilterInput,
  Spacer,
  useCursorScrollPagination,
} from "@UI";
import { Country } from "country-state-city";
import { Form, Formik } from "formik";
import React from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { AddressDetails, AddressInputsFields } from "types";

export interface AddressInputsProps {
  initialInputs?: AddressDetails;
  onCancel?: () => void;
  onChange?: (input: AddressDetails) => any;
  onSuccess?: (input: AddressDetails) => void;
  askBillingAddress?: boolean;
  askShippingAddress?: boolean;
}

export const AddressInputs: React.FC<AddressInputsProps> = ({
  initialInputs,
  onCancel,
  onSuccess,
  onChange,
  askBillingAddress = true,
  askShippingAddress = true,
}) => {
  const { t } = useTranslation();
  const { controls } = useCursorScrollPagination();
  const [edit, setEdit] = React.useState<boolean>(initialInputs ? true : false);
  const [input, setInputs] = React.useState<AddressInputsFields>(
    initialInputs
      ? {
          ...initialInputs,
          defaultBillingAddress: false,
          defaultDeliveryAddress: false,
        }
      : {
          firstName: "",
          lastName: "",
          address2: "",
          address: "",
          city: "",
          country: "",
          contact: "",
          defaultBillingAddress: false,
          defaultDeliveryAddress: false,
        },
  );

  onChange && onChange(input);

  const [currentCountryCode, setCurrentCountryCode] = React.useState<
    FlagIconCode | undefined
  >("EG");
  const [manual, setManual] = React.useState<boolean>(edit ? true : false);
  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }
  function handleSave() {
    if (onSuccess && input) {
      onSuccess(input);
    }
  }

  return (
    <div className="text-lg p-4">
      <div className="flex flex-col">
        <div className="flex flex-col gap-8">
          <Formik
            initialValues={input}
            onSubmit={(data) => console.log("add new address input", data)}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <div className="gap-4 flex flex-col">
                    <div className="text-xl capitalize">
                      {t("Delivery country")}
                    </div>
                    <SearchFilterInput
                      controls={controls}
                      id="DeliverySearchInput"
                      icon={() =>
                        currentCountryCode && (
                          <FlagIcon code={currentCountryCode} />
                        )
                      }
                      value={values.country}
                      onChange={(e) =>
                        typeof e.target.value === "string" &&
                        setFieldValue("country", e.target.value)
                      }
                      initialValue={"Egypt"}
                      className="pl-10 "
                      components={Country.getAllCountries().map(
                        (country, i) => ({
                          name: country.name,
                          value: country.isoCode,
                          comp: (
                            <Prefix
                              Prefix={
                                <FlagIcon
                                  code={country.isoCode as FlagIconCode}
                                />
                              }
                            >
                              {country.name}
                            </Prefix>
                          ),
                        }),
                      )}
                      onSelection={(code: any) => setCurrentCountryCode(code)}
                    />
                  </div>
                  <Grid cols={1}>
                    <div className="text-xl capitalize">
                      {t("Delivery address")}
                    </div>
                    <Spacer />
                    <FlexStack direction="vertical">
                      <BoldText>{t("First Name")}</BoldText>
                      <Input
                        id="FirstNameInput"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            firstName: e.target.value,
                          }))
                        }
                        value={input.firstName}
                        className=""
                      />
                    </FlexStack>
                    <FlexStack direction="vertical">
                      <BoldText>{t("Last Name")}</BoldText>
                      <Input
                        id="LastNameInput"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            lastName: e.target.value,
                          }))
                        }
                        value={input.lastName}
                        className=""
                      />
                    </FlexStack>
                    <FlexStack direction="vertical">
                      <BoldText>{t("Contact")}</BoldText>
                      <PhoneNumberInput />
                    </FlexStack>
                    <Spacer />
                    {!manual && (
                      <>
                        <BoldText>{t("Address finder")}</BoldText>
                        <SearchFilterInput
                          controls={controls}
                          id="AddressFinderInput"
                          icon={() => <FaSearch />}
                          onChange={(e) =>
                            setFieldValue("address", e.target.value)
                          }
                          value={values.address}
                          placeholder="start typing the first lines of your address"
                          className="pl-10 "
                        />
                      </>
                    )}
                    {manual && (
                      <>
                        <FlexStack direction="vertical">
                          <BoldText>{t("Address")}</BoldText>
                          <Input
                            id="AddressInput"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                adFdress: e.target.value,
                              }))
                            }
                            value={input.address}
                            className=""
                          />
                        </FlexStack>
                        <FlexStack direction="vertical">
                          <BoldText>{t("Address 2")}</BoldText>
                          <Input
                            id="Address2Input"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                address2: e.target.value,
                              }))
                            }
                            value={input.address2}
                            className=""
                          />
                        </FlexStack>
                        <FlexStack direction="vertical">
                          <BoldText>{t("Zip Code")}</BoldText>
                          <Input
                            id="ZipCodeInput"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                zipCode: Number(e.target.value),
                              }))
                            }
                            value={input.zipCode}
                            className=""
                          />
                        </FlexStack>
                        <FlexStack direction="vertical">
                          <BoldText>{t("city", "City")}</BoldText>
                          <Input
                            id="CityInput"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                city: e.target.value,
                              }))
                            }
                            value={input.city}
                            className=""
                          />
                        </FlexStack>
                        <FlexStack direction="vertical">
                          <BoldText>{t("Country")}</BoldText>
                          <Input
                            id="CountryInput"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                country: e.target.value,
                              }))
                            }
                            value={input.country}
                            className=""
                          />
                        </FlexStack>
                        <Spacer />
                      </>
                    )}
                  </Grid>
                  <Spacer />
                  <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
                    <FilterInput
                      className="-pb-3"
                      id="AddAddressManuallySwitcher"
                      onChange={(e) => setManual(e.target.checked)}
                      checked={manual}
                      variant="box"
                      label={`${t("Add address manually")}?`}
                    />
                    {askShippingAddress ? (
                      <FilterInput
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            defaultDeliveryAddress: e.target.checked,
                          }))
                        }
                        checked={input.defaultDeliveryAddress}
                        id="SetDefaultDeliveryAddressInput"
                        variant="box"
                        label={t("Set as default delivery address")}
                      />
                    ) : null}
                    {askBillingAddress ? (
                      <FilterInput
                        id="SetDefaultBillingAddressInput"
                        variant="box"
                        checked={input.defaultBillingAddress}
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            defaultBillingAddress: e.target.checked,
                          }))
                        }
                        label={t("Set as default billing address")}
                      />
                    ) : null}
                  </FlexStack>
                  <FlexStack horizontalSpacingInRem={1} justify="end" fullWidth>
                    {onSuccess ? (
                      <Button
                        className="self-end text-lg font-semibold px-[1.5rem]"
                        colorScheme="darkbrown"
                        id="AddAddressButton"
                        onClick={handleSave}
                      >
                        {edit ? t("Save") : t("Add Address")}
                      </Button>
                    ) : null}
                    {edit && (
                      <Button
                        outline
                        id="CancelAddAddressButton"
                        onClick={handleCancel}
                      >
                        {t("Cancel")}
                      </Button>
                    )}
                  </FlexStack>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
