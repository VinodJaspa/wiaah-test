import { FilteredHotelsMetaDataType } from "api";
import { Form, Formik } from "formik";
import { usePagination, useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormikInput, HotelRoom, useMutateFocusedMapItemId } from "@UI";
import {
  useGetFilteredServicesMetaDataQuery,
  DisplayFoundServices,
  HotelDetailedSearchCard,
  SpinnerFallback,
  PaginationWrapper,
} from "@UI";
import { Button } from "@partials";

export interface HotelsSearchListProps {
  sorting?: boolean;
  horizontal?: boolean;
  rooms: HotelRoom[];
  total: number;
}

export const HotelsSearchList: React.FC<HotelsSearchListProps> = ({
  sorting,
  horizontal,
  rooms,
  total,
}) => {
  const { focusMapItem } = useMutateFocusedMapItemId();
  const { page, take } = usePagination();
  const { t } = useTranslation();

  let filters = {};
  let getLocationFilterQuery = "";
  const [services, setServices] = React.useState<FilteredHotelsMetaDataType[]>(
    rooms?.map((v) => ({
      date: v.createdAt,
      description: v.description,
      id: v.id,
      location: v.hotel?.location,
      pricePerNight: v.pricePerNight,
      rate: v.rating,
      reviews: v.reviews,
      serviceClass: 4,
      provider: "Seller",
      taxesAndFeesIncluded: true,
      thumbnail: v?.presentations[0]?.src,
      title: v.title,
      totalPrice: v.pricePerNight,
    })) || []
  );
  const { isTablet } = useResponsive();

  return horizontal ? (
    <div className="w-fit flex gap-4 justify-center">
      {services.length < 1 ? (
        <div className="w-fit h-48 flex just-center items-center text-2xl">
          <span>{t("no services found")}</span>
        </div>
      ) : (
        services.map((service, i) => (
          <div className="w-56">
            <HotelDetailedSearchCard
              vertical
              minimal
              onShowOnMap={(id) => focusMapItem(id)}
              key={i}
              {...service}
            />
          </div>
        ))
      )}
    </div>
  ) : (
    <>
      <div className="w-full justify-start ">
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values, setValues }) => (
            <Form className="flex items-center justify-between w-full">
              <div className="flex gap-4 p-4">
                <FormikInput name="title" label={t("Title")} />
                <FormikInput name="rate" type={"number"} label={t("Rating")} />
                <FormikInput name="price" type="number" label={t("Price")} />
                <FormikInput name="seller" label={t("Seller")} />
              </div>
              <Button>{t("Search")}</Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full flex flex-col gap-4 justify-center">
        <DisplayFoundServices
          location={getLocationFilterQuery || ""}
          servicesNum={total || 0}
        />
        {services.length < 1 ? (
          <div className="w-fit h-48 flex just-center items-center text-2xl">
            <span>{t("no services found")}</span>
          </div>
        ) : (
          services.map((service, i) => (
            <HotelDetailedSearchCard
              vertical={isTablet}
              onShowOnMap={(id) => focusMapItem(id)}
              key={i}
              {...service}
            />
          ))
        )}
      </div>
    </>
  );
};
