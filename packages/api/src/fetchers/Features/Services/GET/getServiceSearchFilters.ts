import { ServiceType } from "@features/API";

export type FilterType = "select" | "radio" | "check";
export type FilterDisplayType = "text" | "rate";

export type SearchFilterType =
  | {
    filterTitle: string;
    filterSlug: string;
    filterType: FilterType;
    filterDisplay: FilterDisplayType;
    filterOptions: {
      optName: string;
      optSlug: string;
    }[];
  }
  | {
    filterTitle: string;
    filterSlug: string;
    filterType: "range";
    minRange: number;
    maxRange: number;
  };

const filters: SearchFilterType[] = [
  {
    filterTitle: "Price range",
    filterSlug: "price_range",
    filterType: "range",
    maxRange: 10000,
    minRange: 10,
  },

  {
    filterTitle: "Property type",
    filterSlug: "property_type",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "Hotel",
        optSlug: "hotel",
      },
      {
        optName: "House",
        optSlug: "house",
      },
      {
        optName: "Flat",
        optSlug: "flat",
      },
      {
        optName: "Guest house",
        optSlug: "guest_house",
      },
      {
        optName: "Hostel",
        optSlug: "hostel",
      },
    ],
  },
  {
    filterTitle: "Type of place",
    filterSlug: "type_of_place",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "Private apartment",
        optSlug: "private_apartment",
      },
      {
        optName: "Private room",
        optSlug: "private_room",
      },
      {
        optName: "Shared room",
        optSlug: "shared_room",
      },
    ],
  },
  {
    filterTitle: "Number of rooms",
    filterSlug: "number_of_rooms",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "1 room",
        optSlug: "1",
      },
      {
        optName: "2 rooms",
        optSlug: "2",
      },
      {
        optName: "3 rooms",
        optSlug: "3",
      },
      {
        optName: "4 rooms",
        optSlug: "4",
      },
      {
        optName: "5 rooms",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Number of beds",
    filterSlug: "number_of_beds",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "1 bed",
        optSlug: "1",
      },
      {
        optName: "2 beds",
        optSlug: "2",
      },
      {
        optName: "3 beds",
        optSlug: "3",
      },
      {
        optName: "4 beds",
        optSlug: "4",
      },
      {
        optName: "5 beds",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Hotel class",
    filterSlug: "hotel_class",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Service included",
    filterSlug: "service_included",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [],
  },
  {
    filterTitle: "Extra service",
    filterSlug: "extra_service",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [],
  },
  {
    filterTitle: "Special Offer",        // fixed spelling
    filterSlug: "special_offer",
    filterDisplay: "text",
    filterType: "radio",
    filterOptions: [
      { optName: "None", optSlug: "none" },
      { optName: "Discount", optSlug: "discount" },
      { optName: "Buy 1 Get 1", optSlug: "b1g1" },
      { optName: "Free Trial", optSlug: "free_trial" },
      { optName: "Limited Time Offer", optSlug: "limited_time" },
    ],
  },
  {
    filterTitle: "Cancellation option",
    filterSlug: "cancellation_option",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Free cancellation",
        optSlug: "free_cancellation",
      },
      {
        optName: "Paid cancellation",
        optSlug: "paid_cancellation",
      },
    ],
  },
];

const HealthCenterFilters: SearchFilterType[] = [
  {
    filterTitle: "Specialist type",
    filterSlug: "specialist_type",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Ophtalmo",
        optSlug: "ophtalmo",
      },
      {
        optName: "Dentist",
        optSlug: "dentist",
      },
      {
        optName: "Ophtalmo",
        optSlug: "ophtalmo",
      },
      {
        optName: "Dentist",
        optSlug: "dentist",
      },
    ],
  },
  // {
  //   filterTitle: "Speaking language",
  //   filterSlug: "speaking_language",
  //   filterDisplay: "text",
  //   filterType: "radio",
  //   filterOptions: [
  //     {
  //       optName: "Arabian",
  //       optSlug: "arabian",
  //     },
  //     {
  //       optName: "English",
  //       optSlug: "english",
  //     },
  //     {
  //       optName: "French",
  //       optSlug: "french",
  //     },
  //   ],
  // },
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [...Array(5)].map((_, i) => ({
      optName: `${i + 1}`,
      optSlug: `${i + 1}`,
    })),
  },
  {
    filterTitle: "Cancellation option",
    filterSlug: "cancellation_option",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Free cancellation",
        optSlug: "free_cancellation",
      },
      {
        optName: "Paid cancellation",
        optSlug: "paid_cancellation",
      },
    ],
  },
];

