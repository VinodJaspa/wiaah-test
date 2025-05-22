import { signUpValidationSchema, useForm } from "utils";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useSigninMutation, useSignupMutation } from "../services";
import { AccountGenderEnum, RegisterAccountType } from "@features/API";
import {
  Button,
  CameraOutlineIcon,
  Divider,
  HStack,
  ImageOutlineIcon,
  Input,
  Radio,
} from "@partials";
import { DateFormInput } from "@blocks";
import { useTranslation } from "react-i18next";
import { useResponsive } from "@src/index";

import * as yup from "yup";
import PhotoUploader from "./PhotoUpload";
import { toast } from "react-toastify";
import { from } from "rxjs";

const NO_PROFIL_PIC_URL = "/person-icon.png";
export const AccountSignup = forwardRef(
  (
    {
      onSuccess,
      showSubmit,
    }: {
      onSuccess: () => any;
      showSubmit?: boolean;
    },
    ref
  ) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { t } = useTranslation();
    const { inputProps, dateInputProps, form, handleChange, formErrors, triggerValidation } = useForm<
      Parameters<typeof Signup>[0]
    >(
      {
        accountType: RegisterAccountType.Seller,
        birthDate: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        gender: AccountGenderEnum.Male,
        phone: ""

      },
      { accountType: RegisterAccountType.Seller },
      {
        addLabel: true,
        addPlaceholder: true,
        yupSchema: signUpValidationSchema
      }
    );

    const { isMobile } = useResponsive();

    const { mutate: Signup, isLoading: isSignupLoading } = useSignupMutation();
    const { mutate: SignIn } = useSigninMutation();

    const submit = () => {
      
      if (!triggerValidation()) return;
      Signup(form, {
        
        onSuccess(data) {
          // Call SignIn mutation here
          SignIn({ email: form.email, password: form.password }, {
            onSuccess(loginData) {
              onSuccess();
            },
            onError(err: any) {
              console.log(err, "Signin error");
              toast.error((err as Error).message || "Oops! somethhing went wrong!");
            }
          });
        },
        onError(err: any) {
          console.log(err, "Signup error");
          toast.error((err as Error).message || "Signup failed");
        }
      });
    };

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col gap-4 mx-auto">
        <p className="lg:text-md text-lg font-semibold border-b border-primary pb-4">
          {t("Basic Informations")}
        </p>
        <div className="mt-2">
          <HStack className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            <div className="w-full">
              <Input {...inputProps("firstName")} error={formErrors.firstName} />
            </div>
            <div className="w-full">
              <Input {...inputProps("lastName")} error={formErrors.lastName} />
            </div>
          </HStack>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <DateFormInput
                className="w-full"
                {...dateInputProps("birthDate")}
                error={formErrors.birthDate}
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-600 mb-2 pt-2 pb-2">{t("Gender")}</p>
              <div className="flex flex-row gap-4 flex-wrap">
                {Object.values(AccountGenderEnum)
                  .reverse()
                  .map((v, i) => (
                    <Radio
                      name="gender"
                      checked={form.gender === v}
                      onChange={(e) =>
                        e.target.checked ? handleChange("gender", v) : null
                      }
                      key={v + i}
                    >
                      {v}
                    </Radio>
                  ))}
              </div>
              {formErrors.gender && (
                <p className="text-sm text-red-500">{formErrors.gender}</p>
              )}
            </div>
          </div>

          <HStack className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            <div className="w-full">
              <Input {...inputProps("email")} error={formErrors.email} />
            </div>
            <div className="w-full">
              <Input {...inputProps("phone")} error={formErrors.phone} />
            </div>
          </HStack>

          <HStack className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            <div className="w-full">
              <Input {...inputProps("password")} error={formErrors.password} />
            </div>
            <div className="w-full">
              <Input
                {...inputProps("confirmPassword")}
                error={formErrors.confirmPassword}
              />
            </div>
          </HStack>
        </div>


        {showSubmit && (
          <HStack className="justify-end">
            <Button onClick={submit}>{t("Submit")}</Button>
          </HStack>
        )}
        <>
          <p className="font-md text-xl">{t("Profile Picture")}</p>
          <div className="flex flex-col items-center justify-center md:p-0 lg:flex-row lg:p-12">
            <div className="mb-4 justify-center lg:w-4/12">
              <div className="relative h-80 w-80 overflow-hidden rounded-xl lg:h-96 lg:w-96">
                <img
                  className="h-full w-full object-cover"
                  src={imageSrc ?? NO_PROFIL_PIC_URL}
                  alt=""
                />
              </div>
            </div>
            <Input
              type="file"
              hidden
              onChange={() => { }}
              name="photo"
              accept="image/png, image/jpeg"
            />
            <PhotoUploader handleChange={handleChange} setImageSrc={setImageSrc} imageSrc={imageSrc} />
          </div>
        </>

      </div>
    );
  }
);
