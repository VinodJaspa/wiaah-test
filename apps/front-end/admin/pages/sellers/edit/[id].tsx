import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AccountSettingsSection,
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  ProductDetailsTable,
  AffiliationHistorySection,
  AffiliationListSection,
  Stack,
  Divider,
  BookingsHistorySection,
  HotelsSearchList,
  OrdersSection,
  Pagination,
  SocialProfile,
  Table,
  TBody,
  THead,
  Tr,
  Td,
  Th,
  Image,
  TrashIcon,
  Badge,
  Input,
  DateFormInput,
  TableContainer,
  PriceDisplay,
  usePaginationControls,
  Select,
  SelectOption,
  CashbackBadge,
  InputGroup,
  InputLeftElement,
} from "ui";
import { mapArray, NumberShortner, randomNum } from "utils";
import { getRandomImage } from "placeholder";
import { BsKey } from "react-icons/bs";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { random } from "lodash";

const Edit = () => {
  const { getParam } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");
  const { controls } = usePaginationControls();

  const isProducts = false;
  const productComp = isProducts ? (
    <ProductDetailsTable />
  ) : (
    <HotelsSearchList />
  );
  const invoiceComp = isProducts ? (
    <OrdersSection shopping={false} />
  ) : (
    <BookingsHistorySection />
  );

  const sales = [...Array(10)].map((_, i) => ({
    address: `testaddress`,
    total: random(120, 200) + 1,
    subtotal: random(100, 120) + 1,
    affiliator: randomNum(100) > 50 ? `affiliator-${i}` : null,
    discount: {
      amount: random(5, 15),
      name: `${random(5, 15)}% OFF`,
    },
    cashback: random(10, 30),
    buyer: `buyer-${i}`,
    date: new Date().toUTCString(),
    id: i.toString(),
    payment_method: `Stripe`,
    product_name: `product name-${i}`,
    qty: randomNum(5) + 1,
    status: `Paid`,
    thumbnail: getRandomImage(),
  }));

  const posts = [...Array(10)].map(() => ({
    id: randomNum(500000).toString(),
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It h",
    hashtags: ["new", "sports", "fun", "world cup"],
    comments: randomNum(500000),
    likes: randomNum(50000),
    views: randomNum(50000),
    shares: randomNum(5000),
    thumbnail: getRandomImage(),
    type: "image",
    createdAt: new Date(),
  }));

  const productsTitle = isProducts ? "Products" : "services";
  const historyTitle = isProducts ? "Orders" : "Bookings";

  const tabsTitles = [
    "General",
    "Fees",
    "Affiliation",
    productsTitle,
    historyTitle,
    "Social Info",
    "Sales",
  ];

  const name = "wiaah";

  return (
    <>
      <SimpleTabs>
        <div className="flex flex-wrap gap-2 ">
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
          <AccountSettingsSection />
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-3xl">{t("Selling fees")}</p>
            <div className="gap-4 flex items-center">
              <InputGroup flushed>
                <InputLeftElement>
                  <p className="font-bold text-2xl">{"$"}</p>
                </InputLeftElement>
                <Input type="number" placeholder="cash" />
              </InputGroup>
              <p className="font-bold text-4xl">+</p>
              <InputGroup flushed>
                <InputLeftElement>
                  <p className="font-bold text-2xl">{"%"}</p>
                </InputLeftElement>
                <Input type="number" placeholder="percent" />
              </InputGroup>
            </div>
            <Divider></Divider>
            <p className="font-semibold text-3xl">{t("Listing fees")}</p>
            <div className="gap-4 flex items-center">
              <InputGroup flushed>
                <InputLeftElement>
                  <p className="font-bold text-2xl">{"$"}</p>
                </InputLeftElement>
                <Input type="number" placeholder="cash" />
              </InputGroup>
              <p className="font-bold text-4xl">+</p>
              <InputGroup flushed>
                <InputLeftElement>
                  <p className="font-bold text-2xl">{"%"}</p>
                </InputLeftElement>
                <Input type="number" placeholder="percent" />
              </InputGroup>
            </div>
          </div>
          <Stack col divider={<Divider />}>
            <AffiliationListSection />
            <AffiliationHistorySection />
          </Stack>
          {productComp}
          <div>
            <div>{invoiceComp}</div>
            <Pagination />
          </div>
          <div>
            <SocialProfile
              profileInfo={{
                accountType: "seller",
                userId: "1325",
                id: "1230",
                name: "Jane Daniel",
                public: true,
                thumbnail: "/shop-2.jpeg",
                verified: true,
                bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend diam cras eu felis egestas aliquam. Amet ornare",
                isFollowed: false,
                links: ["this is a test link"],
                location: {
                  address: "address",
                  city: "city",
                  cords: {
                    lat: 32,
                    lng: 23,
                  },
                  country: "country",
                  countryCode: "CH",
                  postalCode: 1234,
                  state: "Geneve",
                },
                profileCoverPhoto: "/shop-2.jpeg",
                publications: 156,
                subscribers: 135,
                subscriptions: 14,
                profession: "Agent",
              }}
            />
            <TableContainer>
              <Table className="w-full">
                <THead>
                  <Tr>
                    <Th>{t("Thumbnail")}</Th>
                    <Th>{t("ID")}</Th>
                    <Th>{t("Legend")}</Th>
                    <Th>{t("Views")}</Th>
                    <Th>{t("Likes")}</Th>
                    <Th>{t("Comments")}</Th>
                    <Th>{t("Shares")}</Th>
                    <Th>{t("Publish Date")}</Th>
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
                      <Input />
                    </Td>
                    <Td>
                      <Input type="number" />
                    </Td>
                    <Td>
                      <Input type="number" />
                    </Td>
                    <Td>
                      <Input type="number" />
                    </Td>
                    <Td>
                      <Input type="number" />
                    </Td>
                    <Td>
                      <DateFormInput />
                    </Td>
                  </Tr>

                  {mapArray(posts, (data, i) => (
                    <Tr key={i}>
                      <Td className="w-fit">
                        {data.type === "video" ? (
                          <></>
                        ) : (
                          <Image className="w-32" src={data.thumbnail} />
                        )}
                      </Td>
                      <Td>{data.id.slice(0, 4)}...</Td>
                      <Td className="w-[30%]">
                        <div className="flex flex-col gap-4">
                          <p>{data.description.slice(0, 80)}...</p>
                          <div className="flex flex-wrap gap-2">
                            {data.hashtags.map((tag, i) => (
                              <Badge variant="off" key={i}>
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Td>
                      <Td>{NumberShortner(data.views)}</Td>
                      <Td>{NumberShortner(data.likes)}</Td>
                      <Td>{NumberShortner(data.comments)}</Td>
                      <Td>{NumberShortner(data.shares)}</Td>
                      <Td>{new Date(data.createdAt).toDateString()}</Td>
                      <Td className="text-white">
                        <div className="flex flex-wrap gap-2">
                          <BsKey className="w-8 h-8 p-2 bg-green-500" />
                          <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </TableContainer>
            <Pagination />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Select className="w-fit">
              <SelectOption value={"daily"}>{t("Daily")}</SelectOption>
              <SelectOption value={"weekly"}>{t("Weekly")}</SelectOption>
              <SelectOption value={"monthly"}>{t("Monthly")}</SelectOption>
              <SelectOption value={"yearly"}>{t("Yearly")}</SelectOption>
            </Select>
            <AdminListTable
              contain
              pagination={controls}
              data={sales.map(
                ({
                  address,
                  total,
                  buyer,
                  date,
                  id,
                  payment_method,
                  product_name,
                  qty,
                  status,
                  thumbnail,
                  subtotal,
                  affiliator,
                  discount,
                  cashback,
                }) => ({
                  id,
                  cols: [
                    {
                      type: AdminTableCellTypeEnum.image,
                      value: thumbnail,
                    },
                    { value: product_name },
                    { value: qty.toString() },
                    { value: buyer },
                    { value: address },
                    { value: payment_method },
                    {
                      type: AdminTableCellTypeEnum.custom,
                      custom: (
                        <Badge cases={{ off: "pending", fail: "canceled" }}>
                          {status}
                        </Badge>
                      ),
                    },
                    {
                      value: affiliator ?? "N/A",
                      type: AdminTableCellTypeEnum.text,
                    },
                    {
                      type: AdminTableCellTypeEnum.text,
                      value: `${discount.name} (${discount.amount}%)`,
                    },
                    {
                      type: AdminTableCellTypeEnum.custom,
                      custom: <PriceDisplay price={subtotal} />,
                    },
                    {
                      type: AdminTableCellTypeEnum.custom,
                      custom: <PriceDisplay price={total} />,
                    },
                    {
                      type: AdminTableCellTypeEnum.custom,
                      custom: (
                        <CashbackBadge
                          props={{ className: "w-fit" }}
                          amount={cashback}
                        />
                      ),
                    },
                    { value: new Date(date).toDateString() },
                  ],
                })
              )}
              headers={[
                {
                  value: t("Photo"),
                  props: { className: "w-32" },
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: t("Product Name"),
                },
                {
                  type: AdminTableCellTypeEnum.number,
                  value: t("Quantity"),
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: t("Buyer"),
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: t("Address"),
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: t("Payment Method"),
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: t("Status"),
                },
                { value: t("Affiliator"), type: AdminTableCellTypeEnum.text },
                { value: t("Discount"), type: AdminTableCellTypeEnum.text },
                {
                  type: AdminTableCellTypeEnum.number,
                  value: t("SubTotal"),
                },
                {
                  type: AdminTableCellTypeEnum.number,
                  value: t("Total"),
                },
                {
                  type: AdminTableCellTypeEnum.number,
                  value: t("Cashback"),
                },
                {
                  type: AdminTableCellTypeEnum.date,
                  value: t("Date"),
                },
              ]}
              title={`${name} ${t("Sales")}`}
            />
          </div>
        </SimpleTabItemList>
      </SimpleTabs>
    </>
  );
};

export default Edit;
