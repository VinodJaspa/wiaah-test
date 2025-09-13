import {
  CheckValidation,
  InferType,
  ServiceOnMapLocationDataValidationSchema,
  ServicesOnMapLocationsApiResponseValidationSchema,
} from "validation";
import { FormatedSearchableFilter } from "../../../types/SearchableData";
import { lats, lons } from "../Services";

const servicesPH: InferType<typeof ServiceOnMapLocationDataValidationSchema>[] =
  [...Array(12)].reduce((acc, curr) => {
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
            lat: lats[0],
            lon: lons[0],
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
          id: "seller-1",
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
            lat: lats[0],
            lon: lons[0],
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
          id: "seller-2",
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
            lat: lats[0],
            lon: lons[0],
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
          id: "seller-3",
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
            lat: lats[0],
            lon: lons[0],
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
          id: "seller-4",
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
            lat: lats[0],
            lon: lons[0],
            city: "LA",
          },
          price: [50, 500],
          rating: 4.8,
          thumbnail:
            "https://i.pinimg.com/564x/39/4c/70/394c70694d5cbce7bef4b724b822cce3.jpg",
          title: "Beauty Haven",
        },
        serviceType: "beauty_center",
        sellerInfo: {
          id: "seller-5",
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
            lat: lats[0],
            lon: lons[0],
            city: "LA",
          },
          price: [50, 500],
          rating: 4.8,
          thumbnail:
            "https://thedesignawards.co.uk/wp-content/uploads/2022/05/SpaSpa-Hotel_Blended-Wellness-Spa_-Bishop-Design_1-2.jpg",
          title: "Beauty Haven",
        },
        serviceType: "vehicle",
        sellerInfo: {
          id: "seller-6",
          name: "Seller name",
          profession: "Profession",
          thumbnail: "/profile (4).jfif",
          verified: true,
        },
      },
    ];
  }, []);

export const getServicesOnMapLocationsFetcher = async (
  filters?: FormatedSearchableFilter,
) => {
  try {
    const filteredData = servicesPH.filter(
      (v) => !filters?.serviceType || v.serviceType === filters.serviceType,
    );

    const res = {
      total: filteredData.length,
      hasMore: false,
      data: filteredData,
    };

    return CheckValidation(
      ServicesOnMapLocationsApiResponseValidationSchema,
      res,
    );
  } catch (error) {
    console.error("Validation Error:", error);
    return { total: 0, hasMore: false, data: [] };
  }
};
