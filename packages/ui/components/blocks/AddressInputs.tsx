import { t } from "i18next";
import React from "react";
import {
  BoldText,
  Button,
  Clickable,
  DropdownPanel,
  FilterInput,
  FlexStack,
  Input,
  Prefix,
  Text,
} from "../partials";
import { AddressDetails } from "types/market/AddressDetails.interface";
import { colorPalette } from "../helpers/colorPalette";
import { IoClose } from "react-icons/io5";
import { SearchInput } from "./SearchInput";
import { FlagIcon } from "react-flag-kit";
import { Country } from "country-state-city";
import { FaSearch } from "react-icons/fa";

export interface AddressInputsProps {
  inputs?: AddressDetails;
  onCancel?: () => void;
  onSuccess?: (input: AddressDetails) => void;
}

export const AddressInputs: React.FC<AddressInputsProps> = ({
  inputs,
  onCancel,
  onSuccess,
}) => {
  const [input, setInputs] = React.useState<AddressDetails>(
    inputs
      ? inputs
      : {
          firstName: "",
          lastName: "",
          address2: "",
          address: "",
          city: "",
          country: "",
          contact: "",
        }
  );
  const [currentCountryCode, setCurrentCountryCode] =
    React.useState<string | number>("");
  const [manual, setManual] = React.useState<boolean>(false);
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
        <FlexStack alignItems="center" justify="between">
          <BoldText>
            <Text size="2xl">{inputs ? "Edit Address" : "Add Address"}</Text>
          </BoldText>
          <Text size="2xl">
            <Clickable onClick={handleCancel}>
              <IoClose />
            </Clickable>
          </Text>
        </FlexStack>
        <FlexStack direction="vertical">
          <BoldText>{t("first_name", "First Name")}</BoldText>
          <Input
            onChange={(e) =>
              setInputs((state) => ({ ...state, firstName: e.target.value }))
            }
            value={input.firstName}
            explictWidth={{ value: 20 }}
          />
        </FlexStack>
        <FlexStack direction="vertical">
          <BoldText>{t("last_name", "Last Name")}</BoldText>
          <Input
            onChange={(e) =>
              setInputs((state) => ({ ...state, lastName: e.target.value }))
            }
            value={input.lastName}
            explictWidth={{ value: 20 }}
          />
        </FlexStack>
        {!manual && (
          <>
            <FlexStack direction="vertical">
              <BoldText>{t("country", "Country")}</BoldText>
              <SearchInput
                icon={
                  currentCountryCode ? (
                    <FlagIcon code={currentCountryCode} />
                  ) : undefined
                }
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
                onSelection={(code) => setCurrentCountryCode(code)}
              />
            </FlexStack>
            <FlexStack direction="vertical">
              <BoldText>{t("address", "Address")}</BoldText>
              <SearchInput
                icon={<FaSearch />}
                placeholder="start typing the first lines of your address"
                explictWidth={{ value: 20 }}
              />
            </FlexStack>
          </>
        )}
        <FilterInput
          onChange={(e) => setManual(e.target.checked)}
          variant="box"
          label="Add Address manually?"
        />
        {manual && (
          <>
            <FlexStack direction="vertical">
              <BoldText>{t("address", "Address")}</BoldText>
              <Input
                onChange={(e) =>
                  setInputs((state) => ({ ...state, address: e.target.value }))
                }
                value={input.address}
                explictWidth={{ value: 20 }}
              />
            </FlexStack>
            <FlexStack direction="vertical">
              <BoldText>{t("address_2", "Address 2")}</BoldText>
              <Input
                onChange={(e) =>
                  setInputs((state) => ({ ...state, address2: e.target.value }))
                }
                value={input.address2}
                explictWidth={{ value: 20 }}
              />
            </FlexStack>
            <FlexStack direction="vertical">
              <BoldText>{t("city", "City")}</BoldText>
              <Input
                onChange={(e) =>
                  setInputs((state) => ({ ...state, city: e.target.value }))
                }
                value={input.city}
                explictWidth={{ value: 20 }}
              />
            </FlexStack>
            <FlexStack direction="vertical">
              <BoldText>{t("country", "Country")}</BoldText>
              <Input
                onChange={(e) =>
                  setInputs((state) => ({ ...state, country: e.target.value }))
                }
                value={input.country}
                explictWidth={{ value: 20 }}
              />
            </FlexStack>
          </>
        )}
        <FlexStack direction="vertical">
          <BoldText>{t("zip_code", "Zip Code")}</BoldText>
          <Input
            type={"number"}
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
            onChange={(e) =>
              setInputs((state) => ({ ...state, contact: e.target.value }))
            }
            value={input.contact}
            explictWidth={{ value: 20 }}
          />
        </FlexStack>
        <FlexStack horizontalSpacingInRem={1}>
          <Button onClick={handleSave} paddingX={{ value: 1 }}>
            {t("save", "Save")}
          </Button>
          <Button
            onClick={handleCancel}
            paddingX={{ value: 1 }}
            outlined
            hexTextColor={colorPalette.PrimaryGreen}
          >
            {t("cancel", "Cancel")}
          </Button>
        </FlexStack>
      </FlexStack>
    </div>
  );
};
