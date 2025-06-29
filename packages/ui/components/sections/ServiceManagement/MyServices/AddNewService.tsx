import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  StepperFormHandler,
  Button,
  FlagIcon,
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  Input,
  Textarea,
  Select,
  SelectOption,
  CountInput,
  Switch,
  HStack,
  Radio,
  PlusIcon,
  UploadIcon,
  InputGroup,
  InputLeftElement,
  DollarIcon,
  PercentIcon,
  SimpleTabHeadButton,
} from "@partials";
import {
  CheckMarkStepper,
  ChooseWithInput,
  HashTagInput,
  MediaUploadModal,
  MultiChooseInput,
  useMediaUploadControls,
} from "@blocks";
import { MyServicesCtx } from "./index";
import { NewProductDiscountOptions } from "@sections/ShopManagement";
import { SectionHeader } from "@sections";
import { NewServiceSchemas } from "validation";
import {
  WiaahLangId,
  WiaahLanguageCountries,
  mapArray,
  setTestid,
  useForm,
} from "utils";
import { AnySchema } from "yup";
import { useCreateServiceMutation } from "@features/Services/Services/mutation";
import { useGetUserShopType } from "@features/Shop";
import {
  CreateServiceInput,
  DoctorSpeakingLanguage,
  RentalPropertyType,
  RentalTypeOfPlace,
  RestaurantDishType,
  ServiceAdaptation,
  ServiceRestriction,
  ServiceType,
} from "@features/API";
import { startCase } from "lodash";
import {
  DailyPriceInput,
  HotelBedsInput,
  ServiceAppontmentDurationTimeTableInput,
} from "@features/Services";
import { useResponsive, useUserData } from "@src/index";

export interface AddNewServiceProps { }
export const AddNewService: React.FC<AddNewServiceProps> = () => {
  const { CancelAddingNewService, ServiceIdFormState } =
    useContext(MyServicesCtx);

const { t } = useTranslation();
  const [lang, setLang] = React.useState<WiaahLangId>(WiaahLangId.EN);

  const { mutate } = useCreateServiceMutation();

  const isEdit = typeof ServiceIdFormState === "string";

  const { user } = useUserData();
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <div className="flex gap-4 flex-col">
      <SectionHeader
        sectionTitle={isEdit ? t("Edit Service") : t("Add New Service")}
      />

      <SimpleTabs>
        <>
          <div className="flex-wrap flex gap-4 flex-col sm:flex-row justify-center sm:justify-start">
            <SimpleTabHead>
              {WiaahLanguageCountries.map(({ code, name, langId }, i) => (
                <SimpleTabHeadButton
                  key={langId}
                  onClick={() => setSelected(i)}
                  selected={selected === i}
                >
                  <FlagIcon code={code} />
                  <span className="hidden sm:block">{name}</span>
                </SimpleTabHeadButton>
              ))}
            </SimpleTabHead>
          </div>
          <SimpleTabItemList />
        </>
      </SimpleTabs>
      <div className=" pb-8">
        <NewServiceStepper
          sellerId={user?.id || ""}
          onFinish={(data) => mutate(data)}
          isEdit={isEdit || false}
          // TODO
          data={NewServiceStepper.defaultProps?.data}
          lang={lang}
        />
        <div className="w-full justify-between flex">
          <Button
            colorScheme="danger"
            outline
            onClick={() => CancelAddingNewService()}
          >
            {t("Cancel")}
          </Button>

          <HStack className="justify-end">
            {/* TODO */}
            <Button onClick={() => { }} outline colorScheme="gray">
              {t("Back")}
            </Button>
            {/* TODO */}
            <Button className="w-fit self-end" onClick={() => { }}>
              {t("Next")}
            </Button>
          </HStack>
        </div>
      </div>
    </div>
  );
};

export type ServiceSectionWithSchemaType = {
  key: ServiceType;
  component: React.FC<any>;
  schema: AnySchema;
};

