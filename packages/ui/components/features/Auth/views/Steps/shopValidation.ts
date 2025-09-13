import * as Yup from "yup";

export const shopValidationSchema = Yup.object().shape({
  businessType: Yup.string()
    .oneOf(["shop", "services"])
    .required("Business type is required"),

  collaborationType: Yup.string()
    .oneOf(["company", "individual"])
    .required("Account type is required"),

  storeType: Yup.string()
    .oneOf(["product", "service"])
    .required("Store type is required"),

  type: Yup.string().when("businessType", {
    is: "services",
    then: (schema) => schema.required("Service type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  category: Yup.string().when("businessType", {
    is: "shop",
    then: (schema) => schema.required("Category is required"),
  }),

  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^[0-9]{4,10}$/, "Invalid postal code"),
  country: Yup.string().required("Country is required"),

  companyName: Yup.string().when("collaborationType", {
    is: "company",
    then: (schema) => schema.required("Company Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number"),

  vatId: Yup.string().nullable(),

  members: Yup.array().when("collaborationType", {
    is: "company",
    then: (schema) =>
      schema.of(
        Yup.object().shape({
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          birthDate: Yup.date()
            .required("Birth date is required")
            .max(new Date(), "Birth date cannot be in the future"),
          idNumber: Yup.string().required("ID number is required"),
          idExpiration: Yup.date()
            .required("ID expiration is required")
            .min(new Date(), "ID must be valid in the future"),
          phone: Yup.string()
            .required("Member phone is required")
            .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
          address: Yup.string().required("Address is required"),
          city: Yup.string().required("City is required"),
          state: Yup.string().required("State is required"),
          postalCode: Yup.string().required("Postal code is required"),
          country: Yup.string().required("Country is required"),
        })
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
});
