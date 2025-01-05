import {
  AspectRatioImage,
  Button,
  EditIcon,
  Input,
  InputRequiredStar,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "placeholder";
import Head from "next/head";

const EditProfile: NextPage = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Head>
        <title>Admin | System Edit Profile</title>
      </Head>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex justify-end">
          <Button className="fill-white text-white">
            <SaveIcon />
          </Button>
        </div>
        <div className="border border-gray-300 p-4">
          <div className="flex items-center gap-2 p-4">
            <EditIcon />
            <p>{t("Edit Your Profile")}</p>
          </div>
          <div className="p-4">
            <Table
              className="w-full"
              TdProps={{
                className:
                  "odd:flex odd:items-center odd:w-1/4 odd:whitespace-nowrap",
              }}
            >
              <TBody>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("Username")}</p>
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("First Name")}</p>
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("Last Name")}</p>
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("E-Mail")}</p>
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("Staff Role")}</p>
                  </Td>
                  <Td>
                    <Select>
                      <SelectOption value={"admin"}>{t("Admin")}</SelectOption>
                      <SelectOption value={"mod"}>
                        {t("Moderator")}
                      </SelectOption>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <p>{t("Image")}</p>
                  </Td>
                  <Td>
                    <div className="w-48 rounded-xl overflow-hidden">
                      <AspectRatioImage
                        className="group"
                        alt=""
                        ratio={3 / 4}
                        src={getRandomImage()}
                      >
                        <div className="absolute transition-opacity top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto flex justify-center items-center">
                          <EditIcon className="text-4xl cursor-pointer text-white" />
                        </div>
                      </AspectRatioImage>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("Password")}</p>
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    <p>{t("Confirm")}</p>
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default EditProfile;
