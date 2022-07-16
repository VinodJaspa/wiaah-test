import * as yup from "yup";

export const locationValidationSchema = yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  cords: yup.object().shape({
    lat: yup.number().required(),
    lng: yup.number().required(),
  }),
  county: yup.string().required(),
  postalCode: yup.number().required(),
});
