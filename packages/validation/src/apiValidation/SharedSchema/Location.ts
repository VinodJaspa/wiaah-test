import * as yup from "yup";

export const locationValidationSchema = yup
  .object({
    address: yup.string().required(),
    city: yup.string().required(),
    lat: yup.number().required(),
    lon: yup.number().required(),
    state: yup.string().optional(),
    country: yup.string().required(),
    postalCode: yup.number().required(),
    countryCode: yup.string().required(),
  })
  .required();

export const Location = () => locationValidationSchema;
