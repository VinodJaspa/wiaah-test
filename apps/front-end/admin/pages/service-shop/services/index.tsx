import { ServiceAdaptation, ShopStatus } from "@features/API";
import { useAdminDeleteServiceMutation } from "@features/Services/Services/mutation";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Checkbox,
  EditIcon,
  Image,
  Input,
  Pagination,
  PriceDisplay,
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
  useGetFilteredServicesQuery,
  usePaginationControls,
  ServiceType,
  SearchServiceQuery,
} from "ui";
import { mapArray, useForm } from "utils";

const Services: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();
  const { pagination } = usePaginationControls();

  const filters = [{ id: "432", value: ["id"] }];

  const { form, inputProps } = useForm<
    Parameters<typeof useGetFilteredServicesQuery>[0]
  >({ filters, pagination });

  const { data: _services } = useGetFilteredServicesQuery(form);
  const services = FAKE_SERVICES;

  const { mutate } = useAdminDeleteServiceMutation();

  function handleDeleteService(id: string) {
    mutate({
      id,
      deletionReason: "",
    });
  }

  return (
    <>
      <section>
        <TableContainer>
          <Table ThProps={{ className: "whitespace-nowrap" }}>
            <THead>
              <Tr>
                <Th className="w-fit">
                  <Checkbox />
                </Th>
                <Th className="w-32">{t("Image")}</Th>
                <Th>{t("Service")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Id")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Type")}</Th>
                <Th>{t("Day Clicks")}</Th>
                <Th>{t("Earnings")}</Th>
                <Th>{t("Sales")}</Th>
                <Th>{t("Total Ordered Items")}</Th>
                <Th>{t("Total Discounted Orders")}</Th>
                <Th>{t("Total Discounted Amount")}</Th>
                <Th>{t("Items Refunded")}</Th>
                <Th>{t("Refund Rate")}</Th>
                <Th>{t("Positive feedback received")}</Th>
                <Th>{t("Received Positive feedback rate")}</Th>
                <Th>{t("Negative feedback received")}</Th>
                <Th>{t("Received negative feedback rate")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Views")}</Th>
                <Th>{t("Date modified")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input type="number" />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Select>
                    <SelectOption value={"hotel"}>{t("hotel")}</SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Select>
                    <SelectOption value={"active"}>{t("Active")}</SelectOption>
                    <SelectOption value={"inActive"}>
                      {t("inActive")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
              </Tr>
            </THead>

            <TBody>
              <div>
                {mapArray(services.data, (serv, i) => (
                  <Tr key={serv.id}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>
                      <Image
                        className="w-full"
                        src={serv.thumbnail}
                        alt="thumbnail"
                      />
                    </Td>
                    <Td>{serv.title}</Td>
                    <Td>{serv.shop.sellerProfile.username}</Td>
                    <Td>{serv.id.slice(0, 8)}...</Td>
                    <Td>
                      <PriceDisplay price={serv.price[0]} />
                    </Td>
                    <Td className="whitespace-nowrap">{serv.type}</Td>
                    <Td>{serv.shop.status}</Td>
                    <Td>{new Date(serv.updatedAt).toDateString()}</Td>
                    <Td>
                      <div className="grid grid-cols-2d justify-center gap-2 fill-white text-white text-sm ">
                        <SearchIcon className="w-8 h-8 p-2 bg-cyan-600" />
                        <EditIcon
                          onClick={() =>
                            visit((r) =>
                              r
                                .addPath(getCurrentPath())
                                .addPath("edit")
                                .addPath(serv.id)
                            )
                          }
                          className="w-8 h-8 p-2 bg-cyan-400"
                        />
                        <TrashIcon
                          onClick={() => handleDeleteService(serv.id)}
                          className="w-8 h-8 p-2 bg-red-500"
                        />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </div>
            </TBody>
          </Table>
        </TableContainer>
        <Pagination />
      </section>
    </>
  );
};

export default Services;

const FAKE_SERVICES: SearchServiceQuery["searchServices"] = {
  __typename: "ServiceSearchResponse",
  hasMore: true,
  total: 2,
  data: [
    {
      __typename: "Service",
      id: "1",
      name: "Sample Service 1",
      price: 100,
      beds: 2,
      bathrooms: 1,
      adaptedFor: [ServiceAdaptation.NewBorn],
      airCondition: true,
      gpsAvailable: true,
      seats: 5,
      windows: 4,
      lugaggeCapacity: 3,
      treatmentCategory: "Category A",
      maxSpeedInKm: 200,
      brand: "Brand X",
      description: "Description of Sample Service 1",
      ingredients: ["Ingredient A", "Ingredient B"],
      cleaningFee: 10,
      reviews: 4,
      thumbnail: "https://example.com/thumbnail1.jpg",
      rating: 4.5,
      type: ServiceType.Hotel,
      title: "Sample Service Title 1",
      speciality: "Specialty A",
      availableAppointments: [
        {
          date: "2024-07-15",
          workingHoursRanges: [
            { from: "09:00", to: "17:00" },
            { from: "18:00", to: "22:00" },
          ],
        },
        {
          date: "2024-07-16",
          workingHoursRanges: [
            { from: "10:00", to: "18:00" },
            { from: "19:00", to: "23:00" },
          ],
        },
      ],
      healthCenterBookedAppointments: [
        {
          date: "2024-07-15",
          workingHoursRanges: [
            { from: "09:00", to: "17:00" },
            { from: "18:00", to: "22:00" },
          ],
        },
        {
          date: "2024-07-16",
          workingHoursRanges: [
            { from: "10:00", to: "18:00" },
            { from: "19:00", to: "23:00" },
          ],
        },
      ],
      saved: true,
      sellerId: "seller1",
      updatedAt: "2024-07-13",
      shop: {
        __typename: "Shop",
        id: "shop1",
        status: ShopStatus.Active,
        location: {
          __typename: "Location",
          address: "123 Sample St",
          city: "Sample City",
          country: "Sample Country",
          lat: 0,
          long: 0,
          state: "Sample State",
        },
        sellerProfile: {
          __typename: "Profile",
          username: "seller1username",
          verified: true,
          photo: "https://example.com/seller1.jpg",
        },
      },
    },
    {
      __typename: "Service",
      id: "1",
      name: "Sample Service 1",
      price: 100,
      beds: 2,
      bathrooms: 1,
      adaptedFor: [ServiceAdaptation.NewBorn],
      airCondition: true,
      gpsAvailable: true,
      seats: 5,
      windows: 4,
      lugaggeCapacity: 3,
      treatmentCategory: "Category A",
      maxSpeedInKm: 200,
      brand: "Brand X",
      description: "Description of Sample Service 1",
      ingredients: ["Ingredient A", "Ingredient B"],
      cleaningFee: 10,
      reviews: 4,
      thumbnail: "https://example.com/thumbnail1.jpg",
      rating: 4.5,
      type: ServiceType.Hotel,
      title: "Sample Service Title 1",
      speciality: "Specialty A",
      availableAppointments: [
        {
          date: "2024-07-15",
          workingHoursRanges: [
            { from: "09:00", to: "17:00" },
            { from: "18:00", to: "22:00" },
          ],
        },
        {
          date: "2024-07-16",
          workingHoursRanges: [
            { from: "10:00", to: "18:00" },
            { from: "19:00", to: "23:00" },
          ],
        },
      ],
      healthCenterBookedAppointments: [
        {
          date: "2024-07-15",
          workingHoursRanges: [
            { from: "09:00", to: "17:00" },
            { from: "18:00", to: "22:00" },
          ],
        },
        {
          date: "2024-07-16",
          workingHoursRanges: [
            { from: "10:00", to: "18:00" },
            { from: "19:00", to: "23:00" },
          ],
        },
      ],
      saved: true,
      sellerId: "seller1",
      updatedAt: "2024-07-13",
      shop: {
        __typename: "Shop",
        id: "shop1",
        status: ShopStatus.Active,
        location: {
          __typename: "Location",
          address: "123 Sample St",
          city: "Sample City",
          country: "Sample Country",
          lat: 0,
          long: 0,
          state: "Sample State",
        },
        sellerProfile: {
          __typename: "Profile",
          username: "seller1username",
          verified: true,
          photo: "https://example.com/seller1.jpg",
        },
      },
    },
  ],
};
