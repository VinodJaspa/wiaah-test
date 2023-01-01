import { Form, Formik } from "formik";
import React from "react";
import { Button, Avatar, SectionHeader, SpinnerFallback } from "@UI";
import { useGetBlockedUsersQuery, useUnFollowUserMutation } from "@UI";
import { useTranslation } from "react-i18next";

export interface BlocklistSectionProps {}

export const BlocklistSection: React.FC<BlocklistSectionProps> = ({}) => {
  const { t } = useTranslation();
  const { data: blockList, isLoading, isError } = useGetBlockedUsersQuery();
  const { mutate } = useUnFollowUserMutation();
  return (
    <div className="h-full w-full flex gap-8 flex-col">
      <SectionHeader sectionTitle={t("block_list", "Block List")} />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form className="h-full">
            <div className="h-full flex flex-col gap-4 justify-between">
              <div className="flex gap-4 flex-col">
                <div className="font-bold w-full flex justify-between">
                  <span>{t("name", "Name")}</span>
                  <span>{t("status", "Status")}</span>
                </div>
                <SpinnerFallback isLoading={isLoading} isError={isError}>
                  {Array.isArray(blockList)
                    ? blockList.map((user, i) => (
                        <div
                          data-testid={"BlockedUserCard"}
                          key={i}
                          className="flex items-center gap-2 justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar name={user.name} src={user.photo} />
                            <span>{user.name}</span>
                          </div>
                          <Button
                            data-testid={"UnFollowBtn"}
                            onClick={() => {
                              console.log("user", user);
                              mutate(user);
                            }}
                            className="w-24"
                            colorScheme={"danger"}
                          >
                            {t("unfollow", "Unfollow")}
                          </Button>
                        </div>
                      ))
                    : null}
                </SpinnerFallback>
              </div>
              <div className="flex items-center justify-end w-full">
                <Button className="w-24">{t("save", "Save")}</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
