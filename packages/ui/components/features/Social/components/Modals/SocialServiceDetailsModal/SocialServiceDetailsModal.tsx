import { useModalDisclouser } from "hooks";
import React from "react";
import { Modal, ModalContent } from "ui";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useGetServicesProviderQuery,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServiceWorkingHoursSection,
  HotelServiceRoomsSection,
  PopularAmenitiesSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  ServiceReservastion,
  SectionsScrollTabList,
  Accordion,
  ModalCloseButton,
  ModalHeader,
  CloseIcon,
  ModalOverlay,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
export interface SocialServiceDetailsModalProps {}

export const SocialServiceDetailsModal: React.FC<
  SocialServiceDetailsModalProps
> = ({}) => {
  const { Listen } = useReactPubsub((keys) => keys.serviceModal);
  const { isOpen, handleClose, handleOpen } = useModalDisclouser();
  React.useEffect(() => {
    console.log("listening");
    Listen((props) => {
      if ("id" in props) {
        handleOpen();
      }
    });
  }, []);
  const { filters } = useSearchFilters();
  const { isMobile } = useResponsive();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent
        style={{
          width: "calc(100vw - 8rem)",
          height: "calc(100vh - 8rem)",
        }}
        className="h-[100% - 8rem] z-50 overflow-y-scroll thinScroll"
      >
        <ModalCloseButton>
          <CloseIcon className="text-2xl" />
        </ModalCloseButton>
        <div className="flex flex-col gap-8 px-2 py-8">
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? <ServicesProviderHeader {...res.data} /> : null}
          </SpinnerFallback>
          <Divider />
          <ServicePresentationCarosuel
            data={res ? res.data.presintations || [] : []}
          />
          <SectionsScrollTabList
            visible={!isMobile}
            tabs={ServicesProviderTabs}
          />
          <StaticSideBarWrapper sidebar={ServiceReservastion}>
            {res ? (
              <>
                <ServicesProviderDescriptionSection
                  description={res.data.description}
                  name={res.data.name}
                  proprtyType={res.data.proprtyType}
                />
                <Divider />
                <Accordion>
                  <PopularAmenitiesSection
                    cols={2}
                    amenities={res.data.PopularAmenities || []}
                  />
                  <Divider />
                  <ServiceReachOutSection
                    email={res.data.email}
                    location={res.data.location}
                    telephone={res.data.telephone}
                  />
                  <HotelServiceRoomsSection rooms={res.data.rooms} />
                  <ServiceWorkingHoursSection
                    workingDays={res.data.workingDays}
                  />
                  <ServicePoliciesSection policies={res.data.policies} />
                  <ServiceOnMapLocalizationSection
                    location={res.data.location}
                  />
                </Accordion>
              </>
            ) : null}
            <Reviews id={res?.data.id || ""} reviews={reviews} />
          </StaticSideBarWrapper>
        </div>
      </ModalContent>
    </Modal>
  );
};

const ServicesProviderTabs: SectionTabType[] = [
  {
    slug: "description",
    name: "Description",
  },
  {
    name: "Contact",
    slug: "contact",
  },
  {
    slug: "policies",
    name: "Policies",
  },
  {
    name: "Working hours",
    slug: "workingHours",
  },
  {
    slug: "rooms",
    name: "Rooms",
  },
  {
    slug: "localization",
    name: "Localization",
  },
  {
    slug: "reviews",
    name: "Customer reviews",
  },
];
