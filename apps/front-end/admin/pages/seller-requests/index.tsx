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
  MultiChooseInput,
  Textarea,
  Button,
} from "ui";

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

const pendingProducts = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();
  const { handleClose, handleOpen, isOpen } = useDisclouser();
  return (
    <section>
      <TableContainer>
        <Table className="min-w-max">
          <THead>
            <Tr>
              <Th className="w-32"></Th>
              <Th>{t("Seller")}</Th>
              <Th>{t("Email")}</Th>
              <Th>{t("Type")}</Th>
              <Th>{t("Company Registeration Number")}</Th>
              <Th>{t("Date Created")}</Th>
              <Th>{t("Action")}</Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th>
                <Input />
              </Th>
              <Th>
                <Input />
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
                <Input />
              </Th>
              <Th>
                <DateFormInput />
              </Th>
              <Th></Th>
            </Tr>
          </THead>
          <TBody>
            {sellers.map((v) => (
              <Tr>
                <Td>
                  <Image src={v.thumbnail} />
                </Td>
                <Td>{v.name}</Td>
                <Td>{v.email}</Td>
                <Td>{v.type}</Td>
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
                            .addPath(v.id)
                        )
                      }
                      className="w-8 h-8 p-2 bg-cyan-400"
                    />
                    <ImCheckmark className="w-8 h-8 p-2 bg-green-500" />
                    <NotAllowedIcon
                      onClick={() => handleOpen()}
                      className="w-8 h-8 p-2 bg-red-500"
                    />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
      <Modal isLazy isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
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
                  <p className="font-bold text-2xl">
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
                    {t(
                      "seller_refuse_inappropriate_images",
                      "Product/Service images inappropriate"
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
                      onChange={(e) =>
                        setFieldValue("otherReason", e.target.value)
                      }
                    />
                  ) : null}
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

export default pendingProducts;