export const NewServiceStepper = React.forwardRef(
  (
    {
      isEdit,
      data,
      sellerId,
      onFinish,
      lang,
    }: {
      isEdit: boolean;
      data?: CreateServiceInput;
      onFinish?: (data: CreateServiceInput) => any;
      sellerId: string;
      lang: WiaahLangId;
    },
    ref
  ) => {
    const { isMobile } = useResponsive();
  const { t } = useTranslation();
    const uploadImagesRef = useRef<HTMLInputElement>(null);

    const { data: shop } = useGetUserShopType({ userId: sellerId });

    const {
      dateInputProps,
      form,
      handleChange,
      inputProps,
      selectProps,
      translationInputProps,
      switchInputProps,
    } = useForm<CreateServiceInput>(
      {
        title: "",
        cancelable: false,
        policies: [
          {
            langId: "en-US",
            value: [{ policyTitle: "k", terms: [" ", ""] }],
          },
        ],
        price: 0,
        description: [{ langId: "en-US", value: "" }],
        name: [{ langId: "en-US", value: "" }],
        speakingLanguages: [DoctorSpeakingLanguage.En],
        thumbnail: "",
        vat: 0,
        hashtags: ["#"],
        isExternal: false,
      },
      {},
      { addLabel: true, addPlaceholder: true }
    );

    const [step, setStep] = React.useState<number>(0);

    const [value, setValue] = React.useState<any>([]);

    const [week, setWeek] = React.useState<Date>(new Date());

    const { controls, uploadImage } = useMediaUploadControls();

    const stepsLength = 3 - 1;

    const goToStep = (idx: number) => {
      setStep((v) => (v < idx ? v : idx));
    };

    const nextStep = () => {
      if (step > stepsLength) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onFinish && onFinish(form);
      } else {
        setStep((v) => (v >= stepsLength ? v : v + 1));
      }
    };

    const prevStep = () => {
      setStep((v) => (v <= 0 ? 0 : v - 1));
    };

    React.useImperativeHandle(ref, () => {
      return {
        next: nextStep,
        prev: prevStep,
      };
    });

    const serviceType = shop?.type || ServiceType.Hotel;

    const showOn = (types: ServiceType[]) => types.includes(serviceType);

    return (
      <div
        {...setTestid("service-stepper")}
        className="flex flex-col gap-4 h-full justify-between"
      >
        <CheckMarkStepper
          currentStepIdx={step}
          onStepChange={(step) => goToStep(step)}
          steps={[
            {
              key: "generalDetails",
              stepComponent: (
                <div className="w-full flex flex-col gap-4">
                  <p className="text-lg font-semibold">{t("Upload Images")}</p>
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/gif, image/jpeg"
                    ref={uploadImagesRef}
                    className="hidden"
                    onChange={(event) => { }}
                  />
                  <button
                    onClick={() => {
                      uploadImagesRef.current?.click();
                    }}
                    className="flex flex-col gap-4 items-center justify-center py-10 text-iconGray"
                  >
                    <UploadIcon className="text-5xl" />
                    <p className="font-semibold">
                      {t("Tap to upload from gallery")}
                    </p>
                  </button>

                  <span className="lg:text-2xl w-fit lg:border-none text-lg border-b border-b-primary font-semibold">
                    {t("Name & Description")}
                  </span>
                  <Input
                    {...setTestid("service-name-input")}
                    {...translationInputProps("name", lang)}
                    label={(() => {
                      switch (serviceType) {
                        case ServiceType.Hotel:
                          return t("Room Name") as string;

                        case ServiceType.HolidayRentals:
                          return t("Rental Name") as string;

                        case ServiceType.BeautyCenter:
                          return t("Treatment Name") as string;

                        case ServiceType.HealthCenter:
                          return t("Doctor Name") as string;

                        case ServiceType.Restaurant:
                          return t("Dish Name") as string;

                        case ServiceType.Vehicle:
                          return t("Vehicle Name") as string;
                        default:
                          return t("Service Name") as string;
                      }
                    })()}
                  />
                  <div>
                    <p className="font-medium">{t("Description")}</p>
                    <Textarea
                      {...setTestid("service-description-input")}
                      {...translationInputProps("description", lang)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch {...switchInputProps("isExternal")} />
                    <p>{t("Is external service ?")}</p>
                  </div>
                  {/* There is no source sit url data type */}
                  {/* <div>
                    <p className="font-medium">{t("Source site url")}</p>
                    <Input
                      {...translationInputProps(, lang)}
                      placeholder={t("Source site url")}
                      label={undefined}
                    />
                  </div> */}

                  {showOn([ServiceType.Restaurant]) ? (
                    <>
                      <Select {...selectProps("menuType")}>
                        <SelectOption value={RestaurantDishType.Starter}>
                          {startCase(RestaurantDishType.Starter)}
                        </SelectOption>
                        <SelectOption value={RestaurantDishType.Main}>
                          {startCase(RestaurantDishType.Main)}
                        </SelectOption>
                        <SelectOption value={RestaurantDishType.Dessert}>
                          {startCase(RestaurantDishType.Dessert)}
                        </SelectOption>
                        <SelectOption value={RestaurantDishType.Drinks}>
                          {startCase(RestaurantDishType.Drinks)}
                        </SelectOption>
                      </Select>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">{t("Ingredients")}</p>
                        <MultiChooseInput
                          {...inputProps(
                            "ingredients",
                            undefined,
                            undefined,
                            (v) => v
                          )}
                        />
                      </div>
                    </>
                  ) : null}

                  {showOn([ServiceType.HolidayRentals]) ? (
                    <>
                      <Select {...selectProps("propertyType")}>
                        <SelectOption value={RentalPropertyType.Appertemant}>
                          {startCase(RentalPropertyType.Appertemant)}
                        </SelectOption>
                        <SelectOption value={RentalPropertyType.Flat}>
                          {startCase(RentalPropertyType.Flat)}
                        </SelectOption>
                        <SelectOption value={RentalPropertyType.House}>
                          {startCase(RentalPropertyType.House)}
                        </SelectOption>
                        <SelectOption value={RentalPropertyType.Studio}>
                          {startCase(RentalPropertyType.Studio)}
                        </SelectOption>
                        <SelectOption value={RentalPropertyType.Villa}>
                          {startCase(RentalPropertyType.Villa)}
                        </SelectOption>
                      </Select>

                      <Select {...selectProps("typeOfPlace")}>
                        <SelectOption value={RentalTypeOfPlace.Entire}>
                          {startCase(RentalTypeOfPlace.Entire)}
                        </SelectOption>
                        <SelectOption value={RentalTypeOfPlace.Shared}>
                          {startCase(RentalTypeOfPlace.Shared)}
                        </SelectOption>
                      </Select>
                    </>
                  ) : null}

                  {showOn([ServiceType.Hotel]) ? (
                    <Input
                      type={"number"}
                      min={1}
                      {...inputProps("units")}
                      label={t("Number of rooms") as string}
                    />
                  ) : null}

                  {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
                    <>
                      <Input
                        type={"number"}
                        min={0}
                        value={form?.measurements?.inMeter || 0}
                        onChange={(v) =>
                          handleChange("measurements", {
                            inFeet: parseInt(v.target.value),
                            inMeter: form.measurements?.inMeter || 0,
                          })
                        }
                        label={t("Measurements (in feet)") as string}
                      />

                      <Input
                        type={"number"}
                        min={0}
                        value={form?.measurements?.inFeet || 0}
                        onChange={(v) =>
                          handleChange("measurements", {
                            inMeter: parseInt(v.target.value),
                            inFeet: form.measurements?.inMeter || 0,
                          })
                        }
                        label={t("Measurements (in meter)") as string}
                      />

                      <div>
                        <p className="font-medium">{t("Hashtags")}</p>
                        <HashTagInput
                          {...inputProps(
                            "hashtags",
                            undefined,
                            undefined,
                            (v) => v
                          )}
                        />
                      </div>
                    </>
                  ) : null}

                  {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
                    <>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                          <p className="font-medium">{t("Number of beds")}</p>
                          <HotelBedsInput
                            {...inputProps(
                              "beds",
                              undefined,
                              undefined,
                              (v) => v
                            )}
                          />
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                          <p className="font-medium">
                            {t("Number of Bathrooms")}
                          </p>
                          <div className="flex text-xl justify-between items-center gap-2">
                            <p className="font-medium text-sm">
                              {t("Bathrooms")}
                            </p>
                            <CountInput
                              {...inputProps(
                                "bathrooms",
                                undefined,
                                undefined,
                                (v) => v
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {showOn([ServiceType.BeautyCenter]) ? (
                    <div className="flex flex-col gap-2">
                      <Select
                        {...selectProps("treatmentCategoryId")}
                        label={t("Treatment Category") as string}
                      >
                        <SelectOption value={undefined}>
                          {t("Select Treatment Category")}
                        </SelectOption>
                      </Select>

                      <Select {...selectProps("duration")}>
                        <SelectOption value={15}>
                          15 {t("minutes")}
                        </SelectOption>
                        <SelectOption value={30}>
                          30 {t("minutes")}
                        </SelectOption>
                        <SelectOption value={45}>
                          45 {t("minutes")}
                        </SelectOption>
                        <SelectOption value={60}>1 {t("hour")}</SelectOption>
                        <SelectOption value={90}>
                          1 {t("hour")} 30 {t("minutes")}
                        </SelectOption>
                        <SelectOption value={120}>2 {t("hours")}</SelectOption>
                      </Select>

                      <Select {...selectProps("units")}>
                        {mapArray([...Array(20)], (_, i) => (
                          <SelectOption value={i + 1}>
                            {i + 1} {t("days")}
                          </SelectOption>
                        ))}
                      </Select>
                    </div>
                  ) : null}

                  {showOn([ServiceType.HealthCenter]) ? (
                    <div className="flex flex-col gap-2">
                      <Select
                        {...selectProps("specialityId")}
                        label={t("Speciality") as string}
                      >
                        <SelectOption value={undefined}>
                          {t("Select Speciality")}
                        </SelectOption>
                      </Select>
                      <MultiChooseInput
                        {...inputProps(
                          "speakingLanguages",
                          undefined,
                          undefined,
                          (v) => v
                        )}
                        suggestions={["English", "French", "Spanish", "German"]}
                      />
                    </div>
                  ) : null}

                  <span className="lg:text-2xl border-b border-primary text-lg font-semibold">
                    {t("Price & Attributes")}
                  </span>

                  <HStack>
                    <div className="flex flex-col gap-1">
                      <p>
                        {showOn([
                          ServiceType.Vehicle,
                          ServiceType.HolidayRentals,
                          ServiceType.Hotel,
                        ])
                          ? t("Price per day")
                          : t("Price")}
                      </p>
                      <InputGroup>
                        <InputLeftElement>
                          <DollarIcon className="text-xl text-primary" />
                        </InputLeftElement>
                        <Input
                          min={1}
                          type="number"
                          {...inputProps("price")}
                          label={undefined}
                        />
                      </InputGroup>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>{t("VAT %")}</p>
                      <InputGroup>
                        <InputLeftElement>
                          <PercentIcon className="text-xl text-primary" />
                        </InputLeftElement>
                        <Input
                          min={1}
                          type="number"
                          {...inputProps("vat")}
                          label={undefined}
                        />
                      </InputGroup>
                    </div>
                  </HStack>

                  <div className="flex gap-2 justify-between">
                    <p className="font-medium">{t("Enable Daily Price")}</p>
                    <Switch
                      checked={form.dailyPrice || false}
                      onChange={(v) => handleChange("dailyPrice", v)}
                    />
                  </div>
                  {form.dailyPrice ? (
                    <DailyPriceInput
                      onChange={(v) => {
                        handleChange("dailyPrices", {
                          mo: v[0],
                          tu: v[1],
                          we: v[2],
                          th: v[3],
                          fr: v[4],
                          sa: v[5],
                          su: v[6],
                        });
                      }}
                      value={{
                        0: form.dailyPrices?.mo || form.price,
                        1: form.dailyPrices?.tu || form.price,
                        2: form.dailyPrices?.we || form.price,
                        3: form.dailyPrices?.th || form.price,
                        4: form.dailyPrices?.fr || form.price,
                        5: form.dailyPrices?.sa || form.price,
                        6: form.dailyPrices?.su || form.price,
                      }}
                    />
                  ) : null}

                  <ChooseWithInput
                    title={t("Cleaning fees") as string}
                    name="cancelFees"
                    onOptionChange={(opt) => {
                      // add cleaning fee
                    }}
                    options={[
                      {
                        title: t("Free") as string,
                        key: "free",
                        input: null,
                      },
                      {
                        title: t("Paid") as string,
                        key: "paid",
                        input: { placeholder: "$" },
                      },
                    ]}
                  />

                  {showOn([ServiceType.Vehicle]) ? (
                    <div className="flex flex-col gap-2">
                      <Input {...inputProps("brand")} />
                      <Input {...inputProps("model")} />

                      <Input
                        type="number"
                        min={1}
                        {...inputProps("maxSpeedInKm")}
                      />
                      <Input type="number" min={1} {...inputProps("seats")} />
                      <Input type="number" min={1} {...inputProps("windows")} />
                      <Input
                        type="number"
                        min={1}
                        {...inputProps("lugaggeCapacity")}
                        label={t("bags") as string}
                        placeholder={t("bags") as string}
                      />
                      <HStack className="justify-between font-semibold">
                        <p>{t("gps available")}</p>
                        <Switch {...switchInputProps("gpsAvailable")} />
                      </HStack>

                      <HStack className="justify-between font-semibold">
                        <p>{t("air condition")}</p>
                        <Switch {...switchInputProps("airCondition")} />
                      </HStack>
                    </div>
                  ) : null}

                  {isMobile ? null : (
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{t("Upload yuor image")}</p>
                      <div className="bg-white w-48 h-48 flex flex-col justify-center items-center border-2 border-black rounded-xl">
                        <PlusIcon className="text-3xl" />
                        <p>{t("Drag & drop")}</p>
                        <p>
                          {t("or")}{" "}
                          <span
                            onClick={() => uploadImage()}
                            className="text-primary underline cursor-pointer"
                          >
                            {t("browse")}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ),
              stepName: {
                translationKey: "Service general details",
                fallbackText: "Service general details",
              },
            },

            showOn([ServiceType.HealthCenter])
              ? {
                key: "time_settings",
                stepComponent: (
                  <div className="flex flex-col gap-4 w-full">
                    <ServiceAppontmentDurationTimeTableInput
                      input
                      selectionContainerProps={{ className: "h-[29vh]" }}
                      onWeekChange={(v) => {
                        setWeek(v);
                      }}
                      week={week}
                      workingDates={[...Array(25)].map((_, i) => [
                        new Date(new Date().setHours(3)),
                        new Date(new Date().setHours(16)),
                      ])}
                      onChange={(v) => {
                        setValue(v);
                      }}
                      value={value}
                    />
                    <div className="grid grid-cols-8 gap-y-2">
                      <p className="font-semibold col-span-1">
                        {t("Repeat")}
                      </p>
                      <p className="font-semibold col-span-7">{t("Every")}</p>
                      <div className="h-full items-center flex">
                        <Switch className="col-span-1" />
                      </div>
                      <div className="col-span-7">
                        <Select>
                          <SelectOption value={"week"}>
                            {t("Week")}
                          </SelectOption>
                        </Select>
                      </div>
                    </div>
                  </div>
                ),
                stepName: "Time settings",
              }
              : undefined,

            {
              key: "servicePolicies",
              stepComponent: (
                <div className="flex flex-col gap-4 w-full">
                  <span className="text-2xl font-semibold">
                    {t("Service policies")}
                  </span>

                  {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
                    <>
                      <p className="font-semibold text-lg">
                        {t("Rent Condition")}
                      </p>
                      <HStack className="justify-between">
                        <p>{t("Adapted for new born (under 2 years)")}</p>
                        <Switch
                          variant="buttons"
                          checked={
                            form.adaptedFor?.includes(
                              ServiceAdaptation.NewBorn
                            ) || false
                          }
                          onChange={(v) => {
                            handleChange(
                              "adaptedFor",
                              v === true
                                ? [
                                  ...(form.adaptedFor?.filter(
                                    (e) => e !== ServiceAdaptation.NewBorn
                                  ) || []),
                                  ServiceAdaptation.NewBorn,
                                ]
                                : form.adaptedFor?.filter(
                                  (e) => e !== ServiceAdaptation.NewBorn
                                )
                            );
                          }}
                        />
                      </HStack>

                      <HStack className="justify-between">
                        <p>{t("Adapted for childrens (2-10 years)")}</p>
                        <Switch
                          variant="buttons"
                          checked={
                            form.adaptedFor?.includes(
                              ServiceAdaptation.Children
                            ) || false
                          }
                          onChange={(v) => {
                            handleChange(
                              "adaptedFor",
                              v === true
                                ? [
                                  ...(form.adaptedFor?.filter(
                                    (e) => e !== ServiceAdaptation.Children
                                  ) || []),
                                  ServiceAdaptation.Children,
                                ]
                                : form.adaptedFor?.filter(
                                  (e) => e !== ServiceAdaptation.Children
                                )
                            );
                          }}
                        />
                      </HStack>

                      <HStack className="justify-between">
                        <p>{t("Adapted Wheelchair")}</p>
                        <Switch
                          variant="buttons"
                          checked={
                            form.adaptedFor?.includes(
                              ServiceAdaptation.Wheelchair
                            ) || false
                          }
                          onChange={(v) => {
                            handleChange(
                              "adaptedFor",
                              v === true
                                ? [
                                  ...(form.adaptedFor?.filter(
                                    (e) => e !== ServiceAdaptation.Wheelchair
                                  ) || []),
                                  ServiceAdaptation.Wheelchair,
                                ]
                                : form.adaptedFor?.filter(
                                  (e) => e !== ServiceAdaptation.Wheelchair
                                )
                            );
                          }}
                        />
                      </HStack>

                      <p className="font-semibold text-lg">
                        {t("Strict restrictions")}
                      </p>

                      <HStack className="justify-between">
                        <p>{t("Right to organize party or event")}</p>
                        <Switch
                          variant="buttons"
                          checked={
                            form.restriction?.includes(
                              ServiceRestriction.Event
                            ) || false
                          }
                          onChange={(v) => {
                            handleChange(
                              "restriction",
                              v === true
                                ? [
                                  ...(form.restriction?.filter(
                                    (e) => e !== ServiceRestriction.Event
                                  ) || []),
                                  ServiceRestriction.Event,
                                ]
                                : form.restriction?.filter(
                                  (e) => e !== ServiceRestriction.Event
                                )
                            );
                          }}
                        />
                      </HStack>

                      <HStack className="justify-between">
                        <p>{t("Right to smoking")}</p>
                        <Switch
                          variant="buttons"
                          checked={
                            form.restriction?.includes(
                              ServiceRestriction.Smoking
                            ) || false
                          }
                          onChange={(v) => {
                            handleChange(
                              "restriction",
                              v === true
                                ? [
                                  ...(form.restriction?.filter(
                                    (e) => e !== ServiceRestriction.Smoking
                                  ) || []),
                                  ServiceRestriction.Smoking,
                                ]
                                : form.restriction?.filter(
                                  (e) => e !== ServiceRestriction.Smoking
                                )
                            );
                          }}
                        />
                      </HStack>

                      <HStack className="justify-between">
                        <p>{t("Right to have pets")}</p>
                        <Switch
                          variant="buttons"
                          checked={
                            form.restriction?.includes(
                              ServiceRestriction.Pets
                            ) || false
                          }
                          onChange={(v) => {
                            handleChange(
                              "restriction",
                              v === true
                                ? [
                                  ...(form.restriction?.filter(
                                    (e) => e !== ServiceRestriction.Pets
                                  ) || []),
                                  ServiceRestriction.Pets,
                                ]
                                : form.restriction?.filter(
                                  (e) => e !== ServiceRestriction.Pets
                                )
                            );
                          }}
                        />
                      </HStack>
                    </>
                  ) : null}

                  {showOn([
                    ServiceType.HolidayRentals,
                    ServiceType.Hotel,
                    ServiceType.Vehicle,
                  ]) ? (
                    <HStack className="justify-between">
                      <p>{t("Deposit")}</p>
                      <Switch
                        variant="buttons"
                        checked={!!form.deposit}
                        onChange={(v) => {
                          handleChange("deposit", v);
                        }}
                      />
                      {form.deposit ? (
                        <>
                          <p>{t("How much ?")}</p>
                          <div>
                            <Input
                              className=""
                              type="number"
                              {...inputProps("depositAmount")}
                              label={undefined}
                            />
                          </div>
                        </>
                      ) : null}
                    </HStack>
                  ) : null}

                  <div className="flex flex-col gap-2">
                    <HStack className="justify-between">
                      <p className="font-semibold">
                        {t("Cancellation Policy")}
                      </p>
                      <Switch {...switchInputProps("cancelable")} />
                    </HStack>
                    {form.cancelable ? (
                      <>
                        <p>{t("Which type of cancellation ?")}</p>

                        <div className="flex flex-col gap-1">
                          <Radio name={"cancelationPolicyType"}>
                            <p className="font-semibold">{t("Simple")}</p>
                            <p>{`(${t(
                              "the client can cancel  at anytime"
                            )})`}</p>
                          </Radio>
                          <Radio name={"cancelationPolicyType"}>
                            <p className="font-semibold">{t("Moderate")}</p>
                            <span>
                              {`(${t(
                                "the client can cancel up to 24 hours before the scheduled date"
                              )})`}
                            </span>
                          </Radio>
                          <Radio name={"cancelationPolicyType"}>
                            <p className="font-semibold">{t("Strict")}</p>
                            <span className="font-normal">
                              {`(${t(
                                [
                                  ServiceType.BeautyCenter,
                                  ServiceType.Restaurant,
                                  ServiceType.HealthCenter,
                                ].includes(serviceType)
                                  ? "if the client cancel within 5 hours of the scheduled date, you will get 50% of the reservation"
                                  : "if the client cancel within 30 day of the scheduled date, you will get 50% of the reservation"
                              )})`}
                            </span>
                          </Radio>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div>
                    <p>{t("Policy Terns")}</p>
                    <Textarea
                      name="policy_terms"
                      placeholder={t("Policy Terms") as string}
                    />
                  </div>

                  {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
                    <>
                      <div className="flex flex-col gap-2 w-full">
                        <p>{t("When can guests check in?")}</p>
                        <HStack className="flex flex-col sm:flex-row">
                          <Select
                            placeholder={t("Select a time") as string}
                            label={t("From") as string || "From"}
                          >
                            {mapArray([...Array(10)], (_, i) => (
                              <SelectOption value={i}>
                                <p>
                                  {new Date(
                                    new Date().setHours(i + 1)
                                  ).toLocaleDateString("en-us", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </p>
                              </SelectOption>
                            ))}
                          </Select>
                          <Select
                            placeholder={t("Select a time") as string}
                            label={t("To") || "To"}
                          >
                            {mapArray([...Array(10)], (_, i) => (
                              <SelectOption value={i}>
                                <p>
                                  {new Date(
                                    new Date().setHours(i + 1)
                                  ).toLocaleDateString("en-us", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </p>
                              </SelectOption>
                            ))}
                          </Select>
                        </HStack>
                      </div>
                    </>
                  ) : null}
                </div>
              ),
              stepName: {
                translationKey: "Service Policy Details",
                fallbackText: "Service Policy Details",
              },
            },
            {
              key: "discount",
              stepComponent: (
                <StepperFormHandler
                  handlerKey="discount"
                  validationSchema={NewServiceSchemas.discount}
                >
                  {({ validate }) => (
                    <NewProductDiscountOptions onChange={validate} />
                  )}
                </StepperFormHandler>
              ),
              stepName: {
                translationKey: "Discount",
              },
            },
          ]}
        />

        <MediaUploadModal
          controls={controls}
          onImgUpload={(v, raw) => {
            if (raw) handleChange("thumbnail", raw);
          }}
        />
      </div>
    );
  }
);
