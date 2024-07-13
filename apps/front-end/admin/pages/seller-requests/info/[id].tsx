import { ProductStatus, ServiceType } from "@features/API";
import { TabHighlighter } from "components/views/sellers/TabHighlighter";
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
  AdminGetSellerQuery,
  GetSellerProductsDetailsQuery,
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

  const { data: _seller } = useAdminGetSellerAccountDetailsQuery(id);
  const seller = FAKE_SELLER;
  // const { data: products } = useGetUserProducts({ sellerId: id, take: 2 });
  const { data: _products } = useGetSellerProductsDetails({ sellerId: id });
  const products = FAKE_PROD;

  const isService = true;

  const productsTitle = isService ? "Services" : "Products";

  const productComp = !isService ? (
    <ProductDetailsTable
      products={products}
      onDelete={(id: string) => { }}
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
            <TabHighlighter tabsTitles={tabsTitles} />
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

const FAKE_SELLER: AdminGetSellerQuery["adminGetAccount"] = {
  __typename: "Account",
  photo: "https://example.com/seller_photo.jpg",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  companyRegisterationNumber: "ABC123456789",
  createdAt: "2024-07-13T12:00:00Z",
  profile: {
    __typename: "Profile",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  service: {
    __typename: "Service",
    id: "service1",
    type: ServiceType.Hotel,
  },
};

const FAKE_PROD: GetSellerProductsDetailsQuery["getSellerProductsDetails"] = [
  {
    title: "Product A",
    thumbnail: "https://example.com/productA.jpg",
    price: 49.99,
    stock: 100,
    earnings: 1499.7,
    sales: 30,
    totalOrdered: 35,
    totalDiscounted: 5,
    totalDiscountedAmount: 20,
    unitsRefunded: 2,
    id: "productA123",
    positiveFeedback: 85,
    reviews: 20,
    negitiveFeedback: 5,
    status: ProductStatus.Active,
    external_clicks: 150,
  },
  {
    title: "Product B",
    thumbnail: "https://example.com/productB.jpg",
    price: 29.99,
    stock: 50,
    earnings: 899.7,
    sales: 25,
    totalOrdered: 30,
    totalDiscounted: 2,
    totalDiscountedAmount: 10,
    unitsRefunded: 1,
    id: "productB456",
    positiveFeedback: 70,
    reviews: 15,
    negitiveFeedback: 3,
    status: ProductStatus.Active,
    external_clicks: 100,
  },
];
