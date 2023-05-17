import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  AspectRatioImage,
  EditIcon,
  Divider,
  Input,
  Textarea,
  useUpdateMyShopMutation,
  HStack,
  FlagIcon,
  Button,
  useResponsive,
  ArrowLeftAlt1Icon,
  VideoCameraUplaodOutlineIcon,
  AspectRatio,
  useGetShopRawData,
  useGetMyProfileQuery,
  Image,
  TrashIcon,
  ImageUploadIcon,
  Badge,
  useMediaUploadControls,
  MediaUploadModal,
} from "@UI";
import {
  WiaahLanguageCountries,
  WiaahLanguageCountriesIsoCodes,
  mapArray,
  useForm,
} from "utils";
import { useRouting } from "@UI/../routing";

export interface EditServicePresentationSectionProps {}

export const EditServicePresentationSection: React.FC<
  EditServicePresentationSectionProps
> = () => {
  const { uploadImage, uploadVideo, controls } = useMediaUploadControls();
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { back } = useRouting();
  const { mutate } = useUpdateMyShopMutation();
  const { data: myProfile } = useGetMyProfileQuery();
  const { data } = useGetShopRawData(
    { id: myProfile?.ownerId! },
    { enabled: !!myProfile?.ownerId }
  );
  const [lang, setLang] = React.useState<string>(
    WiaahLanguageCountriesIsoCodes[0]
  );
  const { translationInputProps, handleChange, form } = useForm<
    Parameters<typeof mutate>[0]
  >(
    {
      userId: myProfile?.ownerId!,
      ...data,
    },
    { userId: myProfile?.ownerId }
  );

  const imagesData: {
    imageId: string;
    src: string;
  }[] = [
    {
      imageId: "132",
      src: "/post (1).jfif",
    },
    {
      imageId: "132",
      src: "/post (3).jfif",
    },
    {
      imageId: "132",
      src: "/post (4).jfif",
    },
    {
      imageId: "132",
      src: "/post (5).jfif",
    },
  ];

  const editImage = (idx: number) => {};
  const deleteImage = (src: string) => {};
  const handleSubmit = () => {};

  // TODO: upload media from gallery implementation

  return isMobile ? (
    <div className="flex flex-col gap-6">
      <MediaUploadModal />
      <HStack className="relative justify-center">
        <p className="text-lg font-semibold">{t("Service Presentation")}</p>
        <button onClick={() => back()}>
          <ArrowLeftAlt1Icon className="absolute left-1 top-1/2 -translate-y-1/2" />
        </button>
      </HStack>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {mapArray(WiaahLanguageCountries, ({ code, langId, name }) => (
          <button key={langId} onClick={() => setLang(langId)}>
            <div
              className={`${
                langId === lang ? "bg-primary" : ""
              }  px-2 py-1 rounded border border-primary`}
            >
              <HStack className="gap-1">
                <FlagIcon code={code} />
                <p
                  className={`${
                    langId === lang ? "text-white" : "text-black"
                  } text-xs font-medium`}
                >
                  {name}
                </p>
              </HStack>
            </div>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium">{t("Service name")}</p>
          <Input
            {...translationInputProps("name", lang)}
            placeholder={t("Service name")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium">{t("Description")}</p>
          <Input
            {...translationInputProps("description", lang)}
            placeholder={t("Description")}
          />
        </div>
      </div>
      <div className="p-3 flex flex-col gap-4 shadow">
        <p className="text-lg font-semibold">{t("Video")}</p>
        <div className="py-10 flex flex-col self-center items-center gap-4">
          <VideoCameraUplaodOutlineIcon className="text-6xl text-grayText" />
          <p className="font-semibold text-grayText">
            {t("Tap to upload from gallery")}
          </p>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-4 shadow">
        <p className="text-lg font-semibold">{t("Photos")}</p>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <AspectRatio ratio={1.2}>
              {Array.isArray(form.images) &&
              typeof form.images?.at(i) === "string" ? (
                <>
                  <Image
                    className="w-full h-full rounded-lg"
                    src={form.images?.at(i)}
                  />
                  <HStack className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 gap-4">
                    <button
                      className="bg-iconGray rounded-full w-8 h-8 bg-opacity-80"
                      onClick={() => editImage(i)}
                    >
                      <EditIcon className="text-white text-2xl" />
                    </button>
                    <button
                      className="bg-iconGray rounded-full w-8 h-8 bg-opacity-80"
                      onClick={() => deleteImage(form.images?.at(i) || "")}
                    >
                      <TrashIcon className="text-secondaryRed text-2xl" />
                    </button>
                  </HStack>
                </>
              ) : (
                <div className="rounded-lg w-full h-full flex flex-col justify-center items-center gap-4">
                  <ImageUploadIcon className="text-3xl text-grayText" />
                  <p className="text-xs px-12 text-center text-grayText font-semibold">
                    {t("Tap to upload from gallery")}
                  </p>
                </div>
              )}
            </AspectRatio>
          ))}
        </div>
        {form.images && form.images?.length < 3 ? (
          <p className="text-center text-xs font-medium text-secondaryRed">
            {t("Add at least 3 images*")}
          </p>
        ) : null}
      </div>

      <Button
        onClick={handleSubmit}
        colorScheme="darkbrown"
        className="font-semibold w-full"
      >
        {t("Done")}
      </Button>
    </div>
  ) : (
    <div className="flex flex-col pb-4 gap-8 w-full">
      <SectionHeader sectionTitle={t("Edit Service Presentation")} />
      <HStack>
        {mapArray(WiaahLanguageCountries, (v, i) => (
          <HStack
            className={`${
              lang === v.langId ? "border-b" : ""
            } border-primary p-2 cursor-pointer`}
            onClick={() => setLang(v.langId)}
            key={i}
          >
            <FlagIcon code={v.code} />
            <p>{v.name}</p>
          </HStack>
        ))}
      </HStack>
      <label>
        <p>{t("Name")}</p>
        <Input {...translationInputProps("name", lang)} />
      </label>

      <label>
        <p>{t("Description")}</p>
        <Textarea {...translationInputProps("description", lang)} />
      </label>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">{t("video")}</p>
        <Divider />
        <div className="w-48 rounded-xl overflow-hidden">
          <AspectRatioImage
            className="group"
            alt=""
            ratio={3 / 4}
            src={"/post (2).jfif"}
          >
            <div className="absolute transition-opacity top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto flex justify-center items-center">
              <EditIcon className="text-4xl cursor-pointer text-white" />
            </div>
          </AspectRatioImage>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">{t("Photos")}</p>
        <Divider />
        <div className="flex flex-wrap gap-8">
          {mapArray(imagesData, ({ imageId, src }, i) => (
            <div className="w-48 rounded-xl overflow-hidden">
              <AspectRatioImage
                className="group"
                alt=""
                ratio={3 / 4}
                src={src}
              >
                <div className="absolute transition-opacity top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto flex justify-center items-center">
                  <EditIcon className="text-4xl cursor-pointer text-white" />
                </div>
              </AspectRatioImage>
            </div>
          ))}
        </div>
      </div>
      <HStack className="justify-end">
        <Button onClick={() => {}}>{t("Update")}</Button>
      </HStack>
    </div>
  );
};
