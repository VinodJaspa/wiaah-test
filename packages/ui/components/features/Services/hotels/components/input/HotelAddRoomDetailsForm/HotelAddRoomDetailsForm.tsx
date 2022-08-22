import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { useReactPubsub } from "react-pubsub";
import {
  FormikInput,
  useGetHotelAmenitesQuery,
  MultiChooseInput,
  MultiChooseInputProps,
  Stack,
  Divider,
  CancelationPoliciesListInput,
  CancelationPoliciesListInputProps,
  ServiceExtrasInputList,
  ServiceExtrasInputListProps,
  Switch,
  MediaUploadModal,
} from "ui";
import { FileRes } from "utils";

const MAX_PRODUCTS_IMAGE = 4;

export interface HotelAddRoomDetailsFormProps {}

export const HotelAddRoomDetailsForm: React.FC<
  HotelAddRoomDetailsFormProps
> = () => {
  const { data: res } = useGetHotelAmenitesQuery();
  const { t } = useTranslation();
  const { emit } = useReactPubsub((keys) => keys.openFileUploadModal);
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ setFieldValue, values }) => {
        return (
          <Form className="w-full flex flex-col">
            <Stack col divider={Divider}>
              <FormikInput name="roomTitle" label={t("Room title")} />
              <FormikInput
                name="price"
                type={"number"}
                placeholder={t("Price by night")}
                label={t("Room price by night")}
              />

              <FormikInput<MultiChooseInputProps>
                as={MultiChooseInput}
                onChange={(amis) => setFieldValue("common_amenites", amis)}
                value={values["common_amenites"]}
                name="common_amenites"
                suggestions={res?.data.amenites}
                label={t("Room common amenites")}
              />

              <FormikInput<CancelationPoliciesListInputProps>
                as={CancelationPoliciesListInput}
                onChange={(v) => setFieldValue("cancelation_policies", v)}
                value={values["cancelation_policies"]}
                label={t("Cancelation Policies")}
                name="cancelation_policies"
              />

              <FormikInput<ServiceExtrasInputListProps>
                name="extras"
                label={t("Extras")}
                as={ServiceExtrasInputList}
                onChange={(v) => setFieldValue("extras", v)}
                value={values["extras"]}
              />

              <div className="flex gap-2">
                <p>{t("include taxes & fees")}</p>
                <Switch
                  checked={values["taxes_and_fees"]}
                  onChange={(checked) =>
                    setFieldValue("taxes_and_fees", checked)
                  }
                />
              </div>

              <p className="text-2xl font-semibold">{t("file", "File")}</p>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">{t("Upload Video")}</p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  <div
                    onClick={() => {
                      emit({ uploadType: "vid" });
                    }}
                    className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
                  >
                    <HiVideoCamera className="text-4xl text-primary" />
                  </div>
                  {videos.map((vid, i) => (
                    <div key={i} className="w-32 h-32">
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
                <p className="text-xl font-semibold">{t("Upload Images")}</p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  {[...Array(MAX_PRODUCTS_IMAGE)].map((_, i) => (
                    <div
                      onClick={() => {
                        emit({ uploadType: "img" });
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
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
