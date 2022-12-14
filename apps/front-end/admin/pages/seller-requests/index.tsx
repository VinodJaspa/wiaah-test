import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import { useRouting } from "routing";
import {
  DateFormInput,
  EditIcon,
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
  TrashIcon,
  ProductGeneralDetails,
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
  return (
    <section>
      <TableContainer>
        <Table>
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
                    <NotAllowedIcon className="w-8 h-8 p-2 bg-red-500" />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </section>
  );
};

export default pendingProducts;
