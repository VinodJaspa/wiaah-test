import React from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { AddressCardDetails } from "types/market/AddressDetails.interface";
import { Border, Grid, Padding, Text, BoldText, FlexStack } from "ui";
import { t } from "i18next";
import { colorPalette } from "../helpers/colorPalette";
import { IoTrash } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { Clickable } from "../partials";
export interface AddressCardProps {
  addressDetails: AddressCardDetails;
  onEdit?: (address: AddressCardDetails) => void;
  onDelete?: (addressId: string) => void;
  active?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  addressDetails,
  onDelete,
  onEdit,
  active,
}) => {
  function handleDeleteClick() {
    if (onDelete) {
      onDelete(addressDetails.id);
    }
  }

  function handleEditClick() {
    if (onEdit) {
      onEdit(addressDetails);
    }
  }
  return (
    <div className="h-full w-full">
      <Border
        color={{ inHex: colorPalette.PrimaryGreen }}
        thinkness={{ value: active ? 2.5 : 0 }}
        rounded={{ value: 2.5 }}
      >
        <Padding X={{ value: 1 }} Y={{ value: 1 }}>
          <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
            <Grid cols={2} fullWidth>
              <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("first_name", "First Name")}:</BoldText>
                  <Text>{addressDetails.firstName}</Text>
                </FlexStack>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("address", "Address")}:</BoldText>
                  <Text>{addressDetails.address}</Text>
                </FlexStack>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("zip_code", "Zip Code")}:</BoldText>
                  <Text>{addressDetails.zipCode}</Text>
                </FlexStack>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("country", "Country")}:</BoldText>
                  <Text>{addressDetails.country}</Text>
                </FlexStack>
              </FlexStack>
              <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("last_name", "Last Name")}:</BoldText>
                  <Text>{addressDetails.lastName}</Text>
                </FlexStack>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("address_2", "Address 2")}:</BoldText>
                  <Text>{addressDetails.address2}</Text>
                </FlexStack>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("city", "City")}:</BoldText>
                  <Text>{addressDetails.city}</Text>
                </FlexStack>
                <FlexStack horizontalSpacingInRem={0.5}>
                  <BoldText>{t("contact", "Contact")}:</BoldText>
                  <Text>{addressDetails.contact}</Text>
                </FlexStack>
              </FlexStack>
            </Grid>
            <FlexStack alignItems="center" horizontalSpacingInRem={1}>
              <Clickable onClick={handleDeleteClick}>
                <div className="rounded bg-red-500 p-1">
                  <Text size="xl" color="#fff">
                    <IoTrash />
                  </Text>
                </div>
              </Clickable>
              <Clickable onClick={handleEditClick}>
                <Text size="2xl">
                  <FaEdit />
                </Text>
              </Clickable>
            </FlexStack>
          </FlexStack>
        </Padding>
      </Border>
    </div>
  );
};
