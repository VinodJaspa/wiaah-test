import {
  AdminGetLanguagesQuery,
  Button,
  Checkbox,
  EditIcon,
  Input,
  ListIcon,
  Pagination,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useAdminGetLanguagesQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { useRouting } from "routing";
import Head from "next/head";

const LanguagesList: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, handleChange } = useForm<
    Parameters<typeof useAdminGetLanguagesQuery>[0]
  >({ pagination });
  const { data: _languages } = useAdminGetLanguagesQuery(form);
  const languages = FAKE_LANGUAGES;

  return (
    <React.Fragment>
      <Head>
        <title>Admin | System Language</title>
      </Head>
      <section>
        <div className="border border-gray-300">
          <div className="flex border-b border-gray-300 items-center gap-2 p-4">
            <ListIcon />
            <p>{t("Language List")}</p>
          </div>
          <div className="p-4">
            <TableContainer>
              <Table ThProps={{ align: "left" }} className="w-full">
                <THead>
                  <Tr>
                    <Th>
                      <Checkbox />
                    </Th>
                    <Th>{t("Language Name")}</Th>
                    <Th>{t("Code")}</Th>
                    <Th>{t("locale")}</Th>
                    <Th>{t("Sort Order")}</Th>
                    <Th>{t("Action")}</Th>
                  </Tr>
                  <Tr>
                    <Th></Th>
                    <Th>
                      <Input {...inputProps("name")} />
                    </Th>
                    <Th>
                      <Input {...inputProps("code")} />
                    </Th>
                    <Th>
                      <Input {...inputProps("locale")} />
                    </Th>
                    <Th></Th>
                  </Tr>
                </THead>
                <TBody>
                  {mapArray(
                    languages,
                    ({ code, id, name, sortOrder, enabled, locale }) => (
                      <Tr>
                        <Td>
                          <Checkbox />
                        </Td>
                        <Td>
                          <p>
                            {name}
                            {/* <span className="font-bold">
                            {isDefault ? `(${t("Default")})` : ""}
                          </span> */}
                          </p>
                        </Td>
                        <Td>{code}</Td>
                        <Td>{locale}</Td>
                        <Td>{sortOrder}</Td>
                        <Td>
                          <Button
                            onClick={() => {
                              visit((r) =>
                                r
                                  .addPath(getCurrentPath())
                                  .addPath("edit")
                                  .addPath(id),
                              );
                            }}
                          >
                            <EditIcon />
                          </Button>
                        </Td>
                      </Tr>
                    ),
                  )}
                </TBody>
              </Table>
            </TableContainer>
            <Pagination controls={controls} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LanguagesList;

const FAKE_LANGUAGES: AdminGetLanguagesQuery["adminGetLanguages"] = [
  {
    __typename: "Language",
    name: "English",
    id: "1",
    code: "en",
    enabled: true,
    locale: "en_US",
    sortOrder: 1,
  },
  {
    __typename: "Language",
    name: "Spanish",
    id: "2",
    code: "es",
    enabled: true,
    locale: "es_ES",
    sortOrder: 2,
  },
];
