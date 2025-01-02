import { Form, Formik } from "formik";
import { useDisclouser } from "hooks";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import { useRouting } from "routing";
import {
  DateFormInput,
  Image,
  Input,
  NotAllowedIcon,
  Pagination,
  randomNum,
  SearchIcon,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  Radio,
  Textarea,
  Button,
  useAdminGetSellerRequestsQuery,
  usePaginationControls,
  useAdminAcceptSellerRequestMutation,
  useAdminRejectSellerRequestMutation,
  AdminGetSellerRequestsQuery,
} from "ui";
import { mapArray, useForm } from "utils";

interface PendingSellerAccount {
  name: string;
  thumbnail: string;
  email: string;
  createdAt: string;
  products: number;
  companyRegisterationNumber: string;
  type: string;
  id: string;
}

const sellers: PendingSellerAccount[] = [...Array(15)].map((_, i) => ({
  id: i.toString(),
  name: "seller name",
  createdAt: new Date().toISOString(),
  companyRegisterationNumber: randomNum(999999999).toString(),
  email: "test123@example.com",
  products: randomNum(15),
  type: randomNum(100) >= 50 ? "services" : "products",
  thumbnail: getRandomImage(),
}));

const PendingProducts = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();
  const [rejectId, setRejectId] = React.useState<string>();

  const { pagination, controls } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetSellerRequestsQuery>[0]
  >({ pagination }, { pagination });

  const { data: _requests } = useAdminGetSellerRequestsQuery(form);
  const requests = FAKE_PENDING_PRODS;
  const { mutate: acceptRequest } = useAdminAcceptSellerRequestMutation();
  const { mutate: rejectRequest } = useAdminRejectSellerRequestMutation();

  return (
    <section>
      <TableContainer>
        <Table className="min-w-max">
          <THead>
            <Tr>
              <Th className="w-32"></Th>
              <Th>{t("Seller")}</Th>
              <Th>{t("Email")}</Th>
              <Th>{t("Selling Type")}</Th>
              <Th>{t("Company Registeration Number")}</Th>
              <Th>{t("Date Created")}</Th>
              <Th>{t("Action")}</Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th>
                <Input {...inputProps("name")} />
              </Th>
              <Th>
                <Input {...inputProps("email")} />
              </Th>
              <Th>
                <Select>
                  <SelectOption value={"products"}>
                    {t("Products")}
                  </SelectOption>
                  <SelectOption value={"service"}>{t("Service")}</SelectOption>
                </Select>
              </Th>
              <Th>
                <Input {...inputProps("CRN")} />
              </Th>
              <Th>
                <DateFormInput
                  {...inputProps(
                    "dateCreated",
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
            {mapArray(requests, (v) => (
              <Tr>
                <Td>
                  <Image src={v.photo} />
                </Td>
                <Td>
                  {v.firstName} {v.lastName}
                </Td>
                <Td>{v.email}</Td>
                <Td>
                  {typeof v.shop === "object" ? t("Product") : t("Service")}
                </Td>
                <Td>{v.companyRegisterationNumber}</Td>
                <Td>{new Date(v.createdAt).toDateString()}</Td>
                <Td>
                  <div className="grid grid-cols-3 justify-center gap-2 fill-white text-white text-sm">
                    <SearchIcon
                      onClick={() =>
                        visit((r) =>
                          r
                            .addPath(getCurrentPath())
                            .addPath("info")
                            .addPath(v.id),
                        )
                      }
                      className="w-8 h-8 p-2 bg-cyan-400"
                    />
                    <ImCheckmark
                      onClick={() => acceptRequest(v.id)}
                      className="w-8 h-8 p-2 cursor-pointer bg-green-500"
                    />
                    <NotAllowedIcon
                      onClick={() => setRejectId(v.id)}
                      className="w-8 h-8 p-2 bg-red-500"
                    />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination controls={controls} />
      <Modal isLazy isOpen={!!rejectId} onClose={() => setRejectId(undefined)}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              reason: "",
              otherReason: "",
            }}
            onSubmit={(data) => {
              rejectRequest({
                reason:
                  data.otherReason.length > 0 ? data.otherReason : data.reason,
                id: rejectId,
              });
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="flex flex-col gap-4">
                  <p className="font-bold text-2xl">
                    {t("why do you think this account should be refused ?")}
                  </p>
                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.value)
                        : null
                    }
                    value={"inappropriate images"}
                    name={"seller_refuse_reason"}
                  >
                    {t(
                      "seller_refuse_inappropriate_images",
                      "Product/Service images inappropriate",
                    )}
                  </Radio>
                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.value)
                        : null
                    }
                    value={"fausses info"}
                    name={"seller_refuse_reason"}
                  >
                    {t("seller_refuse_fausses_info", "Fuasses Informations")}
                  </Radio>
                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.value)
                        : null
                    }
                    value={"verify identity"}
                    name={"seller_refuse_reason"}
                  >
                    {t(
                      "seller_refuse_verify_identity",
                      "Impossible to verify the identity of the seller",
                    )}
                  </Radio>
                  <Radio
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue("reason", e.target.value)
                        : null
                    }
                    value={"scams"}
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
                      onChange={(e) =>
                        setFieldValue("otherReason", e.target.value)
                      }
                    />
                  ) : (
                    (() => {
                      setFieldValue("otherReason", "");
                      return null;
                    })()
                  )}
                  <Button type="submit" className="self-end">
                    {t("Submit")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default PendingProducts;

const FAKE_PENDING_PRODS: AdminGetSellerRequestsQuery["getPendingSellers"] = [
  {
    companyRegisterationNumber: "ABC123456789",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    createdAt: "2024-07-13T12:00:00Z",
    photo: "/shop.jpeg",
    id: "seller1",
    shop: {
      id: "shop1",
    },
  },
  {
    companyRegisterationNumber: "XYZ987654321",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    createdAt: "2024-07-12T15:30:00Z",
    photo: "/shop.jpeg",
    id: "seller2",
    shop: {
      id: "shop2",
    },
  },
];
