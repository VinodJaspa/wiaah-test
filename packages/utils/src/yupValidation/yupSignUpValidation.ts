import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
    birthDate: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .required("Birth Date is required")
    .max(new Date(), "Birth Date cannot be in the future"),
  
  accountType: yup
    .string()
    .oneOf(["buyer", "seller"], "Account Type must be buyer or seller")
    .required("Account Type is required"),
});


