import * as yup from "yup";

export const locationValidationSchema = yup
  .object({
    address: yup.string().required(),
    city: yup.string().required(),
    cords: yup.object({
      lat: yup.number().required(),
      lng: yup.number().required(),
    }),
    state: yup.string().optional(),
    country: yup.string().required(),
    postalCode: yup.number().required(),
    countryCode: yup.string().required(),
  })
  .required();

export const Location = () => locationValidationSchema;
