import { ServiceAdaptation, ShopStatus } from "@features/API";
import { useAdminDeleteServiceMutation } from "@features/Services/Services/mutation";
import { NextPage } from "next";
import Head from "next/head";
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
  useGetAdminServiceQuery,
  DateFormInput,
} from "ui";
import { mapArray, useForm } from "utils";

const Services: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();
  const { pagination } = usePaginationControls();

  const filters = [{ id: "432", value: ["id"] }];
  const type = ServiceType.Hotel;

  const { form, inputProps, dateInputProps } = useForm<
    Parameters<typeof useGetAdminServiceQuery>[0]
  >({ pagination, type });

  const { data: _services } = useGetAdminServiceQuery(form);
  const services = FAKE_SERVICES;

  const { mutate } = useAdminDeleteServiceMutation();

  function handleDeleteService(id: string) {
    mutate({
      id,
      deletionReason: "",
    });
  }

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Services </title>
      </Head>
      <section>
        <TableContainer>
          <Table ThProps={{ className: "whitespace-nowrap" }}>
            <THead>
              <Tr>
                <Th className="w-fit">
                  <Checkbox />
                </Th>
                <Th className="w-32">{t("Image")}</Th>
                <Th>{t("name")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Id")}</Th>
                <Th>{t("Type of item")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Date modified")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>

              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Input {...inputProps("title")} />
                </Th>
                <Th>
                  <Input {...inputProps("sellerName")} />
                </Th>
                <Th>
                  <Input {...inputProps("id")} />
                </Th>
                <Th>
                  <Select {...inputProps("type")}>
                    <SelectOption value={ServiceType.Hotel}>
                      {t("Hotel")}
                    </SelectOption>
                    <SelectOption value={ServiceType.Restaurant}>
                      {t("Restaurant")}
                    </SelectOption>
                    <SelectOption value={ServiceType.BeautyCenter}>
                      {t("Beauty Center")}
                    </SelectOption>
                    <SelectOption value={ServiceType.HealthCenter}>
                      {t("Health Center")}
                    </SelectOption>
                    <SelectOption value={ServiceType.HolidayRentals}>
                      {t("Holiday Rentals")}
                    </SelectOption>
                    <SelectOption value={ServiceType.Vehicle}>
                      {t("Vehicle")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input type="number" {...inputProps("price")} />
                </Th>
                <Th></Th>
                <Th>
                  <DateFormInput {...dateInputProps("updatedAt")} />
                </Th>
              </Tr>
            </THead>
            <TBody>
              {services.data.map((serv, i) => (
                <Tr data-testid="service-record" key={serv.id}>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td className="min-w-[8rem]">
                    <Image
                      className="w-full"
                      src={serv.thumbnail}
                      alt="thumbnail"
                    />
                  </Td>
                  <Td>{serv.title}</Td>
                  <Td>{serv.shop.sellerProfile.username}</Td>
                  <Td>{serv.id}</Td>
                  <Td>{serv.type}</Td>
                  <Td>
                    <PriceDisplay price={serv.price} />
                  </Td>
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
                              .addPath(serv.id),
                          )
                        }
                        className="w-8 h-8 p-2 bg-cyan-400"
                      />
                      <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
        <Pagination />
      </section>
    </React.Fragment>
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
      id: "154",
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
      thumbnail: "/shop.jpeg",
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
      id: "431",
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
      thumbnail: "/shop.jpeg",
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
