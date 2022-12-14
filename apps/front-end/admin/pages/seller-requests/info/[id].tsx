import { getRandomImage } from "placeholder";
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
  Image,
  ProductCard,
  ProductCardProps,
  Avatar,
  ServiceTypeCard,
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  CashPaymentIcon,
  SearchServiceCard,
  SearchServiceCardProps,
  ProductDetailsTable,
  HotelsSearchList,
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

const services: SearchServiceCardProps[] = [...Array(4)].map(() => ({
  serviceType: "hotel",
  sellerInfo: {
    name: "wiaah",
    profession: "seller",
    thumbnail: "/wiaah_logo.png",
    verified: true,
  },
  serviceData: {
    discount: randomNum(15),
    id: randomNum(1523).toString(),
    label: "Hotel Room",
    price: randomNum(500),
    rating: randomNum(5),
    reviews: randomNum(15),
    thumbnail:
      "https://thumbs.dreamstime.com/b/hotel-room-beautiful-orange-sofa-included-43642330.jpg",
    title: "Hotel Room Title",
    location: {
      address: "address",
      city: "city",
      cords: {
        lat: randomNum(150),
        lng: randomNum(150),
      },
      country: "switzerland",
      countryCode: "CHF",
      postalCode: 134565,
      state: "Geneve",
    },
  },
}));

const products: ProductCardProps[] = [...Array(5)].map(() => ({
  cashback: {
    amount: randomNum(10),
    type: "cash",
  },
  colors: ["red", "green"],
  discount: randomNum(15),
  id: randomNum(165).toString(),
  liked: false,
  name: "test product",
  price: randomNum(10),
  rating: 4,
  shopId: randomNum(15546).toString(),
  thumbnail: getRandomImage(),
  buttonText: "view",
}));

const SellerInfo = () => {
  const { t } = useTranslation();
  const { getParam, back } = useRouting();
  const id = getParam("id");

  const seller: PendingSellerAccount = {
    id: "1",
    name: "seller name",
    createdAt: new Date().toISOString(),
    companyRegisterationNumber: randomNum(999999999).toString(),
    email: "test123@example.com",
    products: randomNum(15),
    type: randomNum(100) >= 50 ? "services" : "products",
    thumbnail: "/wiaah_logo.png",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
  };

  const isService = seller.type === "services";

  const productsTitle = isService ? "Services" : "Products";
  const productsComp = isService ? (
    <div className="justify-between grid grid-cols-4 gap-4">
      {services.map((v) => (
        <SearchServiceCard {...v} />
      ))}
    </div>
  ) : (
    <div className="flex justify-between flex-wrap gap-4">
      {products.map((v) => (
        <ProductCard {...v} />
      ))}
    </div>
  );
  const productComp = !isService ? (
    <ProductDetailsTable />
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
                    <Avatar className="w-16" src={seller.thumbnail} />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <div className="flex w-fit">{t("Name")}</div>
                  </Td>
                  <Td align="left">
                    <p>{seller.name}</p>
                  </Td>
                </Tr>
                <Tr>
                  <Td>{t("Email")}</Td>
                  <Td>{seller.email}</Td>
                </Tr>
                <Tr>
                  <Td>{t("Bio")}</Td>
                  <Td>{seller.bio}</Td>
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

//   <ProductGeneralDetails
//     values={{
//       name: "test product",
//       description: "test description",
//       metatagDescription: "test tags",
//       metatagKeyword: "test keywords",
//       productTag: "test product tag",
//       product_type: "goods",
//       price: 45,
//       vat: 15,
//       qty: 50,
//       images: [...Array(4)].map(() => getRandomImage()),
//       hashtags: ["tag1", "tag2"],
//     }}
//   />
