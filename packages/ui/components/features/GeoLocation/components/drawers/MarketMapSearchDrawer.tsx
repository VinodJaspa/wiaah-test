import { useSocialControls } from "@blocks";
import { ServiceFilterSelectionType, ServiceType } from "@features/API";
import { RenderMap } from "@features/GoogleMaps";
import { useGetServiceCategoryFiltersQuery } from "@features/Services";
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  ArrowLeftIcon,
  BeautyCenterOutlineIcon,
  Button,
  CloseIcon,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  FilterIcon,
  ForkAndKnifeIcon,
  HStack,
  HealthCenterOutlineIcon,
  HotelOutlineIcon,
  HouseIcon,
  Input,
  LocationIcon,
  SimpleTabHead,
  SimpleTabItemList,
  SimpleTabs,
  VehicleOutlineIcon,
} from "@partials";
import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

export const MarketMapSearchDrawer: React.FC<{}> = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { value, hideMarketMapSearch } = useSocialControls(
    "marketShowMapSearch"
  );

  const { form, reset, handleChange } = useForm<{
    type: ServiceType;
  }>(
    {
      type: ServiceType.Hotel,
    },
    undefined
  );

  const filterServicesData: {
    icon: ReactNode;
    slug: ServiceType;
  }[] = [
      {
        icon: <HotelOutlineIcon />,
        slug: ServiceType.Hotel,
      },
      {
        icon: <HouseIcon />,
        slug: ServiceType.HolidayRentals,
      },
      {
        icon: <ForkAndKnifeIcon />,
        slug: ServiceType.Restaurant,
      },
      {
        icon: <HealthCenterOutlineIcon />,
        slug: ServiceType.HealthCenter,
      },
      {
        icon: <VehicleOutlineIcon />,
        slug: ServiceType.Vehicle,
      },
      {
        icon: <BeautyCenterOutlineIcon />,
        slug: ServiceType.BeautyCenter,
      },
    ];
  const { data: filters } = useGetServiceCategoryFiltersQuery(
    { serviceType: form.type! },
    { enabled: Object.values(ServiceType).includes(form.type) }
  );

  const [selectedValues, setSelectedValues] = React.useState<
    {
      id: string;
      value: string[];
    }[]
  >([]);

  const isSelected = (id: string, value: string): boolean => {
    const values = selectedValues.find((v) => v.id === id)?.value;

    if (values) {
      return values.includes(value);
    } else {
      return false;
    }
  };

  const toggleSelect = (id: string, value: string, multiple?: boolean) => {
    const values = selectedValues.find((v) => v.id === id)?.value;

    if (values) {
      if (values.includes(value)) {
        setSelectedValues((old) => [
          ...old.filter((v) => v.id !== id),
          { id, value: values.filter((v) => v !== value) },
        ]);
      } else {
        setSelectedValues((old) => [
          ...old.filter((v) => v.id !== id),
          { id, value: [...values, value] },
        ]);
      }
    } else {
      setSelectedValues((old) => [...old, { id, value: [value] }]);
    }
  };

  return (
    <>
      <Drawer
        isOpen={!!value}
        onClose={hideMarketMapSearch}
        full
        position="bottom"
      >
        <DrawerContent>
          <div className="relative w-full h-full">
            <div className="absolute z-10 top-8 left-0 w-full flex gap-4 px-2 items-center">
              <button className="bg-white rounded-full min-w-[2rem] min-h-[2rem] flex justify-center items-center">
                <ArrowLeftIcon className="text-3xl text-black " />
              </button>
              <Input />
              <button
                onClick={() => setShowFilters(true)}
                className="min-w-[2rem] rounded-full min-h-[2rem] bg-white flex justify-center items-center"
              >
                <FilterIcon className="fill-black" />
              </button>
            </div>

            <RenderMap />

            <div className="absolute bottom-0 p-4 pr-0 w-full overflow-x-scroll">
              {/* TODO: display services/shops */}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        position="bottom"
        draggable
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <HStack className="justify-between p-4">
            <button onClick={() => setShowFilters(false)}>
              <CloseIcon />
            </button>

            <p>{t("Filter")}</p>

            <button onClick={reset}>{t("clear all")}</button>
          </HStack>

          <SimpleTabs>
            <SimpleTabHead>
              {[t("Services"), t("Shops")].map((label, i) => (
                <Button
                  onClick={() => console.log(`Tab ${i} clicked`)}
                  className="w-full rounded-full"
                  colorScheme={i === 0 ? "darkbrown" : "white"}
                  key={i}
                >
                  {label}
                </Button>
              ))}
            </SimpleTabHead>
            <SimpleTabItemList>
              {/* services filters */}
              <div className="flex flex-col gap-6 p-4">
                <HStack className="gap-4 overflow-x-scroll noScroll">
                  {mapArray(filterServicesData, ({ icon, slug }) => (
                    <Button
                      colorScheme={slug === form.type ? "primary" : "lightGray"}
                      onClick={() => handleChange("type", slug)}
                      className="text-xl text-black"
                    >
                      <>{icon}</>
                    </Button>
                  ))}
                </HStack>

                <div className="flex flex-col gap-2">
                  <p>{t("Searching area")}</p>
                  <HStack>
                    <LocationIcon />
                    {/* TODO: display searching area */}
                    {/* <p>{form.}</p> */}
                  </HStack>
                </div>

                <div className="flex flex-col gap-4">
                  <HStack className="justify-between">
                    <p className="font-medium">{t("Select km range")}</p>
                    <p className="text-grayText text-sm">
                      4 km - 20 km {`(${t("max")})`}
                    </p>
                  </HStack>

                  <Input
                    max={10}
                    min={4}
                    className="RangeInput w-full"
                    type="range"
                  />
                </div>

                <Accordion>
                  <AccordionButton>
                    <p className="font-medium">
                      {t("Search by property name")}
                    </p>
                  </AccordionButton>
                  <AccordionPanel>
                    {/* TODO: bind to form */}
                    <Input />
                  </AccordionPanel>
                </Accordion>

                {mapArray(filters, (filter) => (
                  <div className="flex flex-col gap-4">
                    <p>{filter.filterGroupName}</p>
                    {filter.selectionType ===
                      ServiceFilterSelectionType.MultiSelect ? (
                      <HStack className="w-full overflow-x-scroll">
                        {mapArray(filter.filterValues, (value, i) => (
                          <Button
                            onClick={() =>
                              toggleSelect(
                                filter.id,
                                value.filteringValue,
                                true
                              )
                            }
                            outline={
                              !isSelected(filter.id, value.filteringValue)
                            }
                            key={value.filteringValue + i}
                          >
                            {value.name}
                          </Button>
                        ))}
                      </HStack>
                    ) : filter.selectionType ===
                      ServiceFilterSelectionType.SingleSelect ? (
                      <HStack className="w-full overflow-x-scroll">
                        {mapArray(filter.filterValues, (value, i) => (
                          <Button
                            onClick={() =>
                              toggleSelect(
                                filter.id,
                                value.filteringValue,
                                false
                              )
                            }
                            outline={
                              !isSelected(filter.id, value.filteringValue)
                            }
                            key={value.filteringValue + i}
                          >
                            {value.name}
                          </Button>
                        ))}
                      </HStack>
                    ) : (
                      // TODO: add range input
                      (<></>)
                    )}
                  </div>
                ))}
              </div>

              {/* TODO: shop filters */}
              <></>
            </SimpleTabItemList>
          </SimpleTabs>

          <Button className="w-full p-4" colorScheme="darkbrown" outline>
            {t("Apply filters")}
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
};
