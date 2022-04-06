import { t } from "i18next";
import React from "react";
import {
  BoldText,
  Button,
  Divider,
  FilterInput,
  FlexStack,
  Grid,
  Input,
  Padding,
  Prefix,
  Spacer,
} from "../partials";
import {
  AddressDetails,
  AddressInputsFields,
} from "types/market/AddressDetails.interface";
import { SearchInput } from "./SearchInput";
import { FlagIcon } from "react-flag-kit";
import { Country } from "country-state-city";
import { FaSearch } from "react-icons/fa";

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
    React.useState<string | undefined>("EG");
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
      <FlexStack direction="vertical" verticalSpacingInRem={2}>
        <FlexStack direction="vertical">
          <Padding X={{ value: 2 }} Y={{ value: 1 }}>
            <FlexStack verticalSpacingInRem={1} direction="vertical">
              <div className="text-3xl capitalize">
                {t("delivery_country", "delivery country")}
              </div>
              <SearchInput
                id="DeliverySearchInput"
                icon={
                  currentCountryCode ? (
                    <FlagIcon code={currentCountryCode} />
                  ) : undefined
                }
                initialValue={"Egypt"}
                explictWidth={{ value: 20 }}
                components={Country.getAllCountries().map((country, i) => ({
                  name: country.name,
                  value: country.isoCode,
                  comp: (
                    <Prefix prefix={<FlagIcon code={country.isoCode} />}>
                      {country.name}
                    </Prefix>
                  ),
                }))}
                onValueChange={(value) => {
                  if (value.length < 1) setCurrentCountryCode(undefined);
                }}
                onSelection={(code) => setCurrentCountryCode(code)}
              />
            </FlexStack>
          </Padding>
          <Divider color="#F3F3F3" height={{ value: 1 }} />
          <Padding X={{ value: 2 }}>
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
                  explictWidth={{ value: 20 }}
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
                  explictWidth={{ value: 20 }}
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
                  explictWidth={{ value: 20 }}
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
                  explictWidth={{ value: 20 }}
                />
              </FlexStack>
              <Spacer />
              {!manual && (
                <>
                  <BoldText>{t("address_finder", "Address finder")}</BoldText>
                  <SearchInput
                    id="AddressFinderInput"
                    icon={<FaSearch />}
                    placeholder="start typing the first lines of your address"
                    explictWidth={{ value: 20 }}
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
                      explictWidth={{ value: 20 }}
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
                      explictWidth={{ value: 20 }}
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
                      explictWidth={{ value: 20 }}
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
                      explictWidth={{ value: 20 }}
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
                label={`${t("add_address_manually", "Add address manually")}?`}
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
              <Button
                id="AddAddressButton"
                onClick={handleSave}
                paddingX={{ value: 3 }}
                paddingY={{ value: 0.5 }}
                hexBackgroundColor="#000"
              >
                {edit
                  ? t("save_address", "save address".toUpperCase())
                  : t("add_address", "add address".toUpperCase())}
              </Button>
              {edit && (
                <Button
                  id="CancelAddAddressButton"
                  outlined
                  borderColor="#000"
                  hexTextColor="#000"
                  onClick={handleCancel}
                  paddingX={{ value: 3 }}
                  paddingY={{ value: 0.5 }}
                  hexBackgroundColor="#000"
                >
                  {t("cancel", "cancel".toUpperCase())}
                </Button>
              )}
            </FlexStack>
          </Padding>
        </FlexStack>
      </FlexStack>
    </div>
  );
};
