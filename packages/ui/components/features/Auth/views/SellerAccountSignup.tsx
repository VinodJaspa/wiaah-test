import { useForm } from "utils";
import React, { forwardRef, useImperativeHandle } from "react";
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
  const { t } = useTranslation();
    const { inputProps, dateInputProps, form, handleChange } = useForm<
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
        yupSchema: yup.object({
          email: yup.string().email().required(),
          firstName: yup.string().min(3).max(20),
          lastName: yup.string().min(3).max(20),
          password: yup.string().min(6).max(30),
          gender: yup
            .string()
            .oneOf([AccountGenderEnum.Female, AccountGenderEnum.Male])
            .required(),
          confirmPassword: yup
            .string()
            .oneOf(
              [yup.ref("password"), null],
              "confirm password and password does'nt match!"
            )
            .required("Required"),
        }),
      }
    );

    const { isMobile } = useResponsive();
    const [error, setError] = React.useState("");

    const { mutate: Signup } = useSignupMutation();
    const { mutate: SignIn } = useSigninMutation();

    const submit = () => {
      Signup(form, {
        onSuccess(data, variables, context) {
          SignIn(
            { email: variables.email, password: variables.password },
            { onSuccess }
          );
        },

        onError: (err) => {
          const _err = err as Error;
          setError(_err.message);
        },
      });
    };

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="border-b border-primary text-lg w-fit font-semibold">
            {t("Profile Image")}
          </p>

          <div className="bg-darkerGray self-center w-40 h-40 rounded-full flex justify-center items-center">
            <ImageOutlineIcon className="text-9xl text-iconGray" />
          </div>
          <div className="flex flex-col gap-4">
            <Button colorScheme="darkbrown">
              <HStack className="text-white justify-center">
                <ImageOutlineIcon className="text-2xl" />
                <p className="text-sm">{t("Upload from gallery")}</p>
              </HStack>
            </Button>
            <Button outline colorScheme="darkbrown">
              <HStack className="text-black justify-center">
                <CameraOutlineIcon className="text-2xl" />
                <p className="text-sm">{t("Capture with camera")}</p>
              </HStack>
            </Button>
          </div>
        </div>
        <p className="lg:text-2xl text-lg font-semibold border-b border-primary">
          {t("Basic Informations")}
        </p>
        <HStack>
          <Input {...inputProps("firstName")} />
          <Input {...inputProps("lastName")} />
        </HStack>
        <DateFormInput {...dateInputProps("birthDate")} />
        <div>
          <p className="font-semibold text-lg">{t("Gender")}</p>
          <HStack>
            {Object.values(AccountGenderEnum)
              .reverse()
              .map((v, i) => (
                <Radio
                  name={"gender"}
                  checked={form.gender === v}
                  onChange={(e) =>
                    e.target.checked ? handleChange("gender", v) : null
                  }
                  key={v + i}
                >
                  {v}
                </Radio>
              ))}
          </HStack>
        </div>
        <Input {...inputProps("email")} />
        <Input {...inputProps("phone")} />
        <Input {...inputProps("password")} />
        <Input {...inputProps("confirmPassword")} />
        {showSubmit ? (
          <HStack className="justify-end">
            <Button onClick={submit}>{t("Submit")}</Button>
          </HStack>
        ) : null}
        {isMobile ? null : (
          <>
            <p className="font-semibold text-xl">{t("Profile Picture")}</p>
            <div className="flex  flex-col items-center justify-center md:p-0 lg:flex-row lg:p-12">
              <div className="mb-4 justify-center lg:w-4/12">
                <div className="relative h-80 w-80 overflow-hidden rounded-xl lg:h-96 lg:w-96">
                  <>
                    <img
                      className="h-full w-full object-cover"
                      src={NO_PROFIL_PIC_URL}
                      alt=""
                    />
                  </>
                </div>
              </div>
              <Input
                type="file"
                hidden
                onChange={(e: any) => { }}
                name="photo"
                accept="image/png, image/jpeg"
              />
              <div className="w-full justify-center px-4 lg:w-full">
                <div className="flex flex-col items-center cursor-pointer justify-center">
                  <Button
                    className={`w-[min(100%,15rem)] rounded-full`}
                    onClick={() => { }}
                  >
                    {t("Upload_a_photo", "Upload a photo")}
                  </Button>
                  <div className="hidden text-center text-gray-500 lg:block">
                    {t("From_your_computer", "From your computer")}
                  </div>
                </div>
                <Divider className="my-4" />
                <div className="w-full flex flex-col items-center cursor-pointer justify-center">
                  <Button
                    className={`w-[min(100%,15rem)] rounded-full`}
                    onClick={() => { }}
                  >
                    {t("Take_a_Photo", "Take a Photo")}
                  </Button>
                  <div className="hidden text-center text-gray-500 lg:block">
                    {t("with your webcam")}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
