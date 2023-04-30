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
} from "@UI";
import { useTypedReactPubsub } from "@libs";
import {
  BusinessType,
  ServiceType,
  ShopStatus,
  StoreType,
} from "@features/API";
import { useForm } from "utils";

let countriesArray = Country.getAllCountries().map((element) => ({
  value: element.isoCode,
  label: element.name,
}));

export interface ShopInformationStepProps {
  onSuccess: () => any;
}

export const ShopInformationStep: React.FC<ShopInformationStepProps> =
  React.forwardRef(({ onSuccess }: ShopInformationStepProps, ref) => {
    const { t } = useTranslation();
    const { emit } = useTypedReactPubsub(
      (events) => events.openFileUploadModal
    );
    const [lang, setLang] = React.useState("en");

    let [states, setState] = React.useState([
      { value: "", label: t("Select_country_first!", "Select country first!") },
    ]);
    let [cities, setCities] = React.useState([
      { value: "", label: t("Select_state_first!", "Select state first!") },
    ]);

    const {
      form,
      inputProps,
      selectProps,
      switchInputProps,
      dateInputProps,
      translationInputProps,
    } = useForm<Parameters<typeof mutate>[0]["args"]>({
      banner: "",
      businessType: BusinessType.Individual,
      description: [],
      email: "",
      hashtags: [],
      images: [],
      location: {
        address: "",
        city: "",
        country: "",
        state: "",
        lat: 0,
        long: 0,
        postalCode: "",
      },
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
    });
    const { mutate, isLoading } = useCreateShopMutation();

    const [serviceType, setServiceType] = React.useState<ServiceType>();
    const { data: categories } = useGetServiceCategoriesQuery();

    let [countryCode, setCountryCode] = React.useState("");
    let [stateCode, setStateCode] = React.useState("");

    function handleCountryChange(value: any) {
      setStateCode("");
      setCountryCode(value.value);
    }
    function handleStateChange(value: any) {
      setStateCode(value.value);
    }

    React.useImperativeHandle(ref, () => ({
      submit() {
        mutate({ args: form });
      },
    }));

    React.useEffect(() => {
      const statesArray = State.getStatesOfCountry(countryCode);
      let index = 0;
      statesArray?.forEach((element) => {
        states[index] = { value: element.isoCode, label: element.name };
        index++;
      });
    }, [countryCode]);

    React.useEffect(() => {
      const citiesArray = City.getCitiesOfState(countryCode, stateCode);
      let index = 0;
      citiesArray?.forEach((element) => {
        cities[index] = { value: element.name, label: element.name };
        index++;
      });
    }, [stateCode]);

    const showOn = (types: ServiceType[]) =>
      serviceType && types.includes(serviceType);

    return (
      <div className="pr-2">
        <h2 className="hidden text-xl font-bold lg:block">
          {t("Fill out shop information")}
        </h2>
        <div className="flex py-4">
          <div className="w-full flex flex-col gap-4 text-gray-500">
            <Input name="companyName" placeholder={t("Company")} />
            <Input name="Address" placeholder={t("Address") + " 1"} />
            <Input name="Address2" placeholder={t("Address") + " 2"} />
            <PhoneNumberInput
              {...inputProps("phone", undefined, undefined, (v) => v)}
            />
            <Select {...selectProps("businessType")} className="w-full ">
              {Object.values(BusinessType).map((v, i) => (
                <SelectOption key={i} value={v}>
                  {v}
                </SelectOption>
              ))}
            </Select>
            <Select
              id="countryselect"
              placeholder={t("Country", "Country")}
              onChange={(value) => {
                handleCountryChange(value);
              }}
            >
              {countriesArray.map((country, i) => (
                <SelectOption value={country.value} key={i}>
                  {country.label}
                </SelectOption>
              ))}
            </Select>
            <Select id="cityselect" placeholder={t("City", "City")}>
              {cities.map((city, i) => (
                <SelectOption value={city.value} key={i}>
                  {city.label}
                </SelectOption>
              ))}
            </Select>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">
                {t("Upload commercial register extract")}
              </p>
              <Button
                outline
                onClick={() => emit({ uploadType: "img" })}
                className="w-48 h-48 justify-center items-center flex flex-col gap-1"
              >
                <p>{t("Back Side")}</p>
                <PlusIcon className="text-4xl" />
              </Button>
              <MediaUploadModal />
            </div>

            <Input
              className=" rounded-md"
              placeholder={t("company_CRN", "Company Registered Number (CRN)")}
            />
            <Select placeholder={t("Select Currency")} className=" w-full ">
              <SelectOption value="USD">USD</SelectOption>
              <SelectOption value="EUR">EUR</SelectOption>
            </Select>
            <Select
              placeholder={t("select_language", "Select Language")}
              className=" w-full "
            >
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
              placeholder={t("Type of Shop")}
              {...selectProps("storeType")}
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
  });
