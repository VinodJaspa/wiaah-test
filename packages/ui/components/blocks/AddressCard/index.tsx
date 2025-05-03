import React from "react";
import { AddressCardDetails } from "types";
import { useTranslation } from "react-i18next";

export interface AddressCardProps {
  addressDetails: AddressCardDetails;
  onEdit?: (address: AddressCardDetails) => void;
  onDelete?: (addressId: string) => void;
  active?: boolean;
  borderColor?: string;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  addressDetails,
  onDelete,
  onEdit,
  active,
}) => {
const { t } = useTranslation();

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
    <div
      className={`${
        active ? "border-2 border-primary" : "border-2 border-transparent"
      } p-4 rounded h-full w-full`}
    >
      <div className="flex items-center gap-2">
        <div
          onClick={handleEditClick}
          className="cursor-pointer w-full h-full flex justify-end text-base"
        >
          {t("edit", "Edit")}
        </div>
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={handleDeleteClick}
        >
          <span className="text-base text-red-400">Remove</span>
        </div>
      </div>

      <div className="grid grid-cols-2 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="font-bold">{t("first_name", "First Name")}:</span>
            <span>{addressDetails.firstName}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{t("address", "Address")}:</span>
            <span>{addressDetails.address}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{t("zip_code", "Zip Code")}:</span>
            <span>{addressDetails.zipCode}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{t("country", "Country")}:</span>
            <span>{addressDetails.country}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="font-bold">{t("last_name", "Last Name")}:</span>
            <span>{addressDetails.lastName}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{t("address_2", "Address 2")}:</span>
            <span>{addressDetails.address2}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{t("city", "City")}:</span>
            <span>{addressDetails.city}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{t("contact", "Contact")}:</span>
            <span>{addressDetails.contact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
