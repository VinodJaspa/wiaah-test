import { Form, Formik } from "formik";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServicesType } from "types";
import {
  CalenderIcon,
  ClockIcon,
  DateAndTimeInput,
  DateFormInput,
  DateFormInputProps,
  DateInput,
  FilterSelectInput,
  FilterSelectInputProps,
  FormikInput,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  NumberInput,
  ProductSearchLocationInput,
  ProductSearchLocationInputProps,
  ResturantFindTableFilterDateDayComponent,
  ResturantFindTableFilterStepper,
  ResturantFindTableFilterStepperHeader,
  ResturantReplacableTimeComponent,
  SearchInput,
  SearchInputProps,
  SearchServiceCard,
  SearchServiceCardProps,
  ServiceBookingStepper,
  ServicesSearchBadgeList,
  Stepper,
  StepperContent,
  StepperHeader,
  TimeInput,
} from "ui";
import { mapArray } from "utils";

type ServiceInputData = {
  label: string;
  valueKey: string;
  placeholder: string;
  options: string[];
};

type CalenderFilterInputData = {
  placeholder: string;
  component: React.ReactNode;
};

export const ServicesSearchView: React.FC = () => {
  const { t } = useTranslation();

  const stepsPlaceholder = [
    {
      icon: <CalenderIcon />,
      name: "Step 1: Completed",
    },
    {
      icon: <CalenderIcon />,
      name: "Step 2: Not Completed",
    },
    {
      icon: <CalenderIcon />,
      name: "Step 3: In Progress",
    },
    // Add more steps as needed
  ];

  type Services =
    | "hotel"
    | "holidays_rentals"
    | "restaurant"
    | "health_center"
    | "vehicle"
    | "beauty_center";

  const getCalenderFilter = (service: Services) => {
    switch (service) {
      case "hotel":
        return {
          placeholder: t("Select Booking Date"),
          component: (
            <div className="p-4 w-full bg-primary-200 text-black flex flex-col gap-2">
              <FormikInput<SearchInputProps>
                as={SearchInput}
                innerProps={{ className: "bg-white text-black h-12" }}
                label={t("Destination") + "/" + t("property name") + ":"}
                name="search_query"
              />
              <FormikInput<DateFormInputProps>
                as={DateFormInput}
                className={"bg-white h-12"}
                menuProps={{
                  menuListProps: {
                    className: "translate-x-full origin-top-left",
                  },
                }}
                placeholder={t("Check-in") + " " + t("date")}
                label={t("Check-in") + " " + t("date") + ":"}
                name="check-in_date"
              />
              <FormikInput<DateFormInputProps>
                as={DateFormInput}
                menuProps={{
                  menuListProps: {
                    className: "translate-x-full origin-top-left",
                  },
                }}
                placeholder={t("Check-out") + " " + t("date")}
                className={"bg-white h-12 "}
                label={t("Check-out") + " " + t("date") + ":"}
                name="check-out_date"
              />
            </div>
          ),
        };
      case "holidays_rentals":
        return {
          placeholder: t("Select Booking Date"),
          component: (
            <div className="p-4 w-full bg-primary-200 text-black flex flex-col gap-2">
              <FormikInput<SearchInputProps>
                as={SearchInput}
                innerProps={{ className: "bg-white text-black h-12" }}
                label={t("Destination") + "/" + t("property name") + ":"}
                name="search_query"
              />
              <FormikInput<DateFormInputProps>
                as={DateFormInput}
                className={"bg-white h-12"}
                menuProps={{
                  menuListProps: {
                    className: "translate-x-full origin-top-left",
                  },
                }}
                placeholder={t("Check-in") + " " + t("date")}
                label={t("Check-in") + " " + t("date") + ":"}
                name="check-in_date"
              />
              <FormikInput<DateFormInputProps>
                as={DateFormInput}
                menuProps={{
                  menuListProps: {
                    className: "translate-x-full origin-top-left",
                  },
                }}
                placeholder={t("Check-out") + " " + t("date")}
                className={"bg-white h-12 "}
                label={t("Check-out") + " " + t("date") + ":"}
                name="check-out_date"
              />
            </div>
          ),
        };
      case "health_center":
        return {
          placeholder: t("Select Booking Date"),
          component: (
            <Stepper>
              {({ currentStepIdx, nextStep }) => (
                <>
                  <StepperHeader>
                    <ResturantFindTableFilterStepperHeader
                      currentStepIdx={currentStepIdx}
                      steps={stepsPlaceholder}
                    />
                  </StepperHeader>
                  <StepperContent>
                    <DateInput
                      className="w-[100%]"
                      dayComponent={ResturantFindTableFilterDateDayComponent}
                      onDaySelect={() => {
                        nextStep();
                      }}
                    />
                    <TimeInput
                      timeRange={{
                        from: { hour: 0, minutes: 0 },
                        to: { hour: 24, minutes: 0 },
                      }}
                      timeComponent={ResturantReplacableTimeComponent}
                    />
                  </StepperContent>
                </>
              )}
            </Stepper>
          ),
        };
      case "restaurant":
        return {
          placeholder: t("Select Booking Date"),
          component: <ResturantFindTableFilterStepper />,
        };
      case "vehicle":
        return {
          placeholder: t("Select Booking Date"),
          component: (
            <div className="flex flex-col gap-2">
              <DateAndTimeInput
                onDateChange={() => { }}
                dateLabel={t("Pick-up Date")}
              />
              <DateAndTimeInput
                onDateChange={() => { }}
                dateLabel={t("Return Date")}
              />
            </div>
          ),
        };
      case "beauty_center":
        return {
          placeholder: t("Select Booking Date"),
          component: (
            <ServiceBookingStepper
              steps={[
                { name: "Date", icon: CalenderIcon, component: DateInput },
                { name: "time", icon: ClockIcon, component: TimeInput },
              ]}
            />
          ),
        };
      default:
        break;
    }
  };

  const getFilters: (service: ServicesType) => ServiceInputData[] = (
    service
  ) => {
    switch (service) {
      case "hotel":
        return [
          {
            label: t("Property Type"),
            valueKey: "type",
            placeholder: t("Select Property Type"),
            options: ["Hotel", "House", "Flat", "Guest house", "Hastel"],
          },
          {
            label: t("Number of Rooms"),
            valueKey: "rooms",
            placeholder: t("Select Number of Rooms"),
            options: ["1 Room"].concat(
              [...Array(4)].map((_, i) => `${i + 2} ${t("Rooms")}`)
            ),
          },
          {
            label: t("Beds"),
            valueKey: "beds",
            placeholder: t("Select Beds Number"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Hotel Class"),
            valueKey: "class",
            placeholder: t("Select Hotel Class"),
            options: [`1 ${t("star")}`].concat(
              [...Array(4)].map((_, i) => `${i + 2} ${t("stars")}`)
            ),
          },
        ];

      case "holidays_rentals":
        return [
          {
            label: t("Property Type"),
            valueKey: "type",
            placeholder: t("Select Property Type"),
            options: ["Hotel", "House", "Flat", "Guest house", "Hastel"],
          },
          {
            label: t("Number of Rooms"),
            valueKey: "rooms",
            placeholder: t("Select Number of Rooms"),
            options: ["1 Room"].concat(
              [...Array(4)].map((_, i) => `${i + 2} ${t("Rooms")}`)
            ),
          },
          {
            label: t("Beds"),
            valueKey: "beds",
            placeholder: t("Select Beds Number"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Hotel Class"),
            valueKey: "class",
            placeholder: t("Select Hotel Class"),
            options: [`1 ${t("star")}`].concat(
              [...Array(4)].map((_, i) => `${i + 2} ${t("stars")}`)
            ),
          },
        ];

      case "restaurant":
        return [
          {
            label: t("Establishment Type"),
            valueKey: "establishment_type",
            placeholder: t("Select Establishment Type"),
            options: [
              t("Restaurants"),
              t("Quick Bites"),
              t("Dessert"),
              t("Coffee & Tea"),
              t("Bakeries"),
              t("Bars & Pubs"),
              t("Dine With a Local Chef"),
              t("Speciality Food Market"),
              t("Delivery Only"),
            ],
          },
          {
            label: t("Cuisines type"),
            valueKey: "cuisines_type",
            placeholder: t("Select Cuisines Type"),
            options: [
              t("Asain"),
              t("French"),
              t("Italian"),
              t("Indian"),
              t("Traditional", t("Egyptian")),
            ],
          },
          // {
          //   label: t("Michelin Guide"),
          //   valueKey: "guide",
          //   placeholder: t("Select Michelin Guide"),
          //   options: [
          //     t("Michelin Guide"),
          //     t("Michelin 1 star"),
          //     t("Michelin 2 stars"),
          //     t("Michelin 3 stars"),
          //     t("Michelin Bib Gourmand"),
          //   ],
          // },
          {
            label: t("Setting and ambiance"),
            valueKey: "setting_&_ambiance",
            placeholder: t("Select Setting and Ambiance"),
            options: [
              t("For Business"),
              t("For Family"),
              t("For Friends"),
              t("For Lovers"),
            ],
          },
          {
            label: t("Dishes"),
            valueKey: "dishes",
            placeholder: t("Select Dishes"),
            options: [
              t("Tapas"),
              t("Pizza"),
              t("Crepes"),
              t("Burger"),
              t("Seafood"),
              t("Wak"),
              t("Sushi"),
            ],
          },
          {
            label: t("Special offer"),
            valueKey: "special_offer",
            placeholder: t("Select Special offer"),
            options: [...Array(6)].map(
              (_, i) => `${(i + 1) * 10} ${t("on the menu")}`
            ),
          },
          {
            label: t("Payment Methods"),
            placeholder: t("Select Payment Methods"),
            valueKey: "payment",
            options: [
              t("Credit Card"),
              t("Visa"),
              t("Mastercard"),
              t("Check"),
              t("Cash"),
            ],
          },
        ];

      case "health_center":
        return [
          {
            label: t("Specialist type"),
            valueKey: "specialist",
            placeholder: t("Select Specialist Type"),
            options: [t("Ophtalmo"), t("Dentist"), t("Ophtalmo"), t("Dentist")],
          },
          {
            label: t("Speaking language"),
            valueKey: "language",
            placeholder: t("Select Speaking Language"),
            options: [t("Arabian"), t("English"), t("French")],
          },
          {
            label: t("Cancellation Option"),
            valueKey: "cancellation",
            placeholder: t("Select Cancellation Option"),
            options: [t("Free Cancellation"), t("Paid Cancellation")],
          },
          {
            label: t("Payment Methods"),
            placeholder: t("Select Payment Methods"),
            valueKey: "payment",
            options: [
              t("Credit Card"),
              t("Visa"),
              t("Mastercard"),
              t("Check"),
              t("Cash"),
            ],
          },
        ];
      case "vehicle":
        return [
          {
            label: t("Vehicle Type"),
            valueKey: "vehicle_type",
            placeholder: t("Select Vehicle Type"),
            options: [t("Boat"), t("Car"), t("Bike")],
          },
          {
            label: t("Security deposit"),
            placeholder: t("Select Security deposit"),
            valueKey: "deposit",
            options: [t("No"), t("$100"), t("$200")],
          },
          {
            label: t("Passenger number"),
            valueKey: "passenger",
            placeholder: t("Select Passenger Number"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Seats"),
            valueKey: "seats",
            placeholder: t("Select Number of Seats"),
            options: [...Array(10)].map((_, i) => `${i + 1}`),
          },
          {
            label: t("Vehicle options"),
            valueKey: "options",
            placeholder: t("Select Vehilce options"),
            options: [
              t("Aircon"),
              t("Automatic"),
              t("Estate car"),
              t("Manual transmission"),
              t("Air conditioning"),
              t("Petrol"),
            ],
          },
          {
            label: t("Cancellation Option"),
            valueKey: "cancellation",
            placeholder: t("Select Cancellation Option"),
            options: [t("Free Cancellation"), t("Paid Cancellation")],
          },
        ];
      case "beauty_center":
        return [
          {
            label: t("Type of seller"),
            valueKey: "sellerType",
            placeholder: t("Select Type of seller"),
            options: [t("Individual"), t("Professional")],
          },
          {
            label: t("Beauty center type"),
            valueKey: "centerType",
            placeholder: t("Select Beauty center type"),
            options: [
              t("Hair salon"),
              t("Body care"),
              t("Spa"),
              t("Sauna"),
              t("Manicure"),
              t("Massage & relaxation"),
            ],
          },
          {
            label: t("Beauty salon"),
            valueKey: "salonType",
            placeholder: t("Select Salon Type"),
            options: [
              t("Facial care & Makeup"),
              t("Skin care"),
              t("Tatto shop"),
              t("Aesthetic medicine"),
            ],
          },
          {
            label: t("Treatment type"),
            valueKey: "treatmentType",
            placeholder: t("Select Treatment type"),
            options: [
              t("Body"),
              t("Exfaliation"),
              t("Micro-peeling"),
              t("Body polish"),
              t("Foot scrub"),
              t("Bridal"),
              t("Hair and Makeup"),
              t("Eyelash extensions"),
            ],
          },
          {
            label: t("Special offer"),
            valueKey: "special_offer",
            placeholder: t("Select Special offer"),
            options: [...Array(6)].map(
              (_, i) => `${(i + 1) * 10} ${t("on the menu")}`
            ),
          },
          {
            label: t("Cancellation Option"),
            valueKey: "cancellation",
            placeholder: t("Select Cancellation Option"),
            options: [t("Free Cancellation"), t("Paid Cancellation")],
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <Formik
        initialValues={{ serviceType: "hotel" } as any}
        onSubmit={() => { }}
      >
        {({ values, setFieldValue }) => {
          const filters = getFilters(values["serviceType"]);
          const filtersLen = filters.length + 4;
          const maxFiltersPerLine = 6;

          const getFiltersPerLine = (filtersLen: number): number => {
            let foundFiltersPerLine = false;
            let currentCycle = 1;
            let filtersPerLine = 0;

            while (foundFiltersPerLine !== true && currentCycle < 10) {
              const remaining = filtersLen / currentCycle;

              console.log(
                { filtersLen, filtersPerLine: currentCycle, remaining },
                remaining
              );

              if (
                Number.isInteger(remaining) &&
                remaining < maxFiltersPerLine
              ) {
                filtersPerLine = remaining;
                foundFiltersPerLine = true;
              } else {
                currentCycle += 1;
              }
            }

            return filtersPerLine;
          };

          const filtersPerLine = getFiltersPerLine(filtersLen);
          return (
            <Form className="flex flex-col gap-7">
              <ServicesSearchBadgeList
                activeKey={values["serviceType"]}
                onClick={(serviceType) => {
                  setFieldValue("serviceType", serviceType);
                }}
              />
              {/* <div className="flex gap-8">
                <Stack divider={<Divider variant="vert" />}>
                  
                </Stack>
                <Button className="flex gap-2 text-white items-center">
                  <SearchIcon />
                  <p>{t("Submit")}</p>
                </Button>
              </div> */}
              <div
                style={{
                  gridTemplateColumns: `repeat(${filtersPerLine},1fr)`,
                }}
                className="grid gap-5"
              >
                <FormikInput<ProductSearchLocationInputProps>
                  as={ProductSearchLocationInput}
                  name={"ProductSearchLocationInput"}
                />
                <Menu className="w-full">
                  <MenuButton>
                    <InputGroup
                      className="border-[0px] rounded-xl"
                      style={{
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.03",
                      }}
                    >
                      <InputLeftElement>
                        <CalenderIcon className="text-primary text-xl" />
                      </InputLeftElement>
                      <Input
                        className="h-12"
                        placeholder={
                          getCalenderFilter(values["serviceType"])
                            ?.placeholder ||
                          t("Select Service to Choose a date")
                        }
                        readOnly
                      />
                    </InputGroup>
                  </MenuButton>
                  <MenuList origin="top left" className="p-4 left-0 ">
                    {getCalenderFilter("restaurant").component}
                  </MenuList>
                </Menu>
                {mapArray(filters, (filter, i) => {
                  console.log({ filter });
                  return (
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
                  );
                })}
                <FormikInput<FilterSelectInputProps>
                  name="rating"
                  label={t("Rating")}
                  options={[...Array(5)].map(
                    (_, i) => `${Math.abs(i - 5)} ${t("Stars")}`
                  )}
                  onChange={(v) => setFieldValue("rating", v)}
                  value={values["rating"]}
                  as={FilterSelectInput}
                />
                <FormikInput
                  name="price"
                  label={t("Price")}
                  as={() => (
                    <div className="flex gap-1">
                      <NumberInput
                        value={values["minPrice"]}
                        onChange={(v) => setFieldValue("minPrice", v)}
                        placeholder="Min"
                      />
                      <NumberInput
                        value={values["maxPrice"]}
                        onChange={(v) => setFieldValue("maxPrice", v)}
                        placeholder="Max"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="grid gap-12 grid-cols-4">
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
    ] as SearchServiceCardProps[];
  },
  []
);
