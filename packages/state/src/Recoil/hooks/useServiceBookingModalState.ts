import { useRecoilState } from "recoil";
import { ServiceBookingModalState } from "../";
export const useServiceBookingModal = () => {
  const [modalState, setModalState] = useRecoilState(ServiceBookingModalState);

  function openBookRange() {
    setModalState("rent");
  }
  function openBookEvent() {
    setModalState("event");
  }
  function closeBooking() {
    setModalState(null);
  }

  return {
    modalState,
    openBookRange,
    openBookEvent,
    closeBooking,
  };
};
