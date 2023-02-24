import { AccountDeletionRequestStatus } from "@features/API";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  CloseIcon,
  DateFormInput,
  HStack,
  Input,
  ListIcon,
  NotAllowedIcon,
  Pagination,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useAdminAcceptAccountDeletionRequest,
  useAdminGetAccountDeletionRequests,
  useAdminRejectAccountDeletionRequest,
  usePaginationControls,
} from "ui";
import { mapArray, useForm } from "utils";

const AccountDeletion: React.FC = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetAccountDeletionRequests>[0]
  >({ pagination }, { pagination });
  const { data: requests } = useAdminGetAccountDeletionRequests(form);

  const { mutate: acceptAccount } = useAdminAcceptAccountDeletionRequest();
  const { mutate: rejectAccount } = useAdminRejectAccountDeletionRequest();

  return (
    <section className="border border-gray-300">
      <div className="border border-gray-300">
        <div className="p-4 text-xl flex items-center gap-2">
          <ListIcon />
          <p>{t("Account Deletion Requests")}</p>
        </div>
      </div>
      <div className="p-4">
        <TableContainer>
          <Table className="w-full">
            <THead>
              <Tr>
                <Th>{t("Photo")}</Th>
                <Th>{t("Username")}</Th>
                <Th>{t("E-Mail")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Date Added")}</Th>
                <Th>{t("Actions")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th>
                  <Input {...inputProps("username")} />
                </Th>
                <Th>
                  <Input {...inputProps("email")} />
                </Th>
                <Th>
                  <Select
                    {...inputProps(
                      "status",
                      "value",
                      "onOptionChange",
                      (e) => e
                    )}
                  >
                    <SelectOption value={AccountDeletionRequestStatus.Pending}>
                      {t("Pending")}
                    </SelectOption>
                    <SelectOption value={AccountDeletionRequestStatus.Approved}>
                      {t("Approved")}
                    </SelectOption>
                    <SelectOption value={AccountDeletionRequestStatus.Rejected}>
                      {t("Rejected")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <DateFormInput
                    {...inputProps(
                      "dateAdded",
                      "dateValue",
                      "onDateChange",
                      (e) => e
                    )}
                  />
                </Th>
                <Th></Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(requests, ({ account, id, status, createdAt }) => (
                <Tr key={id}>
                  <Td>
                    <Avatar src={account.photo} />
                  </Td>
                  <Td>
                    {account.firstName} {account.lastName}
                  </Td>
                  <Td>{account.email}</Td>
                  <Td>
                    <Badge
                      value={status}
                      cases={{
                        fail: AccountDeletionRequestStatus.Rejected,
                        off: AccountDeletionRequestStatus.Pending,
                        success: AccountDeletionRequestStatus.Approved,
                      }}
                      className="flex justify-center"
                    >
                      {status}
                    </Badge>
                  </Td>
                  <Td>{new Date(createdAt).toDateString()}</Td>
                  <Td>
                    <HStack>
                      <Button
                        center
                        className="p-2"
                        onClick={() => {
                          acceptAccount(id);
                        }}
                      >
                        <ImCheckmark className="text-white" />
                      </Button>
                      <Button
                        className="p-2"
                        center
                        onClick={() => {
                          rejectAccount(id);
                        }}
                        colorScheme="danger"
                      >
                        <CloseIcon className="text-white" />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination controls={controls} />
    </section>
  );
};

export default AccountDeletion;
