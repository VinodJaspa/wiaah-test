import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  Badge,
  Button,
  CloseIcon,
  EyeIcon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SelectOption,
  Textarea,
  TrashIcon,
} from "@partials";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import { randomNum } from "utils";
import { startCase } from "lodash";
import { usePaginationControls } from "@blocks";
import { useRouting } from "routing";

interface AccountVerificationRequest {
  id: string;
  photo: string;
  name: string;
  type: "seller" | "buyer";
  date: string;
  status: "pending" | "refused" | "accepted";
}

const statues = ["pending", "refused", "accepted"] as const;

const accountVerificationRequests: AccountVerificationRequest[] = [
  ...Array(10),
].map((_, i) => ({
  id: i.toString(),
  name: `name-${i}`,
  date: new Date().toISOString(),
  photo: getRandomImage(),
  status: statues[Math.abs(i % 3)],
  type: randomNum(100) > 50 ? "seller" : "buyer",
}));

const AccountVerifications: NextPage = () => {
  const { t } = useTranslation();
  const [refuseId, setRefuseId] = React.useState<string>();
  const { controls } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();

  return (
    <section>
      <AdminListTable
        title={t("Account Verification Requests")}
        pagination={controls}
        headers={[
          {
            value: t("Photo"),
            type: AdminTableCellTypeEnum.image,
          },
          {
            value: t("Name"),
            type: AdminTableCellTypeEnum.text,
          },
          {
            value: t("Date"),
            type: AdminTableCellTypeEnum.date,
          },
          {
            value: t("Type of user"),
            type: AdminTableCellTypeEnum.custom,
            custom: (
              <Select>
                <SelectOption value={"seller"}>{t("Seller")}</SelectOption>
                <SelectOption value={"buyer"}>{t("Buyer")}</SelectOption>
              </Select>
            ),
          },
          {
            value: t("Status"),
            type: AdminTableCellTypeEnum.custom,
            custom: (
              <Select>
                <SelectOption value={"1"}>{t("Pending")}</SelectOption>
                <SelectOption value={"2"}>{t("Rejected")}</SelectOption>
                <SelectOption value={"3"}>{t("Accepted")}</SelectOption>
              </Select>
            ),
          },
          {
            props: { align: "right" },
            value: t("Action"),
          },
        ]}
        data={accountVerificationRequests.map(
          ({ id, date, name, photo, status, type }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.avatar,
                value: photo,
              },
              {
                value: name,
              },
              {
                value: new Date(date).toDateString(),
              },
              {
                value: startCase(type),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge
                    cases={{
                      off: "pending",
                      fail: "refused",
                      success: "accepted",
                    }}
                    value={status}
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
              {
                type: AdminTableCellTypeEnum.action,
                props: { align: "right" },
                actionBtns: [
                  <Button
                    onClick={() =>
                      visit((r) =>
                        r.addPath(getCurrentPath()).addPath("view").addPath(id)
                      )
                    }
                    colorScheme="info"
                    center
                    className="w-8 h-8"
                  >
                    <EyeIcon />
                  </Button>,
                  <Button colorScheme="primary" center className="w-8 h-8">
                    <ImCheckmark />
                  </Button>,
                  <Button
                    onClick={() => setRefuseId(id)}
                    colorScheme="danger"
                    center
                    className="w-8 h-8"
                  >
                    <TrashIcon />
                  </Button>,
                ],
              },
            ],
          })
        )}
      />
      <Modal isOpen={!!refuseId} onClose={() => setRefuseId(undefined)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader title={t("Refuse Account Verification")}>
            <ModalCloseButton>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <Textarea
            placeholder={t("Refuse Reason")}
            className="resize-none h-[10rem]"
          />
          <ModalFooter>
            <ModalCloseButton>
              <Button colorScheme="danger" outline>
                {t("Cancel")}
              </Button>
            </ModalCloseButton>
            <Button colorScheme="danger">{t("Reject")}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AccountVerifications;
