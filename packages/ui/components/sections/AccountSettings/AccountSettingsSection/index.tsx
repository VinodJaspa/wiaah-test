import { HiChevronDown } from "react-icons/hi";
import { City, Country } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
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
} from "ui";
import { SelectProps } from "../../../partials";

export interface AccountSettingsSectionProps {}

export const AccountSettingsSection: React.FC<AccountSettingsSectionProps> =
  ({}) => {
    const { t } = useTranslation();
    const { uploadImage } = useFileUploadModal();

    function handleProfilePhotoChange() {
      uploadImage();
    }
    return (
      <div className="w-full gap-4 flex flex-col">
        <span className="font-bold text-4xl">{t("account", "Account")}</span>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {t("profile", "Profile")}
          </span>
          <span className="text-slate-500">
            {t(
              "info_public_warn",
              "This inforomation will be displayed publicly so be careful what you share."
            )}
          </span>
        </div>
        <Formik<Partial<UpdateAccouuntSettingsDto>>
          initialValues={{
            country: "Egypt",
            storeFor: [],
          }}
          onSubmit={(data) => {}}
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
                  />
                  <FormikInput
                    label={{
                      translationKey: "last_name",
                      fallbackText: "Last name",
                    }}
                    name="lastName"
                  />
                </div>
                {/* username */}
                <FormikInput
                  name="companyRegisterationNum"
                  label={{
                    translationKey: "company_registration_number",
                    fallbackText: "Company registration number",
                  }}
                />

                <div className="flex flex-col">
                  <span>{t("username", "Username")}</span>
                  <div className="flex rounded-lg items-center border-2 w-fit border-gray-300">
                    <span className="bg-slate-100 border-r-[1px] border-r-slate-300 px-2 w-fit">
                      <span className="text-sm text-slate-500">wiaah.com/</span>
                    </span>
                    <FormikInput className="border-0" name="username" />
                  </div>
                </div>

                {/* profile picture */}

                <div className="gap-1 flex flex-col">
                  <span>{t("photo", "Photo")}</span>
                  <div className="flex gap-2">
                    <MediaUploadModal />
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
                <div className="flex flex-col">
                  <FormikInput
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
                  <FormikInput label={t("address", "Address")} name="email" />
                  <FormikInput
                    label={t("address2", "Address2")}
                    name="address"
                  />
                  <div className="w-full flex flex-col">
                    <span>{t("country", "Country")}</span>
                    <Field
                      as={SearchFilterInput}
                      w={"100%"}
                      placeHolder={t("select_country", "Select Country")}
                      rightElement={<HiChevronDown />}
                      icon={() => {
                        const county = values.country;
                        if (county) {
                          const country = Country.getAllCountries().find(
                            (ctry) => ctry.name === county
                          );
                          if (country) {
                            //@ts-ignore
                            return <FlagIcon code={country.isoCode} />;
                          }
                        }
                      }}
                      name="country"
                      // initialValue={"Egypt"}
                      components={Country.getAllCountries().map(
                        (country, i) => ({
                          name: country.name,
                          value: country.isoCode,
                          comp: (
                            <Prefix
                              //@ts-ignore
                              Prefix={<FlagIcon code={country.isoCode} />}
                            >
                              {country.name}
                            </Prefix>
                          ),
                        })
                      )}
                      onChange={handleChange}
                      value={values.country || ""}
                      onSelection={(value: string) => {
                        const name = Country.getCountryByCode(value)?.name;
                        if (name) {
                          setFieldValue("country", name);
                          setFieldValue("countryCode", value);
                        }
                      }}
                    />
                    <ErrorMessage name="country" />
                  </div>
                  <FormikInput
                    label={t("phone_number", "Phone Number")}
                    name="phoneNumber"
                  />

                  <div className="flex flex-col w-full">
                    <span>{t("city", "City")}</span>
                    <Field
                      as={SearchFilterInput}
                      w={"100%"}
                      name="city"
                      placeHolder={t("select_city", "Select City")}
                      rightElement={<HiChevronDown />}
                      components={City.getCitiesOfCountry(
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
                    <ErrorMessage name="city" />
                  </div>
                  <FormikInput<SelectProps>
                    label={t("shop_type", "Shop Type")}
                    as={Select}
                    onOptionSelect={(v) => setFieldValue("shopType", v)}
                    name="shopType"
                  >
                    {shopTypeOptions.map((opt, i) => (
                      <SelectOption value={opt.value} key={i}>
                        <TranslationText translationObject={opt.name} />
                      </SelectOption>
                    ))}
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
                </div>

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
                                  values.storeFor.filter((v) => v !== opt.value)
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

const storeForOptions: FormOptionType[] = [
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