const generalFilters: SearchFilterType[] = [
  {
    filterTitle: "Service type",
    filterSlug: "service_type",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Hair salon",
        optSlug: "hair_salon",
      },
      {
        optName: "Sauna",
        optSlug: "sauna",
      },
      {
        optName: "Spa",
        optSlug: "spa",
      },
      {
        optName: "Manicure",
        optSlug: "manicure",
      },
      {
        optName: "Beauty salon",
        optSlug: "beauty salon",
      },
    ],
  },
  {
    filterTitle: "Price range",
    filterSlug: "price_range",
    filterType: "range",
    maxRange: 15000,
    minRange: 15,
  },
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
];

const VehicleFilters: SearchFilterType[] = [
  {
    filterTitle: "Vehilce type",
    filterDisplay: "text",
    filterSlug: "vehicle_type",
    filterType: "check",
    filterOptions: [
      {
        optName: "Boat",
        optSlug: "boat",
      },
      {
        optName: "Car",
        optSlug: "car",
      },
      {
        optName: "Bike",
        optSlug: "bike",
      },
    ],
  },
  {
    filterTitle: "Security deposit",
    filterSlug: "security_deposit",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "No",
        optSlug: "0",
      },
      {
        optName: "$100",
        optSlug: "100",
      },
      {
        optName: "$200",
        optSlug: "200",
      },
    ],
  },
  {
    filterTitle: "Passenger number",
    filterSlug: "passenger_number",
    filterType: "radio",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "0",
        optSlug: "0",
      },
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Number of seat",
    filterSlug: "number_of_seat",
    filterType: "radio",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "0",
        optSlug: "0",
      },
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Vehicle options",
    filterSlug: "vehicle_options",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "Aircon",
        optSlug: "aircon",
      },
      {
        optName: "Automatic",
        optSlug: "automatic",
      },
      {
        optName: "Estate car",
        optSlug: "estate_car",
      },
      {
        optName: "Manual transmission",
        optSlug: "manual_transmission",
      },
      {
        optName: "Air conditioning",
        optSlug: "air_conditioning",
      },
      {
        optName: "Petrol",
        optSlug: "petrol",
      },
    ],
  },
  {
    filterTitle: "Price range",
    filterSlug: "price_range",
    filterType: "range",
    maxRange: 15000,
    minRange: 15,
  },
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Special Offer",        // fixed spelling
    filterSlug: "special_offer",
    filterDisplay: "text",
    filterType: "radio",
    filterOptions: [
      { optName: "None", optSlug: "none" },
      { optName: "Discount", optSlug: "discount" },
      { optName: "Buy 1 Get 1", optSlug: "b1g1" },
      { optName: "Free Trial", optSlug: "free_trial" },
      { optName: "Limited Time Offer", optSlug: "limited_time" },
    ],
  },
  {
    filterTitle: "Cancellation option",
    filterSlug: "cancellation_option",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Free cancellation",
        optSlug: "free_cancellation",
      },
      {
        optName: "Paid cancellation",
        optSlug: "paid_cancellation",
      },
    ],
  },
];

