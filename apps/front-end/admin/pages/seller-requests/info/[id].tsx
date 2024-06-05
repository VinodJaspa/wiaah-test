import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  SaveIcon,
  SearchIcon,
  Table,
  TBody,
  Td,
  Tr,
  Avatar,
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  CashPaymentIcon,
  ProductDetailsTable,
  HotelsSearchList,
  useAdminGetSellerAccountDetailsQuery,
  useGetUserProducts,
  useGetSellerProductsDetails,
  useGetFilteredHotelRoomsQuery,
} from "ui";
import { randomNum } from "utils";

interface PendingSellerAccount {
  name: string;
  thumbnail: string;
  email: string;
  createdAt: string;
  products: number;
  companyRegisterationNumber: string;
  type: string;
  id: string;
  bio: string;
}

const SellerInfo = () => {
  const { t } = useTranslation();
  const { getParam, back } = useRouting();
  const id = getParam("id");

  const { data: seller } = useAdminGetSellerAccountDetailsQuery(id);
  // const { data: products } = useGetUserProducts({ sellerId: id, take: 2 });
  const { data: products } = useGetSellerProductsDetails({ sellerId: id });

  const isService = true;

  const productsTitle = isService ? "Services" : "Products";

  const productComp = !isService ? (
    <ProductDetailsTable
      products={products}
      onDelete={(id: string) => {}}
      filters={"title"}
    />
  ) : (
    <HotelsSearchList />
  );
  const tabsTitles = ["General", "Fees", productsTitle];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex text-white fill-white justify-end py-4 text-xl gap-2">
        <SaveIcon className="w-8 h-8 p-2 bg-cyan-600 border border-blue-800" />
        <ArrowRoundBack
          onClick={() => back()}
          className="text-black fill-black w-8 h-8 p-2 border border-gray-300"
        />
      </div>
      <SimpleTabs>
        <div className="flex gap-2 items-center">
          <SimpleTabHead>
            {tabsTitles.map((v, i) => ({ onClick, selected }) => (
              <div
                key={i}
                onClick={onClick}
                className={`border-darkerGray border-b border-b-transparent hover:border-b-darkerGray px-6 py-2 ${
                  selected ? "border-t border-l border-r font-bold" : ""
                }`}
              >
                {t(v)}
              </div>
            ))}
          </SimpleTabHead>
        </div>
        <SimpleTabItemList>
          <div className="flex flex-col border border-gray-300">
            <div className="flex items-center gap-2 p-2 bg-gray-100 border-b border-b-gray-300">
              <SearchIcon />
              <p>{t("Informations")}</p>
            </div>
            <Table
              TdProps={{ align: "left" }}
              TrProps={{ className: "border-b border-b-gray-200" }}
            >
              <TBody>
                <Tr>
                  <Td>
                    <div className="flex w-fit items-start">
                      {t("Thumbnail")}
                    </div>
                  </Td>
                  <Td className="w-8/12" align="left">
                    <Avatar className="w-16" src={seller.photo} />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <div className="flex w-fit">{t("Name")}</div>
                  </Td>
                  <Td align="left">
                    <p>
                      {seller.firstName} {seller.lastName}
                    </p>
                  </Td>
                </Tr>
                <Tr>
                  <Td>{t("Email")}</Td>
                  <Td>{seller.email}</Td>
                </Tr>
                <Tr>
                  <Td>{t("Bio")}</Td>
                  <Td>{seller.profile?.bio}</Td>
                </Tr>
                <Tr>
                  <Td>{t("Company Registeration Number")}</Td>
                  <Td>{seller.companyRegisterationNumber}</Td>
                </Tr>
                <Tr>
                  <Td>{t("Date Added")}</Td>
                  <Td align="left">
                    {new Date(seller.createdAt).toDateString()}
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>
          <div>
            <div className="flex flex-col border border-gray-300">
              <div className="flex items-center gap-2 p-2 bg-gray-100 border-b border-b-gray-300">
                <CashPaymentIcon />
                <p>{t("Fees")}</p>
              </div>
              <Table
                TdProps={{ align: "left" }}
                TrProps={{ className: "border-b border-b-gray-200" }}
              >
                <TBody>
                  <Tr>
                    <Td>
                      <div className="flex w-fit items-start">{t("Vat")}</div>
                    </Td>
                    <Td className="w-8/12" align="left">
                      <p className="font-bold">{randomNum(20)}%</p>
                    </Td>
                  </Tr>
                </TBody>
              </Table>
            </div>
          </div>
          {productComp}
        </SimpleTabItemList>
      </SimpleTabs>
    </section>
  );
};

export default SellerInfo;
