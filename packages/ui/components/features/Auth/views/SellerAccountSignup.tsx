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
      },
      { accountType: RegisterAccountType.Seller },
      {
        addLabel: true,
        addPlaceholder: true,
        yupSchema: signUpValidationSchema
      }
    );

    const { isMobile } = useResponsive();
    const [error, setError] = React.useState("");
    const { mutate: Signup, isLoading: isSignupLoading } = useSignupMutation();
    const { mutate: SignIn } = useSigninMutation();

    const submit = () => {
      if (!triggerValidation()) return;

      Signup(form, {
        onSuccess(data) {
          console.log(data, "Signup response");
          toast.success("Signup successful!");
          
          onSuccess()
        },
        onError(err: any) {
          console.log(err ,"errr");
          
          toast.error((err as Error).message || "Something went wrong");
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

        <div className="mt-10">
          <HStack>
            <Input
              {...inputProps("firstName")}
              error={formErrors.firstName}
            />
            <Input
              {...inputProps("lastName")}
              error={formErrors.lastName}
            />
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
              <p className="text-sm text-gray-600 mb-2 pt-4 pb-2">{t("Gender")}</p>
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

          <HStack>
            <Input
              {...inputProps("email")}
              error={formErrors.email}
            />
            <Input
              {...inputProps("phone")}
              error={formErrors.phone}
            />
          </HStack>

          <HStack>
            <Input
              {...inputProps("password")}
              error={formErrors.password}
            />
            <Input
              {...inputProps("confirmPassword")}
              error={formErrors.confirmPassword}
            />
          </HStack>
        </div>

        {showSubmit && (
          <HStack className="justify-end">
            <Button onClick={submit}>{t("Submit")}</Button>
          </HStack>
        )}

        {isMobile ? null : (
          <>
            <p className="font-md text-xl">{t("Profile Picture")}</p>
            <div className="flex flex-col items-center justify-center md:p-0 lg:flex-row lg:p-12">
              <div className="mb-4 justify-center lg:w-4/12">
                <div className="relative h-80 w-80 overflow-hidden rounded-xl lg:h-96 lg:w-96">
                  <img
                    className="h-full w-full object-cover"
                    src={NO_PROFIL_PIC_URL}
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
              <PhotoUploader setImageSrc={setImageSrc} imageSrc={imageSrc} />
            </div>
          </>
        )}
      </div>
    );
  }
);
