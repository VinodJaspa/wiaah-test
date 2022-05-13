import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputProps,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { City, Country } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import {
  TranslationText as TranslationTextType,
  UpdateAccouuntSettingsDto,
} from "types";
import { useFileUploadModal, MediaUploadModal } from "ui";
import { SearchFilterInput } from "../../../blocks";
import { Prefix, TranslationText } from "../../../partials";

export interface AccountSettingsSectionProps {}

export const AccountSettingsSection: React.FC<AccountSettingsSectionProps> =
  ({}) => {
    const { t } = useTranslation();
    const { uploadImage } = useFileUploadModal();

    function handleProfilePhotoChange() {
      uploadImage();
    }
    return (
      <Flex w="100%" gap="1rem" direction={"column"} px="1rem">
        <Text fontSize={"xx-large"} fontWeight="bold">
          {t("account", "Account")}
        </Text>
        <Flex direction={"column"}>
          <Text fontSize={"lg"} fontWeight="semibold">
            {t("profile", "Profile")}
          </Text>
          <Text color="slategray">
            {t(
              "info_public_warn",
              "This inforomation will be displayed publicly so be careful what you share."
            )}
          </Text>
        </Flex>
        <Formik<Partial<UpdateAccouuntSettingsDto>>
          initialValues={{
            country: "Egypt",
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({
            isSubmitting,
            handleBlur,
            handleChange,
            values,
            setFieldValue,
          }) => (
            <Form>
              <Flex w="100%" direction={"column"} gap="1rem">
                {/* first and last name */}
                <SimpleGrid columns={2} gap="2rem" w="100%">
                  <Flex direction={"column"}>
                    <Text fontWeight={"semibold"}>
                      {t("first_name", "First name")}
                    </Text>
                    <Field as={Input} name="firstName" />
                    <ErrorMessage name={"firstName"} />
                  </Flex>
                  <Flex direction={"column"}>
                    <Text fontWeight={"semibold"}>
                      {t("last_name", "Lirst name")}
                    </Text>
                    <Field as={Input} name="lastName" />
                    <ErrorMessage name={"lastName"} />
                  </Flex>
                </SimpleGrid>
                {/* username */}

                <Flex direction={"column"}>
                  <Text>{t("username", "Username")}</Text>
                  <InputGroup>
                    <InputLeftAddon
                      borderRightWidth={"1px"}
                      px="0.5rem"
                      w="fit-content"
                    >
                      <Text fontSize={"sm"} color="slategray">
                        wiaah.com/
                      </Text>
                    </InputLeftAddon>
                    <Field
                      fontWeight="semibold"
                      // pl="8.5rem"
                      as={Input}
                      name="username"
                    />
                  </InputGroup>
                  <ErrorMessage
                    name="user
                  name"
                  />
                </Flex>

                {/* profile picture */}

                <Flex gap="0.25em" direction={"column"}>
                  <Text>{t("photo", "Photo")}</Text>
                  <Flex gap="0.5rem">
                    <MediaUploadModal />
                    <Avatar size={"sm"} bgColor="black" src="/wiaah_logo.png" />
                    <Button
                      bgColor={"white"}
                      borderColor="gray.200"
                      size={"sm"}
                      colorScheme="gray"
                      variant={"outline"}
                      onClick={handleProfilePhotoChange}
                    >
                      {t("change", "change")}
                    </Button>
                    <Button
                      bgColor={"white"}
                      borderColor="gray.50"
                      size={"sm"}
                      colorScheme="gray"
                      variant={"outline"}
                    >
                      {t("remove", "remove")}
                    </Button>
                  </Flex>
                </Flex>

                {/* bio  */}
                <Flex direction={"column"}>
                  <Text>{t("bio", "Bio")}</Text>
                  <Field
                    resize="none"
                    className="thinScroll"
                    as={Textarea}
                    name="bio"
                  />
                  <ErrorMessage name="bio" />
                  <Text color={"slategray"}>
                    {t(
                      "brief_descrption",
                      "Brief Description for your profile, URLs are hyperlinked"
                    )}
                  </Text>
                </Flex>

                {/* personal inforomation */}
                <Flex direction={"column"}>
                  <Text fontSize={"lg"} fontWeight="semibold">
                    {t("personal_information", "Personal Information")}
                  </Text>
                  <Text color="slategray">
                    {t(
                      "info_public_warn",
                      "This inforomation will be displayed publicly so be careful what you share."
                    )}
                  </Text>
                </Flex>
                <SimpleGrid columns={2} gap="2rem">
                  <Flex direction={"column"}>
                    <Text>{t("email_address", "Email address")}</Text>
                    <Field as={Input} name="email" />
                    <ErrorMessage name="email" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Text>{t("address", "Address")}</Text>
                    <Field as={Input} name="address" />
                    <ErrorMessage name="address" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Text>{t("address2", "Address2")}</Text>
                    <Field as={Input} name="address2" />
                    <ErrorMessage name="address2" />
                  </Flex>
                  <Flex w="100%" direction={"column"}>
                    <Text>{t("country", "Country")}</Text>
                    <Field
                      as={SearchFilterInput}
                      w={"100%"}
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
                    {/* <Field as={Input} name="country" /> */}
                    <ErrorMessage name="country" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Text>{t("phone_number", "Phone number")}</Text>
                    <Field as={Input} name="phoneNumber" />
                    <ErrorMessage name="phoneNumber" />
                  </Flex>
                  <Flex w="100%" direction={"column"}>
                    <Text>{t("city", "City")}</Text>
                    <SearchFilterInput
                      w={"100%"}
                      name="city"
                      components={City.getCitiesOfCountry(
                        values.countryCode || ""
                      )?.map((city, i) => ({
                        name: city.name,
                        value: city.name,
                        comp: (
                          <Prefix
                            //@ts-ignore
                            prefix={<Text>{city.stateCode}</Text>}
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
                  </Flex>
                  <Flex direction={"column"}>
                    <Text>{t("language", "Language")}</Text>
                    <Field as={Input} name="language" />
                    <ErrorMessage name="language" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Text>{t("client_type", "Client Type")}</Text>
                    <Field as={Select} name="clientType">
                      <option value="professional">
                        {t("professional", "Professional")}
                      </option>
                      <option value="individual">
                        {t("individual", "Individual")}
                      </option>
                    </Field>
                    <ErrorMessage name="clientType" />
                  </Flex>
                </SimpleGrid>

                <Flex gap="1rem">
                  <Text>{t("store_for", "Store For")}</Text>
                  <SimpleGrid columnGap="0.5rem" columns={4}>
                    <Checkbox colorScheme={"primary"}>
                      {t("all", "All")}
                    </Checkbox>
                    {storeForOptions.map((opt, i) => (
                      <Checkbox colorScheme={"primary"}>
                        <TranslationText translationObject={opt} />
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </Flex>
                <Flex direction={"column"}>
                  <Text>{t("brand_desciption", "Brand Description")}</Text>
                  <Field
                    resize="none"
                    className="thinScroll"
                    as={Textarea}
                    name="brandDescription"
                  />
                  <ErrorMessage name="brandDescription" />
                  <Text color={"slategray"}>
                    {t(
                      "brief_brand_descrption",
                      "Brief Description for your brand, URLs are hyperlinked"
                    )}
                  </Text>
                </Flex>
                <Text color="slategray">
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
                </Text>
                <Divider />
                <Flex gap="1rem" w="100%" align={"center"} justify={"end"}>
                  <Button borderWidth={"1px"} size={"sm"} variant={"outline"}>
                    {t("cancel", "Cancel")}
                  </Button>
                  <Button type="submit" size={"sm"}>
                    {t("save", "Save")}
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    );
  };

const storeForOptions: TranslationTextType[] = [
  {
    translationKey: "men",
    fallbackText: "Men",
  },
  {
    translationKey: "women",
    fallbackText: "Women",
  },
  {
    translationKey: "children",
    fallbackText: "Children",
  },
  {
    translationKey: "babies",
    fallbackText: "Babies",
  },
];