const BeautyCenterFilters: SearchFilterType[] = [
  {
    filterTitle: "Type of seller",
    filterSlug: "type_of_seller",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "Individual",
        optSlug: "individual",
      },
      {
        optName: "Professional",
        optSlug: "professional",
      },
    ],
  },
  {
    filterTitle: "Beauty center type",
    filterSlug: "beauty_center_type",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Hair salon",
        optSlug: "hair_salon",
      },
      {
        optName: "Body care",
        optSlug: "body_care",
      },
      {
        optName: "Spa",
        optSlug: "spa",
      },
      {
        optName: "Sauna",
        optSlug: "sauna",
      },
      {
        optName: "Manicure",
        optSlug: "manicure",
      },
      {
        optName: "Massage & relaxation",
        optSlug: "massage_and_relaxation",
      },
    ],
  },
  // {
  //   filterTitle: "Beauty salon",
  //   filterSlug: "Beauty_salon",
  //   filterType: "check",
  //   filterDisplay: "text",
  //   filterOptions: [
  //     {
  //       optName: "Facial care & Makeup",
  //       optSlug: "facial_care_and_makeup",
  //     },
  //     {
  //       optName: "Skin care",
  //       optSlug: "skin_care",
  //     },
  //     {
  //       optName: "Tattoo shop",
  //       optSlug: "tattoo_shop",
  //     },
  //     {
  //       optName: "Aesthetic medicine",
  //       optSlug: "aesthetic_medicine",
  //     },
  //   ],
  // },
  {
    filterTitle: "Treatment type",
    filterSlug: "treatment_type",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Body",
        optSlug: "body",
      },
      {
        optName: "Exfoliation",
        optSlug: "exfoliation",
      },
      {
        optName: "Micro-peeling",
        optSlug: "micro_peeling",
      },
      {
        optName: "Body polish",
        optSlug: "body_polish",
      },
      {
        optName: "Foot scrub",
        optSlug: "foot_scrub",
      },
      {
        optName: "Bridal",
        optSlug: "bridal",
      },
      {
        optName: "Hair and Makeup",
        optSlug: "hair_and_makeup",
      },
      {
        optName: "Eyelash extensions",
        optSlug: "eyelash_extensions",
      },
    ],
  },
  {
    filterTitle: "Price Range",
    filterSlug: "price_range",
    filterType: "range",
    minRange: 10,
    maxRange: 10000,
  },
  {
    filterTitle: "Special Offer",        // fixed spelling
    filterSlug: "special_offer",
    filterDisplay: "text",
    filterType: "radio",
    filterOptions: [
      { optName: "None", optSlug: "none" },
      { optName: "Discount", optSlug: "discount" },
      { optName: "Buy 1 Get 1", optSlug: "b1g1" },
      { optName: "Free Trial", optSlug: "free_trial" },
      { optName: "Limited Time Offer", optSlug: "limited_time" },
    ],
  },
  
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
];

const RestaurantFilters: SearchFilterType[] = [
  // {
  //   filterTitle: "Price range",
  //   filterSlug: "price_range",
  //   filterType: "range",
  //   maxRange: 10000,
  //   minRange: 10,
  // },
  // {
  //   filterTitle: "Setting and ambience",
  //   filterSlug: "type_of_seller",
  //   filterType: "check",
  //   filterDisplay: "text",
  //   filterOptions: [
  //     {
  //       optName: "Family",
  //       optSlug: "",
  //     },
  //     {
  //       optName: "Romantice",
  //       optSlug: "",
  //     },
  //   ],
  // },
  {
    filterTitle: "Cusinie type",
    filterSlug: "type_of_seller",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "French",
        optSlug: "french",
      },
      {
        optName: "American",
        optSlug: "american",
      },
      {
        optName: "Asturalian",
        optSlug: "ast",
      },
      {
        optName: "Japanseian",
        optSlug: "japan",
      },
    ],
  },
  {
    filterTitle: "Michlen guide",
    filterSlug: "beauty_center_type",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "1 Star",
        optSlug: "hair_salon",
      },
      {
        optName: "2 Star",
        optSlug: "hair_salon",
      },
      {
        optName: "3 Star",
        optSlug: "hair_salon",
      },
      {
        optName: "4 Star",
        optSlug: "hair_salon",
      },
      {
        optName: "5 Star",
        optSlug: "hair_salon",
      },
    ],
  },
  {
    filterTitle: "Price range",
    filterSlug: "price_range",
    filterType: "range",
    maxRange: 15000,
    minRange: 15,
  },
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Cancellation option",
    filterSlug: "cancellation_option",
    filterDisplay: "text",
    filterType: "check",
    filterOptions: [
      {
        optName: "Free cancellation",
        optSlug: "free_cancellation",
      },
      {
        optName: "Paid cancellation",
        optSlug: "paid_cancellation",
      },
    ],
  },
  {
    filterTitle: "Special Offer",        // fixed spelling
    filterSlug: "special_offer",
    filterDisplay: "text",
    filterType: "radio",
    filterOptions: [
      { optName: "None", optSlug: "none" },
      { optName: "Discount", optSlug: "discount" },
      { optName: "Buy 1 Get 1", optSlug: "b1g1" },
      { optName: "Free Trial", optSlug: "free_trial" },
      { optName: "Limited Time Offer", optSlug: "limited_time" },
    ],
  }
  
];

export const getServiceSearchFiltersFetcher = async (
  serviceType: ServiceType
): Promise<SearchFilterType[]> => {
  switch (serviceType as ServiceType) {
    case ServiceType.HealthCenter:
      return HealthCenterFilters;

    case ServiceType.Vehicle:
      return VehicleFilters;

    case ServiceType.BeautyCenter:
      return BeautyCenterFilters;

    case ServiceType.Hotel:
      return filters;

    case ServiceType.Restaurant:
      return RestaurantFilters;

    default:
      return [];
  }
};
