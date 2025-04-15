import {
  ArrowRoundBack,
  Button,
  EditIcon,
  FlagIcon,
  Input,
  InputGroup,
  InputLeftElement,
  ListIcon,
  MediaUploadModal,
  SaveIcon,
  Select,
  SelectOption,
  useMediaUploadControls,
} from "ui";
import React from "react";
import { mapArray, WiaahLanguageCountriesIsoCodes } from "utils";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { BiCloudUpload } from "react-icons/bi";

const AddPartner = () => {
  const { t } = useTranslation();
  const { back } = useRouting();
  const { controls, uploadImage, uploadVideo } = useMediaUploadControls();
  return (
    <section>
      <div className="border border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl p-4">
            <ListIcon />
            <p>{t("Partners")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="fill-white text-white flex items-center gap-2">
              <SaveIcon />
              <p>{t("Save")}</p>
            </Button>
            <Button
              onClick={() => back()}
              colorScheme="white"
              className="text-black gap-2 flex items-center"
            >
              <ArrowRoundBack />
              <p>{t("Back")}</p>
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex w-full gap-12">
            <Button center className="w-8 h-8">
              <EditIcon />
            </Button>
            <div className="flex flex-col w-full gap-2">
              {mapArray(WiaahLanguageCountriesIsoCodes, (v) => (
                <InputGroup flushed>
                  <InputLeftElement>
                    <FlagIcon code={v} />
                  </InputLeftElement>
                  <Input />
                </InputGroup>
              ))}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4 w-full">
            <Input flushed placeholder={"Back Link"} />
            <Select className="w-full">
              <SelectOption value={"active"}>{t("Active")}</SelectOption>
              <SelectOption value={"inActive"}>{t("InActive")}</SelectOption>
            </Select>
            <label>
              <Button center className="gap-2">
                <BiCloudUpload />
                <p>{t("Upload Logo")}</p>
              </Button>
              <Input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPartner;
