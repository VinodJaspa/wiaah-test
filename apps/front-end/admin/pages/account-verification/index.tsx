import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  Badge,
  Button,
  CloseIcon,
  EyeIcon,
  Input,
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
  Radio,
} from "@partials";
import {
  ChooseWithInput,
  useAdminGetAccountIdentityRequestsQuery,
  useAdminGetAccountVerifciationRequestsQuery,
  useAdminGetAccountVerifficationRequest,
} from "ui";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import { randomNum } from "utils";
import { startCase } from "lodash";
import { usePaginationControls } from "@blocks";
import { useRouting } from "routing";
import { Form, Formik } from "formik";
import { AccountVerificationStatus } from "@features/API";

interface AccountVerificationRequest {
  id: string;
  photo: string;
  name: string;
  type: "seller" | "buyer";
  date: string;
  status: "pending" | "refused" | "accepted";
}

const statues = ["pending", "refused", "accepted"] as const;

const _data: AccountVerificationRequest[] = [...Array(10)].map((_, i) => ({
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
  const { controls, pagination } = usePaginationControls();
  const { data } = useAdminGetAccountVerifciationRequestsQuery({ pagination });
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
          // {
          //   value: t("Type of user"),
          //   type: AdminTableCellTypeEnum.custom,
          //   custom: (
          //     <Select>
          //       <SelectOption value={"seller"}>{t("Seller")}</SelectOption>
          //       <SelectOption value={"buyer"}>{t("Buyer")}</SelectOption>
          //     </Select>
          //   ),
          // },
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
        data={data.map(({ id, createdAt, fullName, idPhoto, status }) => ({
          id,
          cols: [
            {
              type: AdminTableCellTypeEnum.avatar,
              value: idPhoto,
            },
            {
              value: fullName,
            },
            {
              value: new Date(createdAt).toDateString(),
            },
            // {
            //   value: startCase(type),
            // },
            {
              type: AdminTableCellTypeEnum.custom,
              custom: (
                <Badge
                  cases={{
                    off: AccountVerificationStatus.Pending,
                    fail: AccountVerificationStatus.Rejected,
                    success: AccountVerificationStatus.Accepted,
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
        }))}
      />
      <Modal isOpen={!!refuseId} onClose={() => setRefuseId(undefined)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader title={""}>
            <ModalCloseButton>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <Formik
            initialValues={{
              reason: "",
              otherReason: "",
            }}
            onSubmit={() => {}}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="flex flex-col gap-4">
                  <p className="font-semibold text-xl">
                    {t("why do you think this account should be refused ?")}
                  </p>

                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.name)
                        : null
                    }
                    name={"seller_refuse_reason"}
                  >
                    {t("seller_refuse_fausses_info", "Fuasses Informations")}
                  </Radio>
                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.name)
                        : null
                    }
                    name={"seller_refuse_reason"}
                  >
                    {t(
                      "seller_refuse_verify_identity",
                      "Impossible to verify the identity of the seller"
                    )}
                  </Radio>
                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.name)
                        : null
                    }
                    name={"seller_refuse_reason"}
                  >
                    {t("Scams")}
                  </Radio>
                  <Radio
                    onChange={(e) =>
                      e.target.checked ? setFieldValue("reason", "other") : null
                    }
                    name={"seller_refuse_reason"}
                  >
                    {t("Other")}
                  </Radio>

                  {values.reason === "other" ? (
                    <Textarea
                      value={values.otherReason}
                      placeholder={t("other reason")}
                      className="min-h-[10rem]"
                      onChange={(e) =>
                        setFieldValue("otherReason", e.target.value)
                      }
                    />
                  ) : null}

                  <ModalFooter>
                    <ModalCloseButton>
                      <Button colorScheme="danger" outline>
                        {t("Cancel")}
                      </Button>
                    </ModalCloseButton>
                    <Button colorScheme="danger">{t("Reject")}</Button>
                  </ModalFooter>
                </div>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AccountVerifications;
