export type ServiceType =
  | "placeBooking"
  | "restaurant"
  | "healthCenter"
  | "beautyCenter"
  | "holidayRentals"
  | "Vehicle";
export type CancelFees = "free" | "paid";
export type ParkingAvailablity = "no" | "yes-free" | "yes-paid";
export type ReservationOptions = "needed" | "not-needed";
export type BreakFastAvailablity = "no" | "yes-included" | "yes-optional";

export interface AddNewServiceDto {
  type: ServiceType;
  name: string;
  address: string;
  images: File[];
  videos: File[];
  description: string;
  numOfStars: number;
  metaTagDescription: string;
  metaTagKeyword: string;
  serviceTag: string;
  priceByNight: number;
  category: string;
  quantity: number;
  hashtags: string[];
  deposit: boolean;
  depositAmount?: number;
  cancelFees: CancelFees;
  cancelFeesAmount?: number;
  // parkingAvailbality: ParkingAvailablity;
  // parkingPublic?: boolean;
  // reservationNeeded: ReservationOptions;
  // breakfastAvailablity: BreakFastAvailablity;
}
