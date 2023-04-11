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
} from "@UI";
import {
  WiaahLanguageCountries,
  WiaahLanguageCountriesIsoCodes,
  mapArray,
  useForm,
} from "utils";

export interface EditServicePresentationSectionProps {}

export const EditServicePresentationSection: React.FC<
  EditServicePresentationSectionProps
> = () => {
  const { t } = useTranslation();
  const { translationInputProps } = useForm<Parameters<typeof mutate>[0]>({});
  const { mutate } = useUpdateMyShopMutation();
  const [lang, setLang] = React.useState<string>("en");

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

  return (
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
