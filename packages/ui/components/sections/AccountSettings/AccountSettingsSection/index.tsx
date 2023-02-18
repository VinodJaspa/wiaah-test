import { HiChevronDown } from "react-icons/hi";
import { countries, getCountryByCode, getCitiesOfCountry } from "utils";
import { Form, Formik } from "formik";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import {
  FormOptionType,
  TranslationTextType,
  UpdateAccouuntSettingsDto,
} from "types";
import {
  FormikInput,
  Button,
  SearchFilterInput,
  Prefix,
  TranslationText,
  useFileUploadModal,
  MediaUploadModal,
  Select,
  SelectOption,
  Checkbox,
  Textarea,
  Divider,
  Avatar,
  SelectProps,
  SectionHeader,
  InputGroup,
  InputLeftElement,
  DateFormInput,
  useGetAccountSettingsQuery,
  useUpdateAccountSettingsMutation,
  PhoneNumberInput,
} from "@UI";
import { useAccountType } from "hooks";
import { accountTypes } from "@UI";

export interface AccountSettingsSectionProps {
  variant?: "seller" | "buyer";
  accountId?: string;
}

export const AccountSettingsSection: React.FC<AccountSettingsSectionProps> = ({
  variant = "seller",
  accountId,
}) => {
  // if(accountId)
  const isBuyer = variant === "buyer";
  const isSeller = variant === "seller";
  const { t } = useTranslation();
  const { uploadImage } = useFileUploadModal();
  const { data } = useGetAccountSettingsQuery();
  const { mutate } = useUpdateAccountSettingsMutation();

  function handleProfilePhotoChange() {
    uploadImage();
  }
  return (
    <div className="w-full gap-4 flex flex-col">
      <SectionHeader sectionTitle={t("account", "Account")} />
      <div className="flex flex-col">
        <span className="text-xl font-semibold">{t("profile", "Profile")}</span>
        <span className="text-slate-500">
          {t(
            "info_public_warn",
            "This inforomation will be displayed publicly so be careful what you share."
          )}
        </span>
      </div>
      <Formik<UpdateAccouuntSettingsDto>
        initialValues={
          data || {
            address: "",
            address2: "",
            bio: "",
            brandDescription: "",
            city: "",
            clientType: "individual",
            country: "",
            countryCode: "",
            email: "",
            firstName: "",
            language: "",
            lastName: "",
            phoneNumber: "",
            photoSrc: "",
            storeFor: [],
            username: "",
            shopType: "",
          }
        }
        onSubmit={(data) => {
          mutate(data);
        }}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form>
            <div className="w-full flex flex-col gap-4">
              {/* first and last name */}
              <div className="grid w-full gap-8 grid-cols-1 sm:grid-cols-2">
                <FormikInput
                  label={{
                    fallbackText: "First name",
                    translationKey: "first_name",
                  }}
                  name="firstName"
                  data-testid="FirstnameInput"
                />
                <FormikInput
                  label={{
                    translationKey: "last_name",
                    fallbackText: "Last name",
                  }}
                  name="lastName"
                  data-testid="LastnameInput"
                />
              </div>
              {/* username */}
              {isBuyer && (
                <FormikInput
                  name="typeOfAccount"
                  as={Select}
                  data-testid="ClientTypeInput"
                  placeholder={t("type_of_account", "Type Of Account") + "*"}
                >
                  {accountTypes.map(({ value, name }, i) => (
                    <SelectOption key={value + i} value={value}>
                      {typeof name === "object" &&
                        t(name.translationKey, name.fallbackText)}
                    </SelectOption>
                  ))}
                </FormikInput>
              )}
              {isSeller && (
                <FormikInput
                  name="companyRegisterationNum"
                  data-testid="CompanyRegisterationNumber"
                  label={{
                    translationKey: "company_registration_number",
                    fallbackText: "Company registration number",
                  }}
                />
              )}

              <div className="flex flex-col">
                <span>{t("username", "Username")}</span>
                <InputGroup className="flex rounded-lg items-center border-2 w-fit border-gray-300">
                  <InputLeftElement>
                    <span className="bg-slate-100 border-r-[1px] border-r-slate-300 w-fit">
                      <span className="text-sm text-slate-500">wiaah.com/</span>
                    </span>
                  </InputLeftElement>
                  <FormikInput
                    data-testid="username"
                    className="border-0"
                    name="username"
                  />
                </InputGroup>
              </div>

              {/* profile picture */}

              <div className="gap-1 flex flex-col">
                <span>{t("photo", "Photo")}</span>
                <div className="flex gap-2">
                  <MediaUploadModal
                    onImgUpload={(_, raw) =>
                      raw ? setFieldValue("profilePhoto", raw) : null
                    }
                  />
                  <Avatar photoSrc="/wiaah_logo.png" />
                  <Button
                    className="bg-white border-gray-200 text-sm"
                    colorScheme="gray"
                    outline
                    onClick={handleProfilePhotoChange}
                  >
                    {t("change", "change")}
                  </Button>
                  <Button
                    className="bg-white border-gray-50 text-sm"
                    colorScheme="gray"
                    outline
                  >
                    {t("remove", "remove")}
                  </Button>
                </div>
              </div>

              {/* bio  */}
              {isSeller && (
                <div className="flex flex-col">
                  <FormikInput
                    data-test="BioInput"
                    label={t("bio", "Bio")}
                    className="thinScroll"
                    as={Textarea}
                    name="bio"
                  />
                  <span className="text-slate-500" color={"slategray"}>
                    {t(
                      "brief_descrption",
                      "Brief Description for your profile, URLs are hyperlinked"
                    )}
                  </span>
                </div>
              )}

              {/* personal inforomation */}
              <div className="flex flex-col">
                <span className="text-xl font-semibold">
                  {t("personal_information", "Personal Information")}
                </span>
                <span className="text-slate-500" color="slategray">
                  {t(
                    "info_public_warn",
                    "This inforomation will be displayed publicly so be careful what you share."
                  )}
                </span>
              </div>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                <FormikInput
                  data-testid="address1Input"
                  label={t("Address")}
                  name="email"
                />
                <FormikInput
                  data-testid="address2Input"
                  label={t("Address2")}
                  name="address"
                />
                <div className="w-full flex flex-col">
                  <FormikInput
                    label={t("Country")}
                    as={SearchFilterInput}
                    w={"100%"}
                    placeHolder={t("select_country", "Select Country")}
                    rightElement={<HiChevronDown />}
                    icon={() => {
                      const county = values.country;
                      if (county) {
                        const country = countries.find(
                          (ctry) => ctry.name === county
                        );
                        if (country) {
                          //@ts-ignore
                          return <FlagIcon code={country.isoCode} />;
                        }
                      }
                    }}
                    name="country"
                    components={countries.map((country, i) => ({
                      name: country.name,
                      value: country.isoCode,
                      comp: (
                        <Prefix
                          // @ts-ignore
                          Prefix={<FlagIcon code={country.isoCode} />}
                        >
                          {country.name}
                        </Prefix>
                      ),
                    }))}
                    onChange={handleChange}
                    value={values.country || ""}
                    onSelection={(value: string) => {
                      const name = getCountryByCode(value)?.name;
                      if (name) {
                        setFieldValue("country", name);
                        setFieldValue("countryCode", value);
                      }
                    }}
                  />
                </div>
                <FormikInput
                  data-testid="PhoneNumberInput"
                  label={t("Phone Number")}
                  name="phoneNumber"
                  as={PhoneNumberInput}
                />

                <div className="flex flex-col w-full">
                  <FormikInput
                    as={SearchFilterInput}
                    label={"City"}
                    w={"100%"}
                    name="city"
                    placeHolder={t("select_city", "Select City")}
                    rightElement={<HiChevronDown />}
                    components={getCitiesOfCountry(
                      values.countryCode || ""
                    )?.map((city, i) => ({
                      name: city.name,
                      value: city.name,
                      comp: (
                        <Prefix
                          //@ts-ignore
                          prefix={<span>{city.stateCode}</span>}
                        >
                          {city.name}
                        </Prefix>
                      ),
                    }))}
                    onChange={handleChange}
                    value={values.city || ""}
                    onSelection={(value: string) => {
                      if (value) {
                        setFieldValue("city", value);
                      }
                    }}
                  />
                </div>
                {isBuyer && (
                  <>
                    <FormikInput
                      label={t("height", "Height")}
                      name="height"
                      placeholder={t("height", "Height") + "*"}
                    />
                    <FormikInput
                      label={t("weight", "Weight")}
                      name="weight"
                      placeholder={t("Weight", "Weight") + "*"}
                    />
                    <FormikInput
                      as={Select}
                      name="gender"
                      label={t("gender", "Gender")}
                      placeHolder={t("select_gender", "Select Gender")}
                    >
                      <SelectOption value="male">
                        {t("Male", "Male")}
                      </SelectOption>
                      <SelectOption value="female">
                        {t("Femal", "Female")}
                      </SelectOption>
                    </FormikInput>
                    <FormikInput
                      placeholder={t("date_of_birth", "Date Of Birth")}
                      name="DateOfBirth"
                      as={DateFormInput}
                    />
                  </>
                )}
                {isSeller && (
                  <>
                    <FormikInput<SelectProps>
                      as={Select}
                      name="shopType"
                      label={t("Shop Type")}
                      placeholder={t("Select Type of Shop")}
                      onOptionSelect={(v) => setFieldValue("shopType", v)}
                      className=" w-full "
                    >
                      <SelectOption value="prodcuts">
                        {t("Products Shop")}
                      </SelectOption>
                      <SelectOption value="services">
                        {t("Services Shop")}
                      </SelectOption>
                    </FormikInput>

                    <FormikInput<SelectProps>
                      onOptionSelect={(v) => setFieldValue("clientType", v)}
                      label={t("client_type", "Client Type")}
                      as={Select}
                      name="clientType"
                    >
                      <SelectOption value="professional">
                        {t("professional", "Professional")}
                      </SelectOption>
                      <SelectOption value="individual">
                        {t("individual", "Individual")}
                      </SelectOption>
                    </FormikInput>
                    {values["shopType"] === "services" ? (
                      <FormikInput<SelectProps>
                        name={"serviceType"}
                        as={Select}
                        label={t("Select Your Service Type")}
                        onOptionSelect={(v) => setFieldValue("serviceType", v)}
                        placeholder={t("Choose Service Type")}
                      >
                        <SelectOption value="holiday_rentals">
                          {t("Holiday Rentals")}
                        </SelectOption>
                        <SelectOption value="hotel">{t("Hotel")}</SelectOption>
                        <SelectOption value="restaurant">
                          {t("Restaurant")}
                        </SelectOption>
                        <SelectOption value="health_center">
                          {t("Health Center")}
                        </SelectOption>
                        <SelectOption value="beauty_center">
                          {t("Beauty Center")}
                        </SelectOption>
                        <SelectOption value="Vehicle_center">
                          {t("Vehicle Center")}
                        </SelectOption>
                      </FormikInput>
                    ) : null}
                  </>
                )}
              </div>
              {isSeller && (
                <>
                  <div className="flex gap-4">
                    <span>{t("store_for", "Store For")}</span>
                    <div className="grid grid-cols-4 gap-x-2">
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          checked={(() => {
                            if (values.storeFor) {
                              return storeForOptions.every((opt) => {
                                if (!values.storeFor) return false;
                                const idx = values.storeFor.findIndex(
                                  (value) => value === opt.value
                                );
                                return idx > -1;
                              });
                            } else {
                              return false;
                            }
                          })()}
                          onChange={(e) =>
                            e.target.checked
                              ? setFieldValue("storeFor", [
                                  ...storeForOptions.map((opt) => opt.value),
                                ])
                              : setFieldValue("storeFor", [])
                          }
                        />
                        <span>{t("all", "All")}</span>
                      </div>
                      {storeForOptions.map((opt, i) => (
                        <div className="flex gap-2 items-center">
                          <Checkbox
                            checked={(() => {
                              if (values.storeFor) {
                                const idx = values.storeFor.findIndex(
                                  (v) => v === opt.value
                                );
                                if (idx > -1) {
                                  return true;
                                } else {
                                  return false;
                                }
                              } else {
                                return false;
                              }
                            })()}
                            onChange={(e) => {
                              if (e.target.checked && values.storeFor) {
                                setFieldValue("storeFor", [
                                  ...values.storeFor,
                                  opt.value,
                                ]);
                              } else {
                                if (values.storeFor) {
                                  setFieldValue(
                                    "storeFor",
                                    values.storeFor.filter(
                                      (v) => v !== opt.value
                                    )
                                  );
                                }
                              }
                            }}
                          />
                          <TranslationText translationObject={opt.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <FormikInput
                      resize="none"
                      className="thinScroll"
                      as={Textarea}
                      label={t("brand_description", "Brand Description")}
                      name="brandDescription"
                    />
                    <span className="text-slate-500" color={"slategray"}>
                      {t(
                        "brief_brand_descrption",
                        "Brief Description for your brand, URLs are hyperlinked"
                      )}
                    </span>
                  </div>
                </>
              )}
              <span className="text-slate-500" color="slategray">
                {t(
                  "this_account_was_created_on",
                  "This account was created on"
                )}{" "}
                {new Date(Date.now()).toLocaleString("en", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </span>
              <Divider className="my-2" />
              <div className="flex gap-4 w-full items-center justify-end">
                <Button colorScheme="gray" outline>
                  {t("cancel", "Cancel")}
                </Button>
                <Button colorScheme="gray" type="submit">
                  {t("save", "Save")}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const storeForOptions: FormOptionType[] = [
  {
    name: {
      translationKey: "men",
      fallbackText: "Men",
    },
    value: "men",
  },
  {
    name: {
      translationKey: "women",
      fallbackText: "Women",
    },
    value: "women",
  },
  {
    name: {
      translationKey: "children",
      fallbackText: "Children",
    },
    value: "children",
  },
  {
    name: {
      translationKey: "babies",
      fallbackText: "Babies",
    },
    value: "babies",
  },
];

const shopTypeOptions: {
  value: string;
  name: TranslationTextType;
}[] = [
  {
    value: "clothes",
    name: {
      fallbackText: "Clothes",
      translationKey: "clothes",
    },
  },
];
