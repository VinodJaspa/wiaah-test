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
} from "ui";
import { NumberShortner, randomNum } from "utils";

type Buyer = {
  id: string;
  thumbanil: string;
  name: string;
  email: string;
  products: number;
  sales: number;
  balance: number;
  status: string;
  createdAt: Date;
  visits: number;
  country: string;
  city: string;
  ips: string[];
};

let plans = ["Pay", "Free", "Per Click"];

let mockSellers: Buyer[] = [...Array(15)].map((_, i) => ({
  id: i.toString(),
  name: "seller company name" + i,
  balance: randomNum(2000),
  email: "testemail" + i + "@email.com",
  createdAt: new Date(),
  products: randomNum(50),
  sales: randomNum(150),
  status: randomNum(100) % 2 === 0 ? "active" : "inActive",
  thumbanil: "/wiaah_logo.png",
  city: "Geneve",
  country: "Switzerland",
  ips: ["192.459.235.1", "158.135.154.3", "159.124.156.1"],
  visits: 150,
}));

const buyers: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath, getUrl } = useRouting();
  const [qrcode, setQrCode] = React.useState<string>();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
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
            <Th>{t("city")}</Th>
            <Th>{t("Country")}</Th>
            <Th>{t("IPs")}</Th>
            <Th>{t("QR Code")}</Th>
            <Th>{t("Action")}</Th>
          </Tr>
        </THead>

        <TBody>
          <Tr>
            <Td></Td>

            <Td>
              <Input />
            </Td>
            <Td>
              <Select>
                <SelectOption value={true}>{t("Verified")}</SelectOption>
                <SelectOption value={false}>{t("unVerified")}</SelectOption>
              </Select>
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Select>
                <SelectOption value={"active"}>{t("active")}</SelectOption>
                <SelectOption value={"inActive"}>{t("inActive")}</SelectOption>
              </Select>
            </Td>

            <Td>
              <DateFormInput />
            </Td>

            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
          </Tr>

          {mockSellers.map((seller, i) => (
            <Tr className="hover:bg-darkerGray cursor-pointer" key={i}>
              <Td>
                <Avatar src={seller.thumbanil} />
              </Td>
              <Td>{seller.name}</Td>
              <Td>{seller.email}</Td>
              <Td>{seller.verified ? t("Verified") : t("unVerified")}</Td>
              <Td>{seller.balance}</Td>
              <Td>{seller.status}</Td>
              <Td>{new Date(seller.createdAt).toDateString()}</Td>
              <Td>{NumberShortner(seller.visits)}</Td>
              <Td>{seller.city}</Td>
              <Td>{seller.country}</Td>
              <Td>
                <div className="flex flex-col w-full gap-1">
                  {seller.ips.map((v, i) => (
                    <p key={v + i}>{v}</p>
                  ))}
                </div>
              </Td>
              <Td>
                <Button
                  onClick={() => {
                    setQrCode(
                      getUrl((r) =>
                        r.visitSellerSocialProfile({ sellerId: seller.id })
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
                          .addPath(seller.id)
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
        </TBody>
      </Table>
      <Pagination />
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

export default buyers;
