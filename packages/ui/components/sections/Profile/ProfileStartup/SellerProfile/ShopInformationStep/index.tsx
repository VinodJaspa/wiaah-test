import React from "react";
import { useTranslation } from "react-i18next";
import { Country, State, City } from "country-state-city";
import {
  FormikInput,
  TranslationText,
  Textarea,
  Input,
  SelectOption,
  Checkbox,
  Select,
  AvailableInArray,
  isAllAvailableInArray,
  storeForOptions,
  ToggleInArray,
  PhoneNumberInput,
  Button,
  PlusIcon,
  MediaUploadModal,
  useGetServiceCategoriesQuery,
  useCreateShopMutation,
  useResponsive,
  UploadIcon,
} from "@UI";
import { useTypedReactPubsub } from "@libs";
import {
  BusinessType,
  ServiceType,
  ShopStatus,
  StoreType,
} from "@features/API";
import { cities, useForm } from "utils";

let countriesArray = Country.getAllCountries().map((element) => ({
  value: element.isoCode,
  label: element.name,
}));

export interface ShopInformationStepProps {
  onSuccess: () => any;
}

export const ShopInformationStep = React.forwardRef(
  ({ onSuccess }: ShopInformationStepProps, ref) => {
    const { t } = useTranslation();
    const { emit } = useTypedReactPubsub(
      (events) => events.openFileUploadModal
    );
    const [lang, setLang] = React.useState("en");

    const {
      form: location,
      inputProps: locationInputProps,
      selectProps: locationSelectProps,
    } = useForm<Parameters<typeof mutate>[0]["args"]["location"]>({
      address: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
    });

    const { form, inputProps, selectProps, translationInputProps } = useForm<
      Parameters<typeof mutate>[0]["args"]
    >(
      {
        banner: "",
        businessType: BusinessType.Individual,
        description: [],
        email: "",
        hashtags: [],
        images: [],
        location,
        name: [],
        payment_methods: [],
        phone: "",
        status: ShopStatus.Active,
        storeType: StoreType.Product,
        targetGenders: [],
        thumbnail: "",
        vidoes: [],
        storeFor: [],
        type: ServiceType.Hotel,
      },
      { location }
    );
    const { isMobile } = useResponsive();
    const { mutate, isLoading } = useCreateShopMutation();
    const { data: categories } = useGetServiceCategoriesQuery();

    React.useImperativeHandle(ref, () => ({
      submit() {
        mutate({ args: form }, { onSuccess });
      },
    }));

    const showOn = (types: ServiceType[]) =>
      form.type && types.includes(form.type);

    const _cities = cities.filter((c) => c.countryCode === location.country);

    return (
      <div className="pr-2">
        <h2 className="hidden text-xl font-bold lg:block">
          {t("Fill out shop information")}
        </h2>
        <div className="flex py-4">
          <div className="w-full flex flex-col gap-4 text-gray-500">
            <Input
              {...inputProps("name")}
              placeholder={t("Name")}
              label={t("Company Name")}
            />
            <Input
              {...locationInputProps("address")}
              name="Address"
              placeholder={t("Address") + " 1"}
              label={t("Address") + " 1"}
            />
            <Select
              id="countryselect"
              {...locationSelectProps("country")}
              placeholder={t("Country")}
              label={t("Country")}
            >
              {countriesArray.map((country, i) => (
                <SelectOption value={country.value} key={i}>
                  {country.label}
                </SelectOption>
              ))}
            </Select>

            <PhoneNumberInput
              {...inputProps("phone", undefined, undefined, (v) => v)}
              label={t("Contact")}
            />

            <Select id="cityselect" placeholder={t("City")}>
              {cities.map((city, i) => (
                <SelectOption value={city.stateCode} key={i}>
                  {city.name}
                </SelectOption>
              ))}
            </Select>
            <div className="flex flex-col gap-2">
              <p className="border-b pb-1 border-primary font-semibold text-lg">
                {t("Commercial register extract")}
              </p>
              {isMobile ? (
                <button
                  onClick={() => emit({ uploadType: "img" })}
                  className="flex flex-col gap-4 py-10 w-full text-iconGray items-center justify-center"
                >
                  <UploadIcon className="text-5xl" />
                  <p>{t("Upload Document")}</p>
                </button>
              ) : (
                <Button
                  outline
                  onClick={() => emit({ uploadType: "img" })}
                  className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                >
                  <p>{t("Back Side")}</p>
                  <PlusIcon className="text-4xl" />
                </Button>
              )}
              {/* <MediaUploadModal /> */}
            </div>

            <Input
              className="rounded-md"
              {...inputProps("crn")}
              placeholder={t("Company Registered Number (CRN)")}
              label={t("Company Registered Number (CRN)")}
            />
            <Select
              {...selectProps("currency")}
              label={t("Select Currency")}
              placeholder={t("Select Currency")}
              className=" w-full "
            >
              {/* TODO: get available currencies */}
              <SelectOption value="USD">USD</SelectOption>
              <SelectOption value="EUR">EUR</SelectOption>
            </Select>
            <Select
              {...selectProps("language")}
              placeholder={t("Select Language")}
              label={t("Select Language")}
              className=" w-full "
            >
              {/* TODO: get available languages */}
              <SelectOption value="english">
                <TranslationText
                  translationObject={{
                    translationKey: "english",
                    fallbackText: "English",
                  }}
                />
              </SelectOption>
              <SelectOption value="french">
                <TranslationText
                  translationObject={{
                    translationKey: "french",
                    fallbackText: "French",
                  }}
                />
              </SelectOption>
              <SelectOption value="germen">
                <TranslationText
                  translationObject={{
                    translationKey: "germen",
                    fallbackText: "Germen",
                  }}
                />
              </SelectOption>
            </Select>
            <Select
              placeholder={t("Shop Type")}
              {...selectProps("storeType")}
              label={t("Shop Type")}
              className=" w-full "
            >
              <SelectOption value={StoreType.Product}>
                {t("Products Shop")}
              </SelectOption>
              <SelectOption value={StoreType.Service}>
                {t("Services Shop")}
              </SelectOption>
            </Select>
            {form.storeType === StoreType.Service ? (
              <Select
                {...selectProps("type")}
                placeholder={t("Choose Service Type")}
                label={t("Service Type")}
              >
                {categories?.map(({ slug, name }, i) => (
                  <SelectOption key={i} value={slug}>
                    {name.find((v) => v.langId === "en")?.value}
                  </SelectOption>
                ))}
              </Select>
            ) : null}
            <Textarea
              {...translationInputProps("description", lang)}
              placeholder={t("Description")}
              className=" w-full "
            />

            {form.storeType === StoreType.Product ? (
              <>
                <div className="flex gap-2">
                  <span className="font-semibold whitespace-nowrap lg:text-lg">
                    {t("Store for")}:
                  </span>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <Checkbox
                      checked={isAllAvailableInArray(
                        storeForOptions.map((opt) => opt.value),
                        // form.storefor
                        []
                      )}
                      readOnly
                    >
                      {t("All", "All")}
                    </Checkbox>
                    {storeForOptions.map((opt, i) => (
                      <Checkbox
                        // checked={AvailableInArray(opt.value, values.storeFor)}
                        onChange={
                          (e) => {}
                          // setFieldValue(
                          //   "storeFor",
                          //   ToggleInArray(
                          //     values.storeFor,
                          //     e.target.checked,
                          //     opt.value
                          //   )
                          // )
                        }
                        key={i}
                      >
                        <TranslationText translationObject={opt.name} />
                      </Checkbox>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
