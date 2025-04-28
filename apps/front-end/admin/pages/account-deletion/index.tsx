import { AccountDeletionRequestStatus } from "@features/API";
import Head from "next/head";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  AdminGetAccountDeletionRequestsQuery,
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
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetAccountDeletionRequests>[0]
  >({ pagination }, { pagination });
  const { data: _requests } = useAdminGetAccountDeletionRequests(form);
  const requests = FAKE_REQUESTS;

  const { mutate: acceptAccount } = useAdminAcceptAccountDeletionRequest();
  const { mutate: rejectAccount } = useAdminRejectAccountDeletionRequest();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Account Deletion</title>
      </Head>
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
                        (e) => e,
                      )}
                    >
                      <SelectOption
                        value={AccountDeletionRequestStatus.Pending}
                      >
                        {t("Pending")}
                      </SelectOption>
                      <SelectOption
                        value={AccountDeletionRequestStatus.Approved}
                      >
                        {t("Approved")}
                      </SelectOption>
                      <SelectOption
                        value={AccountDeletionRequestStatus.Rejected}
                      >
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
                        (e) => e,
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
    </React.Fragment>
  );
};

export default AccountDeletion;

const FAKE_REQUESTS: AdminGetAccountDeletionRequestsQuery["getAccountDeletionRequests"] =
  [
    {
      __typename: "AccountDeletionRequest",
      id: "req1",
      status: AccountDeletionRequestStatus.Pending,
      createdAt: "2023-07-01T00:00:00Z",
      account: {
        __typename: "Account",
        photo: "https://example.com/photo1.jpg",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    },
    {
      __typename: "AccountDeletionRequest",
      id: "req2",

      status: AccountDeletionRequestStatus.Approved,
      createdAt: "2023-06-15T00:00:00Z",
      account: {
        __typename: "Account",
        photo: "https://example.com/photo2.jpg",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
      },
    },
    {
      __typename: "AccountDeletionRequest",
      id: "req3",
      status: AccountDeletionRequestStatus.Rejected,
      createdAt: "2023-05-20T00:00:00Z",
      account: {
        __typename: "Account",
        photo: getRandomImage(),
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
      },
    },
  ];
