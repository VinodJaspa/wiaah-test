import * as yup from "yup";

export const firstNameValidation = yup.string().min(3).max(15);

export const lastNameValidation = yup.string().min(3).max(15);

export const emailValidation = yup.string().email();

export const usernameValidation = yup.string().min(3).max(15);

export const fullNameValidation = yup.string().min(6).max(50);

export const knownAsValidation = yup.string().min(3);

export const singleFileValidation = yup
  .mixed()
  .test("singleFile", "please only provide 1 file", (value: FileList) => {
    if (!value || !value.length || value.length > 1) return false;
    return true;
  });

export const singlePhotoValidation = singleFileValidation.test(
  "imageType",
  "please provide an image",
  (value: FileList) => {
    if (!value || !value.length) return false;
    if (!value[0].type.includes("image")) return false;
    return true;
  }
);
