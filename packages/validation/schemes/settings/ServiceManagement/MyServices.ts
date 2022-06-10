import {
  AddNewServiceDto,
  BreakFastAvailablity,
  CancelFees,
  ParkingAvailablity,
  ReservationOptions,
  ServiceType,
} from "dto";
import * as yup from "yup";
import { TypeOf } from "yup";

export const NewServiceSchemas = {
  serviceTypeSchema: yup.object().shape({
    type: yup
      .string()
      .oneOf<ServiceType>(["placeBooking", "rendez-vous", "thingsRenting"])
      .required(),
  }),
  serviceGeneralDetailsSchema: yup.object().shape<Partial<AddNewServiceDto>>({
    address: yup.string().required(),
    breakfastAvailablity: yup
      .string()
      .oneOf<BreakFastAvailablity>(["no", "yes-included", "yes-optional"])
      .required(),
    cancelFees: yup.string().oneOf<CancelFees>(["free", "paid"]).required(),
    cancelFeesAmount: yup.number(),
    category: yup.array().of(yup.string()).required(),
    deposit: yup.boolean(),
    depositAmount: yup.number(),
    description: yup.string().min(20).max(1000),
    hashtags: yup.string(),
    images: yup.mixed(),
    metaTagDescription: yup.string().min(5).max(100).required(),
    metaTagKeyword: yup.string().required(),
    name: yup.string().required(),
    numOfStars: yup.number().required(),
    parkingAvailability: yup
      .string()
      .oneOf<ParkingAvailablity>(["no", "yes-free", "yes-paid"])
      .required(),
    parkingPublic: yup.boolean(),
    priceByNight: yup.number().required(),
    quantity: yup.number(),
    reservationNeeded: yup
      .string()
      .oneOf<ReservationOptions>(["needed", "not-needed"]),
    serviceTag: yup.string().required(),
    videos: yup.mixed(),
  }),
  includedServices: yup.object().shape({
    services: yup.array().of(yup.string()).required(),
  }),
  extraSreivce: yup.object().shape({
    extraBeds: yup.boolean().required(),
    numOfBedsCanBeAdded: yup.number(),
    extraBedsAccommodate: yup
      .array()
      .of(yup.string().oneOf(["adults", "children", "children-2years"])),
    pricePerNight: yup.number(),
  }),
  discount: yup.object().shape({
    percentOff: yup.number().required(),
    startDate: yup.string().required(),
    expireDate: yup.string().required(),
  }),
};
