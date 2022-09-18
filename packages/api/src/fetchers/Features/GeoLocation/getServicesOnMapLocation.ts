import { FormatedSearchableFilter } from "src/types";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  ServiceOnMapLocationDataValidationSchema,
  ServicesOnMapLocationsApiResponseValidationSchema,
} from "validation";
import { lats, lngs } from "../Services";

const servicesPH: InferType<typeof ServiceOnMapLocationDataValidationSchema>[] =
  [...Array(12)].reduce((acc, curr) => {
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
              lat: lats[randomNum(lats.length)],
              lng: lngs[randomNum(lngs.length)],
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
          label: "Holiday Rentals",
          location: {
            country: "USA",
            countryCode: "CH",
            state: "LA",
            address: "Smart Street",
            postalCode: 8,
            cords: {
              lat: lats[randomNum(lats.length)],
              lng: lngs[randomNum(lngs.length)],
            },
            city: "LA",
          },
          price: 350,
          rating: 4.8,
          thumbnail:
            "https://www.costablancadreams.eu/wp-content/uploads/2019/10/MONT09-450x300.jpg",
          title: "Well Furnished Apartment",
        },
        serviceType: "holidays_rentals",
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
              lat: lats[randomNum(lats.length)],
              lng: lngs[randomNum(lngs.length)],
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
              lat: lats[randomNum(lats.length)],
              lng: lngs[randomNum(lngs.length)],
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
              lat: lats[randomNum(lats.length)],
              lng: lngs[randomNum(lngs.length)],
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
              lat: lats[randomNum(lats.length)],
              lng: lngs[randomNum(lngs.length)],
            },
            city: "LA",
          },
          price: [50, 500],
          rating: 4.8,
          thumbnail:
            "https://www.iosrelocations.com/img/service-2/car-rental-services.jpg",
          title: "Beauty Haven",
        },
        serviceType: "vehicle",
        sellerInfo: {
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (4).jfif",
          verified: true,
        },
      },
    ];
  }, []);

export const getServicesOnMapLocationsFetcher = async (
  filters: FormatedSearchableFilter
): Promise<
  InferType<typeof ServicesOnMapLocationsApiResponseValidationSchema>
> => {
  const res: AsyncReturnType<typeof getServicesOnMapLocationsFetcher> = {
    total: 20,
    hasMore: false,
    data: servicesPH.filter((v) => v.serviceType === filters["serviceType"]),
  };

  return CheckValidation(
    ServicesOnMapLocationsApiResponseValidationSchema,
    res
  );
};
