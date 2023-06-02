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
  useResponsive,
  HStack,
  HomeIcon,
  CheckmarkCircleFillIcon,
  CheckmarkCircleOutlineIcon,
  Button,
  TrashIcon,
  EditIcon,
  LocationIcon,
  PhoneHandleIcon,
  RoundedPlusIcon,
} from "@UI";
import { BsMailbox2 } from "react-icons/bs";
import { mapArray, setTestid } from "utils";

export interface AddressBookSectionProps {
  accountId: string;
}

export const AddressBookSection: React.FC<AddressBookSectionProps> = ({
  accountId,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
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

  return isMobile ? (
    <div className="p-4 h-full flex flex-col gap-4">
      <SectionHeader sectionTitle={t("address_book", "Address Book")} />
      {mapArray(data, (address, i) => {
        const isDefault = i === 0;
        return (
          <div
            className={`${
              addressSelected
                ? "border border-primary"
                : "border border-transparent"
            } p-2 rounded-lg flex flex-col gap-8`}
          >
            <div className="flex flex-col gap-6">
              <HStack className="flex justify-between items-center">
                <HStack>
                  <div className="relative w-9 h-9 flex justify-center items-center border border-primary rounded-full">
                    <CheckmarkCircleFillIcon className="text-primary absolute top-3/4 right-3/4 -translate-x-1/2 -translate-y-1/2" />
                    <HomeIcon className="text-primary" />
                  </div>
                  <p className="text-xl font-medium">{t("Home")}</p>
                </HStack>

                {isDefault ? (
                  <HStack className="border px-2 border-primary text-primary">
                    <p>{t("Default Address")}</p>
                    <CheckmarkCircleOutlineIcon />
                  </HStack>
                ) : null}
              </HStack>
              <div className="flex flex-col gap-4">
                <HStack>
                  <LocationIcon className="text-lg" />
                  <p>
                    <span>{address.location.address}</span>
                    {", "}
                    <span>{address.location.city}</span>
                    {", "}
                    <span>{address.location.country}</span>
                  </p>
                </HStack>

                <HStack>
                  <PhoneHandleIcon className="text-xl" />
                  <p>{address.phone}</p>
                </HStack>
              </div>
            </div>

            <HStack className="gap-6 justify-end">
              <Button onClick={() => {}} colorScheme="danger" outline>
                <HStack>
                  <TrashIcon />
                  <p>{t("Remove")}</p>
                </HStack>
              </Button>
              <Button onClick={() => {}} colorScheme="darkbrown">
                <HStack>
                  <EditIcon />
                  <p>{t("Edit")}</p>
                </HStack>
              </Button>
            </HStack>
          </div>
        );
      })}
      <Button onClick={handleAddNew} className="w-full">
        <HStack className="text-white">
          <RoundedPlusIcon />
          <p>{t("Add new address")}</p>
        </HStack>
      </Button>
    </div>
  ) : (
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
