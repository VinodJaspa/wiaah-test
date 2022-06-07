import { ServiceType } from "dto";
import React from "react";
import { useTranslation } from "react-i18next";
import { GiHouse, GiTalk } from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa";
import { TranslationTextType } from "types";
import { SectionHeader, CheckMarkStepper, Button, TranslationText } from "ui";
import { runIfFn } from "utils";
import { Form, Formik } from "formik";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import {
  FormikInput,
  Textarea,
  MediaUploadModal,
  useFileUploadModal,
  HashTagInput,
  SubCategorySelect,
  StepperFormController,
  StepperFormHandler,
} from "ui";
import { FileRes } from "utils";
import * as yup from "yup";

export interface AddNewServiceProps {}

const testSchema = yup.object().shape({});

export const AddNewService: React.FC<AddNewServiceProps> = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("add_new_service", "Add New Service")} />
      <StepperFormController stepsNum={3} onFormComplete={() => {}}>
        <CheckMarkStepper
          currentStepIdx={currentStep}
          onStepChange={(step) => setCurrentStep(step)}
          steps={[
            {
              key: "selectServiceType",
              stepComponent: (
                <ChooseServiceType
                  ServicesInfo={serviceTypes}
                  onServiceChoosen={(key) => {}}
                />
              ),
              stepName: {
                translationKey: "first",
                fallbackText: "First",
              },
            },
            {
              key: "two",
              stepComponent: (
                <StepperFormHandler
                  validationSchema={testSchema}
                  handlerKey="generalDetails"
                >
                  {({ validate }) => (
                    <ServiceGeneralDetails onChange={validate} />
                  )}
                </StepperFormHandler>
              ),
              stepName: {
                translationKey: "two",
                fallbackText: "Two",
              },
            },
            {
              key: "three",
              stepComponent: <div>Three</div>,
              stepName: {
                translationKey: "three",
                fallbackText: "Three",
              },
            },
          ]}
        />
      </StepperFormController>
    </div>
  );
};

const serviceTypes: ServiceSelectingInfo[] = [
  {
    serviceIcon: GiHouse,
    serviceKey: "placeBooking",
    serviceDescription: {
      translationKey: "place_booking_service_selecting_description",
      fallbackText: "put some place up for rent",
    },
    serviceName: {
      translationKey: "place_book",
      fallbackText: "Place Book",
    },
  },
  {
    serviceIcon: GiTalk,
    serviceKey: "rendez-vous",
    serviceDescription: {
      translationKey: "book_appointment_service_selecting_description",
      fallbackText:
        "offer your experince as an appointment to talk and discuss",
    },
    serviceName: {
      translationKey: "rendez-vous",
      fallbackText: "rendez-vous",
    },
  },
  {
    serviceIcon: FaMotorcycle,
    serviceKey: "thingsRenting",
    serviceDescription: {
      translationKey: "things_renting_service_selecting_description",
      fallbackText: "put some of your unused things or tools for rent",
    },
    serviceName: {
      translationKey: "things_renting",
      fallbackText: "Things renting",
    },
  },
];

export type ServiceSelectingInfo = {
  serviceIcon: React.ReactNode;
  serviceKey: ServiceType;
  serviceName: TranslationTextType;
  serviceDescription: TranslationTextType;
};

export interface ChooseServiceTypeProps {
  ServicesInfo: ServiceSelectingInfo[];
  onServiceChoosen: (serviceKey: string) => any;
}

export const ChooseServiceType: React.FC<ChooseServiceTypeProps> = ({
  ServicesInfo,
  onServiceChoosen,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h1 className="text-xl font-bold">
        {t("select_your_type_of_service", "Select your type of service")}
      </h1>

      <div className="grid grid-cols-3">
        {ServicesInfo.map((service, i) => (
          <ServiceSelectingCard serviceInfo={service} key={i} />
        ))}
      </div>
    </div>
  );
};

export interface ServiceSelectingCardProps {
  serviceInfo: ServiceSelectingInfo;
}

export const ServiceSelectingCard: React.FC<ServiceSelectingCardProps> = ({
  serviceInfo,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-48 min-h-[15rem] justify-between flex-col items-center gap-4">
      <div className="text-8xl text-primary">
        {runIfFn(serviceInfo.serviceIcon, {})}
      </div>
      <div className="flex flex-col gap-4">
        <TranslationText
          className="text-center font-semibold"
          translationObject={serviceInfo.serviceName}
        />
        <TranslationText
          className="text-center text-gray-500"
          translationObject={serviceInfo.serviceDescription}
        />
      </div>
      <Button className="whitespace-nowrap">
        {t("list_your_property", "List your property")}
      </Button>
    </div>
  );
};

export interface ServiceGeneralDetailsProps {
  onChange?: (data: Record<string, any>) => any;
}

const MAX_PRODUCTS_IMAGE = 4;

export const ServiceGeneralDetails: React.FC<ServiceGeneralDetailsProps> = ({
  onChange,
}) => {
  const { uploadImage, uploadVideo } = useFileUploadModal();
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values }) => {
          onChange && onChange(values);
          return (
            <Form className="w-full flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {t("name_&_description", "Name & Description")}
              </span>
              <FormikInput
                name="description"
                as={Textarea}
                placeholder={t(
                  "the_description_of_service",
                  "The Description of the serivce"
                )}
              />
              <FormikInput
                name={"starts"}
                placeholder={t("number_of_stars", "Number of stars")}
              />
              <FormikInput
                name="metaTagDescription"
                className="bg-white"
                as={Textarea}
                placeholder={t("meta_tag_description", "Meta Tag Description")}
              />
              <FormikInput
                name="metaTagKeyword"
                className="bg-white"
                as={Textarea}
                placeholder={t("meta_tag_Keyword", "Meta Tag Keyword")}
              />
              <FormikInput
                name="ServiceTag"
                className="bg-white"
                as={Textarea}
                placeholder={t("service_tag", "Service Tag")}
              />

              <span className="text-2xl font-semibold">
                {t("price_&_attributes", "Price & Attributes")}
              </span>
              <FormikInput
                name="price"
                placeholder={t("price_by_night", "Price by night")}
              />

              <SubCategorySelect />

              <FormikInput
                name="quantity"
                type={"number"}
                placeholder={t("quantity", "Quantity")}
              />
              <HashTagInput />
              <p className="text-2xl font-semibold">{t("file", "File")}</p>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">
                  {t("upload_video", "Upload Video")}
                </p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  <div
                    onClick={() => {
                      uploadVideo();
                    }}
                    className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
                  >
                    <HiVideoCamera className="text-4xl text-primary" />
                  </div>
                  {videos.map((vid, i) => (
                    <div className="w-32 h-32">
                      <video
                        className="w-full h-full object-cover"
                        key={i}
                        //@ts-ignore
                        src={vid}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">
                  {t("upload_images", "Upload Images")}
                </p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  {[...Array(MAX_PRODUCTS_IMAGE)].map((_, i) => (
                    <div
                      onClick={() => {
                        uploadImage();
                      }}
                      className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
                    >
                      {images[i] ? (
                        <>
                          <img
                            className="w-full h-full object-cover"
                            key={i}
                            //@ts-ignore
                            src={images[i]}
                          />
                        </>
                      ) : (
                        <HiFolderAdd className="text-4xl text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <MediaUploadModal
                multiple
                onVidUpload={(res) => {
                  setVideos((state) => [...state, res]);
                }}
                onImgUpload={(res) =>
                  setImages((images) => {
                    if (images.length >= MAX_PRODUCTS_IMAGE) return images;
                    return [...images, res];
                  })
                }
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
