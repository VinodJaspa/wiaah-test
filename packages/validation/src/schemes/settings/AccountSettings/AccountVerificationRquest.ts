import * as yup from "yup";
import {
  firstNameValidation,
  fullNameValidation,
  knownAsValidation,
  singlePhotoValidation,
} from "../../../index";

export const AccountVerificationRequestScheme = yup.object().shape({
  username: firstNameValidation.required(),
  fullName: fullNameValidation.required(),
  knownAs: knownAsValidation.required(),
  IdPhoto: singlePhotoValidation,
  category: yup.string().required("please select a category"),
});
