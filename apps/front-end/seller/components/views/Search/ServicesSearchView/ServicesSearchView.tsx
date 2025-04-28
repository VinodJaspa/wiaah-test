import {
  SearchServiceCard,
  SearchServiceCardProps,
} from "@UI/components/features/Search/Services/components/Cards/SearchServiceCard/SearchServiceCard";
import { ServicesSearchBadgeList } from "@UI/components/features/Services/components/DataDisplay/ServicesSearchBadgeList/index";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServicesType } from "types";

export const ServicesSearchView: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  return (
    <div className="flex flex-col gap-10">
      <Formik
        initialValues={{ serviceType: "hotel" } as any}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="flex flex-col gap-7">
              <ServicesSearchBadgeList
                activeKey={values["serviceType"]}
                onClick={(serviceType) => {
                  setFieldValue("serviceType", serviceType);
                }}
              />
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {servicesPH
                  .filter((v) => {
                    const currentService = values[
                      "serviceType"
                    ] as ServicesType;
                    return v.serviceType === currentService;
                  })
                  .map((service, i) => (
                    <SearchServiceCard key={i} {...service} />
                  ))}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const servicesPH: SearchServiceCardProps[] = [...Array(12)].reduce(
  (acc, curr) => {
    return [
      ...acc,
      {
        serviceData: {
          reviews: 500,
          discount: 30,
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
          id: "1",
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (1).jfif",
          verified: true,
        },
      },
      {
        serviceData: {
          reviews: 500,
          discount: 30,
          id: "123",
          label: "Holiday Rentals",
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
        serviceType: "holiday_rentals",
        sellerInfo: {
          id: "2",
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (1).jfif",
          verified: true,
        },
      },
      {
        serviceData: {
          reviews: 500,
          discount: 30,
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
          id: "3",
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (2).jfif",
          verified: true,
        },
      },
      {
        serviceData: {
          reviews: 500,
          discount: 30,
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
          id: "4",
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
            "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
          title: "Beauty Haven",
        },
        serviceType: "beauty_center",
        sellerInfo: {
          id: "5",
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (4).jfif",
          verified: true,
        },
      },
      {
        serviceData: {
          reviews: 150,
          discount: 26,
          id: "123",
          label: "Vehicle",
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
            "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
          title: "Beauty Haven",
        },
        serviceType: "vehicle",
        sellerInfo: {
          id: "6",
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (4).jfif",
          verified: true,
        },
      },
    ] as SearchServiceCardProps[];
  },
  [],
);
