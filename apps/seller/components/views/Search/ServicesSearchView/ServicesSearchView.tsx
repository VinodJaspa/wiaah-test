import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServicesType } from "types";
import {
  BrandSelectInput,
  BrandSelectInputProps,
  Button,
  CategoriesSelectInput,
  CategoriesSelectInputProps,
  Divider,
  FilterSelectInput,
  FilterSelectInputProps,
  FormikInput,
  NumberInput,
  ProductSearchLocationInput,
  ProductSearchLocationInputProps,
  SearchIcon,
  SearchServiceCard,
  ServicesSearchCard,
  Stack,
  StatusSelectInput,
  StatusSelectInputProps,
} from "ui";
import { randomNum } from "utils";

type ServiceInputData = {
  label: string;
  valueKey: string;
  placeholder: string;
  options: string[];
};

export const ServicesSearchView: React.FC = () => {
  const { t } = useTranslation();

  const getFilters: (service: ServicesType) => ServiceInputData[] = (
    service
  ) => {
    switch (service) {
      case "hotel":
        return [
          {
            label: t("Guests"),
            valueKey: "guests",
            placeholder: t("Select Guests"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Bathrooms"),
            valueKey: "bathrooms",
            placeholder: t("Select Bathrooms Number"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Beds"),
            valueKey: "beds",
            placeholder: t("Select Beds Number"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
        ];

      case "resturant":
        return [
          {
            label: t("Table for"),
            valueKey: "table_for",
            placeholder: t("Select Table for"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Main course"),
            valueKey: "main_course",
            placeholder: t("Select Main Course"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Has Drinks"),
            valueKey: "beds",
            placeholder: t("Select Beds Number"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col gap-14 w-full">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          console.log(values);
          return (
            <Form className="flex flex-col gap-7">
              <div className="flex gap-8">
                <Stack divider={<Divider variant="vert" />}>
                  <FormikInput<ProductSearchLocationInputProps>
                    as={ProductSearchLocationInput}
                    name={"ProductSearchLocationInput"}
                  />

                  <FormikInput
                    as={() => (
                      <CategoriesSelectInput
                        categories={[
                          "Hotels",
                          "Restaurants",
                          "Health Centers",
                          "Beauty Centers",
                          "Holiday Rentals",
                          "Vehicles",
                        ]}
                        // value={values["serviceType"]}
                        // onChange={(v) => setFieldValue("serviceType", v)}
                        placeholder={t("Select Service Type")}
                      />
                    )}
                    name={"ServiceType"}
                  />
                </Stack>
                <Button className="flex gap-2 text-white items-center">
                  <SearchIcon />
                  <p>{t("Submit")}</p>
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-5">
                {getFilters(
                  typeof values["serviceType"] === "string"
                    ? (values["serviceType"]
                        .toLowerCase()
                        .replace(" ", "_")
                        .slice(0, -1) as ServicesType)
                    : "general"
                ).map((filter, i) => (
                  <FormikInput<FilterSelectInputProps>
                    key={i}
                    label={filter.label}
                    options={filter.options}
                    placeholder={filter.placeholder}
                    value={values[filter.valueKey]}
                    onChange={(v) => setFieldValue(filter.valueKey, v)}
                    as={FilterSelectInput}
                    name={filter.valueKey}
                  />
                ))}
                <FormikInput<FilterSelectInputProps>
                  name="rating"
                  label={t("Rating")}
                  options={[...Array(5)].map(
                    (_, i) => `${Math.abs(i - 5)} ${t("Stars")}`
                  )}
                  as={FilterSelectInput}
                />
                <FormikInput
                  name="price"
                  label={t("Price")}
                  as={() => (
                    <div className="flex gap-1">
                      <NumberInput placeholder="Min" />
                      <NumberInput placeholder="Max" />
                    </div>
                  )}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="grid gap-12 grid-cols-4">
        {servicesPH.map((service, i) => (
          <SearchServiceCard key={i} {...service} />
        ))}
      </div>
    </div>
  );
};

const servicesPH = [...Array(3)].reduce((acc, curr) => {
  return [
    ...acc,
    {
      serviceData: {
        reviews: randomNum(500),
        discount: randomNum(30),
        id: "123",
        label: "Hotel",
        location: {
          country: "USA",
          countryCode: "CH",
          state: "LA",
          address: "Smart Street",
          postalCode: 8,
          cords: {
            lat: 56,
            lng: 24,
          },
          city: "LA",
        },
        price: 350,
        rating: 4.8,
        thumbnail:
          "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
        title: "Well Furnished Apartment",
      },
      serviceType: "hotel",
      sellerInfo: {
        name: "Seller name",
        profession: "Profession",
        thumbnail: "/profile (1).jfif",
        verified: true,
      },
    },
    {
      serviceData: {
        reviews: randomNum(500),
        discount: randomNum(30),
        id: "123",
        label: "Restaurant",
        location: {
          country: "USA",
          countryCode: "CH",
          state: "LA",
          address: "Smart Street",
          postalCode: 8,
          cords: {
            lat: 56,
            lng: 24,
          },
          city: "LA",
        },
        price: [50, 2500],
        rating: 4.8,
        thumbnail:
          "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg",
        title: "The Harbor House Restaurant.",
      },
      serviceType: "restaurant",
      sellerInfo: {
        name: "Seller name",
        profession: "Profession",
        thumbnail: "/profile (2).jfif",
        verified: true,
      },
    },
    {
      serviceData: {
        reviews: randomNum(500),
        discount: randomNum(30),
        id: "123",
        label: "Health Center",
        location: {
          country: "USA",
          countryCode: "CH",
          state: "LA",
          address: "Smart Street",
          postalCode: 8,
          cords: {
            lat: 56,
            lng: 24,
          },
          city: "LA",
        },
        price: [50, 5000],
        rating: 4.8,
        thumbnail:
          "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
        title: "The Minute Medical",
      },
      serviceType: "health_center",
      sellerInfo: {
        name: "Seller name",
        profession: "Profession",
        thumbnail: "/profile (3).jfif",
        verified: true,
      },
    },
    {
      serviceData: {
        reviews: 150,
        discount: 26,
        id: "123",
        label: "Beauty Center",
        location: {
          country: "USA",
          countryCode: "CH",
          state: "LA",
          address: "Smart Street",
          postalCode: 8,
          cords: {
            lat: 56,
            lng: 24,
          },
          city: "LA",
        },
        price: [50, 500],
        rating: 4.8,
        thumbnail:
          "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/Tacha+Beauty+Center-desktop.jpg",
        title: "Beauty Haven",
      },
      serviceType: "beauty_center",
      sellerInfo: {
        name: "Seller name",
        profession: "Profession",
        thumbnail: "/profile (4).jfif",
        verified: true,
      },
    },
  ];
}, []);
