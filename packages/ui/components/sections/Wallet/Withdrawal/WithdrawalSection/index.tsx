import React from "react";
import {
  SectionHeader,
  SectionHeaderProps,
  Button,
  Table,
  Tr,
  Td,
  Th,
  TBody,
  THead,
  Modal,
  ModalContent,
  ModalOverlay,
  FormikInput,
  Divider,
  ModalFooter,
  Input,
} from "ui";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { useNewWithdrawalModal } from "@src/Hooks";
import { NewWithdrawalOpenState } from "@src/state";
import { useSetRecoilState } from "recoil";
import { randomNum } from "../../../../helpers";

export interface WithdrawalSectionProps {}

export const WithdrawalSection: React.FC<WithdrawalSectionProps> = ({}) => {
  const { t } = useTranslation();
  const stripeSignedin = false;
  const setOpen = useSetRecoilState(NewWithdrawalOpenState);
  return (
    <>
      {stripeSignedin ? (
        <div className="flex flex-col gap-8">
          <SectionHeader sectionTitle={t("withdrawal", "Withdrawal")}>
            <Button onClick={() => setOpen(true)}>
              {t("create_new_withdrawal", "Create New Withdrawal")}
            </Button>
            <NewWithdrawalModal />
          </SectionHeader>
          {/* <div>
            <Table>
              <THead>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody></TBody>
            </Table>
          </div> */}
        </div>
      ) : (
        <StripeWithdrawalSigninSection />
      )}
    </>
  );
};

export const StripeWithdrawalSigninSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("withdrawal", "Withdrawal")} />
      <div className="bg-primary-100 px-4 pb-4 pt-2 rounded flex flex-col gap-2">
        <p className="text-gray-500 text-xl">
          <span className="font-bold">{t("info", "Info")}</span>{" "}
          {t(
            "stripe_signup_info",
            "Please signup for stripe connected account and submit your bank details in order to start receiving funds for your sales."
          )}
        </p>
        <Button className="w-fit">
          {t("get_paid_with_stripe", "Get paid With Stripe")}
        </Button>
      </div>
    </div>
  );
};

export const NewWithdrawalModal: React.FC = () => {
  const { isOpen, onClose, onOpen } = useNewWithdrawalModal();
  const { t } = useTranslation();
  function handleOpen() {
    onOpen();
  }

  function handleClose() {
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent className="w-[min(100%,30rem)]">
        <div className="text-xl flex w-full justify-between items-center">
          <span>{t("create_new_withdrawal", "Create New Withdrawal")}</span>
          <MdClose className="cursor-pointer" onClick={handleClose} />
        </div>
        <Divider className="my-2" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-gray-400">{t("amount", "Amount")}</span>
            <Input placeholder="100" className="px-0" flushed />
          </div>

          <span>
            {t("available_credit", "Available Credit")}:{" "}
            <span className="font-bold">${randomNum(5000)}</span>
          </span>
          <span>
            {t("converted_amount", "Converted Amount")}: ${randomNum(5000)}
          </span>
          <p>
            {t(
              "withdrawal_bank_currency_note",
              "Note: This will be the currency of your bank account. i.e the currency in which you want to take withdrawal"
            )}
          </p>
        </div>
        <Divider className="my-16 mb-2" />
        <ModalFooter>
          <Button
            className="bg-red-500 hover:bg-red-600 active:bg-red-700"
            onClick={handleClose}
          >
            {t("close", "Close")}
          </Button>
          <Button onClick={handleClose}>
            {t("convert_amount", "Convert Amount")}
          </Button>
          <Button onClick={handleClose}>{t("submit", "Submit")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
