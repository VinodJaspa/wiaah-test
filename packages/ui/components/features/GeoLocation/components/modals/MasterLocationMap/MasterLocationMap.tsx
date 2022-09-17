import { useResponsive } from "hooks";
import React from "react";
import { useReactPubsub } from "react-pubsub";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  RenderMap,
  ModalCloseButton,
  CloseIcon,
  useSetMapLocationsState,
  LocationSearchInput,
  ScrollingWrapper,
  HotelsSearchList,
} from "ui";

export type MasterLocationData = {
  id: string;
  searchType: "prodcut" | "service" | "place";
  additionalFilters?: Record<string, any>;
};

export const useMasterLocationMapModal = (props?: {
  subToChanges?: boolean;
}) => {
  const subToChanges = props?.subToChanges;
  const [location, setLocation] = React.useState<MasterLocationData[]>();
  const { Listen, emit, removeListner } = useReactPubsub(
    () => "MasterLocationMapSearch"
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
    location,
    CloseMap,
    SearchForLocation,
  };
};

export const MasterLocationMapModal: React.FC = () => {
  const { location, CloseMap } = useMasterLocationMapModal({
    subToChanges: true,
  });

  const { isTablet } = useResponsive();
  return (
    <Modal isOpen={true} onClose={CloseMap}>
      <ModalOverlay />
      <ModalContent className="w-[100vw] rounded-[0px] max-h-[fit-content] h-[100vh]">
        <div className="w-full h-full relative">
          <div className="flex p-4 flex-col gap-2">
            <span className="w-full md:w-1/2">
              <LocationSearchInput onLocationSelect={() => {}} />
            </span>
            <div className="w-full relative pb-40 md:pb-0 flex-col-reverse md:flex-row h-auto md:h-[75vh] flex gap-8 md:gap-4 justify-between">
              <div className="w-full absolute bottom-0 left-0 z-50 md:static md:w-full md:h-full">
                <ScrollingWrapper horizonatal={isTablet}>
                  <HotelsSearchList />
                </ScrollingWrapper>
              </div>
              <div className="w-full h-[75vh] md:h-auto">
                <RenderMap />
              </div>
            </div>
          </div>

          <ModalCloseButton>
            <div
              onClick={() => CloseMap()}
              className="cursor-pointer absolute bg-black text-white text-2xl bg-opacity-25 rounded-xl p-2 top-4 right-4"
            >
              <CloseIcon />
            </div>
          </ModalCloseButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
