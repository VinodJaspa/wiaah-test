import React from "react";
import {
  BoldText,
  Button,
  FilterInput,
  FlexStack,
  Grid,
  Input,
  Padding,
  Prefix,
  Spacer,
} from "ui/components/partials";
import {
  AddressDetails,
  AddressInputsFields,
} from "types/market/AddressDetails.interface";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { Country } from "country-state-city";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SearchFilterInput } from "ui";
import { Form, Formik } from "formik";

export interface AddressInputsProps {
  initialInputs?: AddressDetails;
  onCancel?: () => void;
  onSuccess?: (input: AddressDetails) => void;
}

export const AddressInputs: React.FC<AddressInputsProps> = ({
  initialInputs,
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();
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
        }
  );

  const [currentCountryCode, setCurrentCountryCode] =
    React.useState<FlagIconCode | undefined>("EG");
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
    <div className="text-lg">
      <div className="flex flex-col">
        <div className="flex flex-col gap-8">
          <Formik
            initialValues={input}
            onSubmit={(data) => console.log("add new address input", data)}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <div className="gap-1 flex flex-col">
                    <div className="text-3xl capitalize">
                      {t("delivery_country", "delivery country")}
                    </div>
                    <SearchFilterInput
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
                      className="pl-10 w-[20rem]"
                      components={Country.getAllCountries().map(
                        (country, i) => ({
                          name: country.name,
                          value: country.isoCode,
                          comp: (
                            //@ts-ignore
                            <Prefix
                              //@ts-ignore
                              Prefix={<FlagIcon code={country.isoCode} />}
                            >
                              {country.name}
                            </Prefix>
                          ),
                        })
                      )}
                      onSelection={(code: any) => setCurrentCountryCode(code)}
                    />
                  </div>
                  <Grid cols={1}>
                    <div className="text-3xl capitalize">
                      {t("delivery_address", "delivery address")}
                    </div>
                    <Spacer />
                    <FlexStack direction="vertical">
                      <BoldText>{t("first_name", "First Name")}</BoldText>
                      <Input
                        id="FirstNameInput"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            firstName: e.target.value,
                          }))
                        }
                        value={input.firstName}
                        className="w-[20rem]"
                      />
                    </FlexStack>
                    <FlexStack direction="vertical">
                      <BoldText>{t("last_name", "Last Name")}</BoldText>
                      <Input
                        id="LastNameInput"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            lastName: e.target.value,
                          }))
                        }
                        value={input.lastName}
                        className="w-[20rem]"
                      />
                    </FlexStack>
                    <FlexStack direction="vertical">
                      <BoldText>{t("zip_code", "Zip Code")}</BoldText>
                      <Input
                        id="ZipCodeInput"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            zipCode: Number(e.target.value),
                          }))
                        }
                        value={input.zipCode}
                        className="w-[20rem]"
                      />
                    </FlexStack>
                    <FlexStack direction="vertical">
                      <BoldText>{t("contact", "Contact")}</BoldText>
                      <Input
                        id="ContactInput"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            contact: e.target.value,
                          }))
                        }
                        value={input.contact}
                        className="w-[20rem]"
                      />
                    </FlexStack>
                    <Spacer />
                    {!manual && (
                      <>
                        <BoldText>
                          {t("address_finder", "Address finder")}
                        </BoldText>
                        <SearchFilterInput
                          id="AddressFinderInput"
                          icon={() => <FaSearch />}
                          onChange={(e) =>
                            setFieldValue("address", e.target.value)
                          }
                          value={values.address}
                          placeholder="start typing the first lines of your address"
                          className="pl-10 w-[20rem]"
                        />
                      </>
                    )}
                    {manual && (
                      <>
                        <FlexStack direction="vertical">
                          <BoldText>{t("address", "Address")}</BoldText>
                          <Input
                            id="AddressInput"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                adFdress: e.target.value,
                              }))
                            }
                            value={input.address}
                            className="w-[20rem]"
                          />
                        </FlexStack>
                        <FlexStack direction="vertical">
                          <BoldText>{t("address_2", "Address 2")}</BoldText>
                          <Input
                            id="Address2Input"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                address2: e.target.value,
                              }))
                            }
                            value={input.address2}
                            className="w-[20rem]"
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
                            className="w-[20rem]"
                          />
                        </FlexStack>
                        <FlexStack direction="vertical">
                          <BoldText>{t("country", "Country")}</BoldText>
                          <Input
                            id="CountryInput"
                            onChange={(e) =>
                              setInputs((state) => ({
                                ...state,
                                country: e.target.value,
                              }))
                            }
                            value={input.country}
                            className="w-[20rem]"
                          />
                        </FlexStack>
                        <Spacer />
                      </>
                    )}
                    <Spacer />
                    <FilterInput
                      id="AddAddressManuallySwitcher"
                      onChange={(e) => setManual(e.target.checked)}
                      checked={manual}
                      variant="box"
                      label={`${t(
                        "add_address_manually",
                        "Add address manually"
                      )}?`}
                    />
                  </Grid>
                  <Spacer />
                  <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
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
                      label={t(
                        "set_default_delivery_address",
                        "Set as default delivery address"
                      )}
                    />
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
                      label={t(
                        "set_default_billing_address",
                        "Set as default billing address"
                      )}
                    />
                  </FlexStack>
                  <FlexStack horizontalSpacingInRem={1} justify="end" fullWidth>
                    <Button id="AddAddressButton" onClick={handleSave}>
                      {edit
                        ? t("save_address", "save address".toUpperCase())
                        : t("add_address", "add address".toUpperCase())}
                    </Button>
                    {edit && (
                      <Button
                        outline
                        id="CancelAddAddressButton"
                        onClick={handleCancel}
                      >
                        {t("cancel", "cancel".toUpperCase())}
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
