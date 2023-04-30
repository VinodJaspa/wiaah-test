import { useForm } from "utils";
import React, { forwardRef, useImperativeHandle } from "react";
import { useSignupMutation } from "../services";
import { AccountGenderEnum, RegisterAccountType } from "@features/API";
import { Button, Divider, HStack, Input, Radio } from "@partials";
import { DateFormInput } from "@blocks";
import { useTranslation } from "react-i18next";
import { MdOutlineClose } from "react-icons/md";
import Webcam from "react-webcam";
import { Field } from "formik";

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
      }
    );

    const [error, setError] = React.useState("");

    const { mutate: Signup } = useSignupMutation();

    const submit = () =>
      Signup(form, {
        onSuccess(data, variables, context) {
          console.log("success");
          onSuccess();
        },

        onError: (err) => {
          const _err = err as Error;
          setError(_err.message);
        },
      });

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-2xl">{t("Basic Informations")}</p>
        <HStack>
          <Input {...inputProps("firstName")} />
          <Input {...inputProps("lastName")} />
        </HStack>
        <Input {...inputProps("username")} />
        <Input {...inputProps("email")} />
        <Input {...inputProps("phone")} />
        <Input {...inputProps("password")} />
        <Input {...inputProps("confirmPassword")} />
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
        {showSubmit ? (
          <HStack className="justify-end">
            <Button onClick={submit}>{t("Submit")}</Button>
          </HStack>
        ) : null}
        <p className="font-semibold text-xl">Profile Picture</p>
        <div className="flex  flex-col items-center justify-center md:p-0 lg:flex-row lg:p-12">
          <div className="mb-4 justify-center lg:w-4/12">
            <div className="relative h-80 w-80 overflow-hidden rounded-xl lg:h-96 lg:w-96">
              <>
                <img
                  className="h-full w-full object-cover"
                  src={NO_PROFIL_PIC_URL}
                  alt=""
                />
                {/* {!(profilePicSrc == NO_PROFIL_PIC_URL) && (
                <div
                  onClick={() => {
                    // setProfilePicSrc(NO_PROFIL_PIC_URL);
                  }}
                  className="absolute left-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black"
                >
                  <MdOutlineClose className="text-xl text-white" />
                </div> */}
                {/* )} */}
              </>
            </div>
          </div>
          <Input
            type="file"
            hidden
            onChange={(e: any) => {}}
            name="photo"
            accept="image/png, image/jpeg"
          />
          <div className="w-full justify-center px-4 lg:w-full">
            <div className="flex flex-col items-center cursor-pointer justify-center">
              <Button
                className={`w-[min(100%,15rem)] rounded-full`}
                onClick={() => {}}
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
                onClick={() => {}}
              >
                {t("Take_a_Photo", "Take a Photo")}
              </Button>
              <div className="hidden text-center text-gray-500 lg:block">
                {t("with your webcam")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
