import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Avatar, SectionHeader } from "ui";
import { useTranslation } from "react-i18next";
import { BlocklistUserInfo } from "types";

export interface BlocklistSectionProps {}

export const BlocklistSection: React.FC<BlocklistSectionProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full flex gap-8 flex-col">
      <SectionHeader sectionTitle={t("block_list", "Block List")} />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form className="h-full">
            <div className="h-full flex flex-col justify-between">
              <div className="flex gap-4 flex-col">
                <div className="font-bold w-full justify-between">
                  <span>{t("name", "Name")}</span>
                  <span>{t("status", "Status")}</span>
                </div>
                {blockList.map((user, i) => (
                  <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={user.name}
                        bgColor={"black"}
                        photoSrc={user.photo}
                      />
                      <span>{user.name}</span>
                    </div>
                    <Button colorScheme={"danger"}>
                      {t("unfollow", "Unfollow")}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end w-full">
                <Button className="px-8">{t("save", "Save")}</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const blockList: BlocklistUserInfo[] = [
  {
    name: "Wiaah",
    photo: "/wiaah_logo.png",
  },
  {
    name: "seller",
    photo: "/shop.jpeg",
  },
  {
    name: "buyer",
    photo: "/shop-2.jpeg",
  },
  {
    name: "username",
    photo: "/shop-3.jpeg",
  },
  {
    name: "wiaah",
    photo: "/place-1.jpg",
  },
  {
    name: "Wiaah",
    photo: "/place-2.jpg",
  },
];
