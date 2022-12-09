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
} from "ui";
import { mapArray, NumberShortner, randomNum } from "utils";
import { lngs, lats } from "api";
import { getRandomImage } from "placeholder";
import { BsKey } from "react-icons/bs";

const Edit = () => {
  const { getParam } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const isProducts = false;

  const servicedata = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    provider: "Crowne Plaza",
    rate: 4.8,
    serviceClass: 3.5,
    thumbnail: "/place-1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deserunt odio quisquam qui sit corrupti ab est voluptas sunt quis nesciunt facilis a debitis eius mollitia quasi eum beatae autem.",
    reviews: randomNum(500),
    id: `${1564546}`,
    date: {
      from: Date.now(),
      to: Date.now(),
    },
    pricePerNight: randomNum(3000),
    taxesAndFeesIncluded: true,
    totalPrice: 5000,
    location: {
      address: "address",
      city: "switzerland",
      country: "france",
      countryCode: "CHF",
      state: "Geneve",
      postalCode: 1234,
      cords: {
        lng: lngs[randomNum(lngs.length)],
        lat: lats[randomNum(lats.length)],
      },
    },
  };

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
    "Transactions",
    historyTitle,
    "Social Info",
  ];

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
          <div>fees</div>
          <Stack col divider={<Divider />}>
            <AffiliationListSection />
            <AffiliationHistorySection />
          </Stack>
          {productComp}
          <div>transations</div>
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
            <Pagination />
          </div>
        </SimpleTabItemList>
      </SimpleTabs>
    </>
  );
};

export default Edit;
