import { AccountStatus } from "@features/API";
import { useGetMembershipsQuery } from "@features/Membership";
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
  QrcodeDisplay,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  CloseIcon,
  ModalCloseButton,
  useGetFilteredSellers,
} from "ui";
import { mapArray, NumberShortner, useForm } from "utils";

const sellers: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath, getUrl } = useRouting();
  const [qrcode, setQrCode] = React.useState<string>();
  const { controls, pagination } = usePaginationControls();

  const { data: memberships } = useGetMembershipsQuery();
  const { form, handleChange } = useForm<
    Parameters<typeof useGetFilteredSellers>[0]
  >({ pagination }, { pagination });

  const { data: sellers } = useGetFilteredSellers(form);
  return (
    <TableContainer>
      <Table
        className="w-max"
        TrProps={{ className: "border-b border-darkerGray w-fit" }}
      >
        <THead>
          <Tr>
            <Th></Th>
            <Th className="text-left">{t("Seller")}</Th>
            <Th>{t("Email")}</Th>
            <Th>{t("Verification Status")}</Th>
            <Th>{t("Products")}</Th>
            <Th>{t("Sales")}</Th>
            <Th>{t("Balance")}</Th>
            <Th>{t("Status")}</Th>
            <Th>{t("Date Created")}</Th>
            <Th>{t("Plan")}</Th>
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
              <Input onChange={(v) => handleChange("name", v.target.value)} />
            </Td>
            <Td>
              <Input onChange={(v) => handleChange("email", v.target.value)} />
            </Td>
            <Td>
              <Select value={form.status} onOptionSelect={(v) => {}}>
                <SelectOption value={true}>{t("Verified")}</SelectOption>
                <SelectOption value={false}>{t("unVerified")}</SelectOption>
              </Select>
            </Td>
            <Td>
              <Input
                type={"number"}
                value={form.products}
                onChange={(v) =>
                  handleChange("products", parseInt(v.target.value))
                }
              />
            </Td>
            <Td>
              <Input
                type="number"
                value={form.sales}
                onChange={(v) =>
                  handleChange("sales", parseInt(v.target.value))
                }
              />
            </Td>
            <Td>
              <Input
                type="number"
                value={form.balance}
                onChange={(v) =>
                  handleChange("balance", parseInt(v.target.value))
                }
              />
            </Td>
            <Td>
              <Select
                onOptionSelect={(v) =>
                  handleChange("status", v as AccountStatus)
                }
              >
                <SelectOption value={AccountStatus.Active}>
                  {t("active")}
                </SelectOption>
                <SelectOption value={AccountStatus.InActive}>
                  {t("inActive")}
                </SelectOption>
                <SelectOption value={AccountStatus.Pending}>
                  {t("Pending")}
                </SelectOption>
                <SelectOption value={AccountStatus.Refused}>
                  {t("Refused")}
                </SelectOption>
                <SelectOption value={AccountStatus.Suspended}>
                  {t("Suspended")}
                </SelectOption>
              </Select>
            </Td>
            <Td>
              <DateFormInput
                dateValue={form.date}
                onDateChange={(v) => handleChange("date", v)}
              />
            </Td>
            <Td>
              <Select
                onOptionSelect={(v) => handleChange("plan", v)}
                value={form.plan}
              >
                {mapArray(memberships, ({ name, id }) => (
                  <SelectOption value={id}>{name}</SelectOption>
                ))}
              </Select>
            </Td>
            <Td>
              <Input
                type="number"
                value={form.visits}
                onChange={(v) =>
                  handleChange("visits", parseInt(v.target.value))
                }
              />
            </Td>
            <Td>
              <Input
                value={form.city}
                onChange={(v) => handleChange("city", v.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={form.country}
                onChange={(v) => handleChange("country", v.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={form.ip}
                onChange={(v) => handleChange("ip", v.target.value)}
              />
            </Td>
          </Tr>

          {mapArray(sellers, (seller, i) => (
            <Tr className="hover:bg-darkerGray cursor-pointer" key={i}>
              <Td>
                <Avatar src={seller.photo} />
              </Td>
              <Td>{seller.firstName}</Td>
              <Td>{seller.email}</Td>
              <Td>{seller.verified ? t("Verified") : t("unVerified")}</Td>
              <Td>{seller.lastName}</Td>
              {/* TODO: include seller total sales from api */}
              <Td>{NumberShortner(seller.sellerSalesStats.sales)}</Td>
              <Td>{NumberShortner(seller.balance?.withdrawableBalance)}</Td>
              <Td>{seller.status}</Td>
              <Td>{new Date(seller.createdAt).toDateString()}</Td>
              <Td>{seller?.Membership?.name}</Td>
              <Td>{NumberShortner(seller.profile?.visits)}</Td>
              <Td>{seller?.shop?.location?.city}</Td>
              <Td>{seller?.shop?.location?.country}</Td>
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

          {!Array.isArray(sellers) || sellers.length === 0 ? (
            <Tr>
              <Td colSpan={16}>
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

export default sellers;
