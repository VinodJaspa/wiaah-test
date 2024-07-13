import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { useRouting } from "routing";
import {
  Table,
  TBody,
  Tr,
  Td,
  THead,
  Th,
  Avatar,
  TrashIcon,
  Input,
  Select,
  SelectOption,
  DateFormInput,
  Pagination,
  usePaginationControls,
  NotAllowedIcon,
  SearchIcon,
  LockIcon,
  EditIcon,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseIcon,
  ModalCloseButton,
  QrcodeDisplay,
  Button,
  useGetFilteredBuyers,
} from "ui";
import { mapArray, NumberShortner, useForm } from "utils";

const FAKE_BUYERS = [
  {
    __typename: "Account",
    createdAt: "2024-07-12T00:00:00Z",
    email: "john.doe@example.com",
    firstName: "John",
    id: "account1",
    lastName: "Doe",
    photo: "https://example.com/photos/john.jpg",
    verified: true,
    accountType: "buyer",
    status: "active",
    ips: ["192.168.1.1"],
    membershipId: "membership1",
    profile: {
      __typename: "Profile",
      visits: 10,
    },
    shop: {
      __typename: "Shop",
      location: {
        __typename: "Location",
        address: "123 Main St",
        city: "Springfield",
        country: "USA",
      },
    },
    Membership: {
      __typename: "Membership",
      name: "Premium",
    },
    balance: {
      __typename: "Balance",
      withdrawableBalance: 100.0,
    },
  },
  {
    __typename: "Account",
    createdAt: "2024-07-11T00:00:00Z",
    email: "jane.smith@example.com",
    firstName: "Jane",
    id: "account2",
    lastName: "Smith",
    photo: "https://example.com/photos/jane.jpg",
    verified: false,
    accountType: "buyer",
    status: "inactive",
    ips: ["192.168.1.2"],
    membershipId: "membership2",
    profile: {
      __typename: "Profile",
      visits: 5,
    },
    shop: {
      __typename: "Shop",
      location: {
        __typename: "Location",
        address: "456 Elm St",
        city: "Shelbyville",
        country: "USA",
      },
    },
    Membership: {
      __typename: "Membership",
      name: "Basic",
    },
    balance: {
      __typename: "Balance",
      withdrawableBalance: 50.0,
    },
  },
];

const Buyers: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath, getUrl } = useRouting();
  const [qrcode, setQrCode] = React.useState<string>();
  const { controls, pagination } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useGetFilteredBuyers>[0]
  >({ pagination }, { pagination });

  const { data: _buyers, refetch } = useGetFilteredBuyers(form);
  const buyers = FAKE_BUYERS;

  React.useEffect(() => {
    refetch({});
  }, [form]);

  return (
    <TableContainer>
      <Table
        className="w-max"
        TrProps={{ className: "border-b border-darkerGray" }}
      >
        <THead>
          <Tr>
            <Th></Th>
            <Th className="text-left">{t("Buyer")}</Th>
            <Th>{t("Email")}</Th>
            <Th>{t("Verification Status")}</Th>
            <Th>{t("Balance")}</Th>
            <Th>{t("Status")}</Th>
            <Th>{t("Date Created")}</Th>
            <Th>{t("Vists")}</Th>
            <Th>{t("IPs")}</Th>
            <Th>{t("QR Code")}</Th>
            <Th>{t("Action")}</Th>
          </Tr>
        </THead>

        <TBody>
          <Tr>
            <Td></Td>
            <Td>
              <Input {...inputProps("name")} />
            </Td>
            <Td>
              <Input {...inputProps("email")} />
            </Td>
            <Td>
              <Select>
                <SelectOption value={true}>{t("Verified")}</SelectOption>
                <SelectOption value={false}>{t("unVerified")}</SelectOption>
              </Select>
            </Td>
            <Td>
              <Input type={"number"} {...inputProps("balance")} />
            </Td>
            <Td>
              <Select
                {...inputProps("status", "value", "onOptionSelect", (e) => e)}
              >
                <SelectOption value={"active"}>{t("active")}</SelectOption>
                <SelectOption value={"inActive"}>{t("inActive")}</SelectOption>
              </Select>
            </Td>
            <Td>
              <DateFormInput
                {...inputProps("date", "dateValue", "onDateChange", (e) => e)}
              />
            </Td>
            <Td>
              <Input {...inputProps("visits")} />
            </Td>
            <Td>
              <Input {...inputProps("ip")} />
            </Td>
          </Tr>

          {mapArray(buyers, (buyer, i) => (
            <Tr className="hover:bg-darkerGray cursor-pointer" key={i}>
              <Td>
                <Avatar src={buyer.photo} alt={buyer.firstName} />
              </Td>
              <Td>{buyer.firstName}</Td>
              <Td>{buyer.email}</Td>
              <Td>{buyer.verified ? t("Verified") : t("unVerified")}</Td>
              <Td>{buyer.balance?.withdrawableBalance}</Td>
              <Td>{buyer.status}</Td>
              <Td>{new Date(buyer.createdAt).toDateString()}</Td>
              <Td>{NumberShortner(buyer.profile?.visits)}</Td>
              <Td>
                <div className="flex flex-col w-full gap-1">
                  {buyer.ips?.map((v, i) => (
                    <p key={v + i}>{v}</p>
                  ))}
                </div>
              </Td>
              <Td>
                <Button
                  onClick={() => {
                    setQrCode(
                      getUrl((r) =>
                        r.visitSellerSocialProfile({ sellerId: buyer.id })
                      )
                    );
                  }}
                >
                  {t("Show Qr Code")}
                </Button>
              </Td>
              <Td>
                <div className="grid grid-cols-3 justify-center gap-2 fill-white text-white text-sm">
                  <SearchIcon className="w-8 h-8 p-2 bg-cyan-600" />
                  <EditIcon
                    onClick={() =>
                      visit((r) =>
                        r
                          .addPath(getCurrentPath())
                          .addPath("edit")
                          .addPath(buyer.id)
                      )
                    }
                    className="w-8 h-8 p-2 bg-cyan-400"
                  />
                  <BsKey className="w-8 h-8 p-2 bg-green-500" />
                  <LockIcon className="w-8 h-8 p-2 bg-yellow-500" />
                  <NotAllowedIcon className="w-8 h-8 p-2 bg-red-500" />
                  <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                </div>
              </Td>
            </Tr>
          ))}
          {!Array.isArray(buyers) || buyers.length === 0 ? (
            <Tr>
              <Td colSpan={11}>
                <p className="text-xl font-semibold">{t("No records found")}</p>
              </Td>
            </Tr>
          ) : null}
        </TBody>
      </Table>
      <Pagination controls={controls} />
      <Modal isOpen={!!qrcode} onClose={() => setQrCode(undefined)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader title={""} className="flex justify-between">
            <span></span>
            <ModalCloseButton>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <div className="w-96 mx-auto">
            <QrcodeDisplay value={qrcode} />
          </div>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
};

export default Buyers;
