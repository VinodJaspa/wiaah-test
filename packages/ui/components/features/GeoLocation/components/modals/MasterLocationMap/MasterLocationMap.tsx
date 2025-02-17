import {
  CloseIcon,
  LocationSearchInput,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  RenderMap,
  SearchServiceCard,
  servicesOnMapState,
  StoreIcon,
  useGetServicesOnMapLocationQuery,
} from "@UI";
import { ServicesSearchBadgeList } from "@UI/components/features/Services/components/DataDisplay/ServicesSearchBadgeList";
import { FormatedSearchableFilter } from "api";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { useSetRecoilState } from "recoil";
import { ServicesType } from "types";
import { mapArray } from "utils";

export type MasterLocationData = {
  id: string;
  searchType: "product" | "service" | "place";
  additionalFilters?: Record<string, any>;
};

export const useMasterLocationMapModal = (props?: {
  subToChanges?: boolean;
}) => {
  const subToChanges = props?.subToChanges;
  const [locations, setLocation] = React.useState<MasterLocationData[]>();
  const { Listen, emit, removeListner } = useReactPubsub(
    () => "MasterLocationMapSearch",
  );

  function SearchForLocation(data: MasterLocationData) {
    emit([data]);
  }
  function SearchForLocations(data: MasterLocationData[]) {
    emit(data);
  }
  function CloseMap() {
    emit();
  }

  if (subToChanges) {
    Listen((data) => {
      setLocation(data);
    });
  }

  React.useEffect(() => removeListner, []);

  return {
    locations,
    CloseMap,
    SearchForLocation,
    SearchForLocations,
  };
};

export const MasterLocationMapModal: React.FC = () => {
  const { locations, CloseMap } = useMasterLocationMapModal({
    subToChanges: true,
  });
  const { t } = useTranslation();
  const [filters, setFilters] = React.useState<FormatedSearchableFilter>({
    serviceType: "hotel",
    location: "",
  });
  const { data: res } = useGetServicesOnMapLocationQuery(filters);
  const setLocations = useSetRecoilState(servicesOnMapState);
  setLocations(
    res?.data?.map((ser) => ({
      id: ser.serviceData.id,
      price: ser.serviceData.price,
      title: ser.serviceData.title,
      lat: ser.serviceData.location.lat,
      lon: ser.serviceData.location.lon,
    })) || [],
  );

  return (
    <Modal isOpen={!!locations} onClose={CloseMap}>
      <ModalOverlay />
      <ModalContent className="w-[100vw] rounded-[0px] max-h-[fit-content] h-[100vh]">
        <div className="w-full h-full relative">
          <RenderMap />
          <Formik
            initialValues={{ serviceType: "hotel", location: "" }}
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => {
              setFilters(values);
              return (
                <Form>
                  <div className="flex gap-2 pointer-events-none absolute top-0 left-0 right-0 bottom-0">
                    <div className="self-center rounded-r-2xl pointer-events-auto bg-white px-2 w-1/2 h-full">
                      <div className="grid grid-cols-2 gap-4 px-2 h-full overflow-y-scroll thinScroll">
                        {res
                          ? mapArray(res.data, (data, i) => (
                              <SearchServiceCard key={i} {...data} />
                            ))
                          : null}
                      </div>
                    </div>
                    <div className="w-full h-full pointer-events-none relative">
                      <div className="absolute pointer-events-auto top-24 w-full overflow-x-scroll noScroll left-1/2 -translate-x-1/2">
                        <ServicesSearchBadgeList
                          activeKey={values["serviceType"] as ServicesType}
                          additionalLinks={[
                            {
                              key: "shop",
                              name: t("Shop"),
                              icon: <StoreIcon />,
                            },
                          ]}
                          onClick={(v) => {
                            setFieldValue("serviceType", v);
                          }}
                        />
                      </div>
                      <div className="absolute pointer-events-auto bg-white w-[min(70rem,95%)] top-4 left-1/2 -translate-x-1/2">
                        <LocationSearchInput onLocationSelect={() => {}} />
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <ModalCloseButton>
          <div
            onClick={() => CloseMap()}
            className="cursor-pointer absolute bg-black text-white text-2xl bg-opacity-25 rounded-xl p-2 top-4 right-4"
          >
            <CloseIcon />
          </div>
        </ModalCloseButton>
      </ModalContent>
    </Modal>
  );
};
