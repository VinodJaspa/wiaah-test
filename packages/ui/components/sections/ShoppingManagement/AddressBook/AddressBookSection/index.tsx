import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { IoCheckmark, IoTrash } from "react-icons/io5";
import { HtmlDivProps } from "types";
import {
  SectionHeader,
  AddressInputs,
  useGetMyShippingAddressesQuery,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@UI";
import { BsMailbox2 } from "react-icons/bs";
import { mapArray, setTestid } from "utils";

export interface AddressBookSectionProps {}

export const AddressBookSection: React.FC<AddressBookSectionProps> = ({}) => {
  const { t } = useTranslation();
  const [addressSelected, setAddressSelected] = React.useState<number>();
  const [addNewAddress, setAddNewAddress] = React.useState<boolean>(false);
  function handleAddNewSuccess() {
    setAddNewAddress(false);
  }
  function handleAddNew() {
    setAddNewAddress(true);
  }
  function handleOpen() {
    setAddNewAddress(true);
  }

  const { data } = useGetMyShippingAddressesQuery();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("address_book", "Address Book")} />
      <div className="flex flex-wrap gap-4">
        <div
          onClick={handleAddNew}
          className="text-7xl flex-col gap-8 w-[min(100%,15rem)] flex justify-center items-center hover:bg-gray-200 cursor-pointer active:bg-gray-300"
        >
          <span className="flex justify-center items-center p-8 bg-gray-200 rounded-full">
            <BsMailbox2 className="text-primary-600" />
          </span>
          <span className="text-lg">
            {t("add_new_address", "Add New Address")}
          </span>
        </div>
        {mapArray(data, (info, i) => (
          <AddressBookCard
            {...setTestid("address-card")}
            selected={i === addressSelected}
            innerProps={{
              onClick: () => setAddressSelected(i),
            }}
            key={i}
            addressInfo={{
              addressName: info.location.address,
              mobileNumber: info.phone || "",
              instructions: info.instractions || "",
            }}
          />
        ))}
      </div>
      <Modal
        isOpen={addNewAddress}
        onClose={handleAddNewSuccess}
        onOpen={handleOpen}
      >
        <ModalOverlay />
        <ModalContent className="w-[min(100%,50rem)] px-8 bg-white">
          <AddressInputs onSuccess={handleAddNewSuccess} />
        </ModalContent>
      </Modal>
    </div>
  );
};

interface AddressBookInfo {
  addressName: string;
  instructions: string;
  mobileNumber: string;
}

export interface AddressBookCardProps {
  addressInfo: AddressBookInfo;
  selected?: boolean;
  onEdit?: (addressInfo: AddressBookInfo) => any;
  onRemove?: (addressInfo: AddressBookInfo) => any;
  innerProps?: HtmlDivProps;
}

export const AddressBookCard: React.FC<AddressBookCardProps> = ({
  addressInfo,
  selected,
  onEdit,
  onRemove,
  innerProps,
}) => {
  const { t } = useTranslation();
  return (
    <div
      {...innerProps}
      className="p-4 bg-primary-light border-[0.2em] border-primary w-[min(100%,15rem)] flex flex-col justify-between gap-4 relative"
    >
      <span className="font-bold">{addressInfo.addressName}</span>
      <p className="w-3/4 font-semibold">{addressInfo.instructions}</p>
      <span className="font-bold">
        {t("mobile", "Mobile")} - {addressInfo.mobileNumber}
      </span>
      <div className="flex gap-4 items-center">
        <span
          onClick={() => onRemove && onRemove(addressInfo)}
          className="cursor-pointer flex gap-2 items-center"
        >
          <IoTrash />
          {t("remove", "Remove")}
        </span>
        <span
          onClick={() => onEdit && onEdit(addressInfo)}
          className="cursor-pointer flex gap-2 items-center"
        >
          <BiEdit />
          {t("edit", "Edit")}
        </span>
      </div>
      {selected && (
        <div
          className="bg-primary flex justify-end absolute top-0 right-0 h-12 w-12"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          }}
        >
          <IoCheckmark className="text-white text-2xl" />
        </div>
      )}
    </div>
  );
};
