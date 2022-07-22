import * as yup from "yup";
import {
  firstNameValidation,
  fullNameValidation,
  knownAsValidation,
  singlePhotoValidation,
  PaginationConstants,
} from "../../../";
console.log("account ", firstNameValidation, PaginationConstants);
export const AccountVerificationRequestScheme = yup.object({
  username: firstNameValidation.required(),
  fullName: fullNameValidation.required(),
  knownAs: knownAsValidation.required(),
  IdPhoto: singlePhotoValidation,
  category: yup.string().required("please select a category"),
});
