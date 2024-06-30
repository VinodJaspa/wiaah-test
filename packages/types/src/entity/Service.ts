import { DiscountUnit, PriceType } from "../";

export type ServicePresentation = {
  original: string;
  thumbnail: string;
  alt?: string;
  type: "image" | "video";
};

export type ServiceType = "event" | "rent";

export interface ServiceData {
  id: string;
  name: string;
  type: ServiceType;
  price: PriceType;
  rating: number;
  reviews: number;
  servicePresentation: ServicePresentation[];
  category: string;
  available: number;
  cashBack: DiscountType;
  shippedToYourCountry: boolean;
  included: string[];
  discount: ServiceDiscount;
  serviceRules: ServiceRules;
  serviceTransport: ServiceTransport;
  propertyDetails: PropertyDetailsType;
  videoConsulition: boolean;
}
export type PropertyDetailsType = {
  size: PropertySizeType;
  residentsCapacity: PropertyResidentsCapacityType;
};
export type PropertyResidentsCapacityType = {
  max: number;
  residentType: ResidentType;
};
export type ResidentType = "children" | "adults";
export type PropertySizeType = {
  inMeter: number;
  inFeet: number;
};

export type TransportType = "automatic" | "manual";
export type TransportTypeOfDevice = "Mobile";

export type ServiceTransport = {
  type: TransportType;
  guests: number;
  seats: number;
  luggageCapacity: number;
  airCondition: boolean;
  typeOfDevice: TransportTypeOfDevice;
  passengers: number;
};

export type ServicePayment = "online" | "cash";

export enum ServicePaymentMethod {
  Cash = "cash",
  Check = "check",
  CreditCard = "credit_card",
  Mastercard = "mastercard",
  Visa = "visa",
}

export type ServiceRules = {
  refundable: boolean;
  payment: ServicePaymentMethod;
};

export type ServiceDiscount = {
  discountedUnits: number;
  discount: DiscountType;
};
export type DiscountType = {
  value: number;
  unit: DiscountUnit;
};
