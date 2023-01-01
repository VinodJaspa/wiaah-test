import {
  Button,
  Checkbox,
  EditIcon,
  Input,
  InputRequiredStar,
  ListIcon,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useRouting } from "routing";

interface LanguageRecord {
  name: string;
  code: string;
  sortOrder: number;
  isDefault: boolean;
  id: string;
}

const languages: LanguageRecord[] = [
  {
    id: "1",
    code: "EN",
    name: "English",
    sortOrder: 1,
    isDefault: true,
  },
  {
    id: "1",
    code: "FR",
    name: "French",
    sortOrder: 1,
    isDefault: false,
  },
];

const LanguagesList: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  return (
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
                  <Th>{t("Sort Order")}</Th>
                  <Th>{t("Action")}</Th>
                </Tr>
                <Tr>
                  <Th></Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(
                  languages,
                  ({ code, id, isDefault, name, sortOrder }) => (
                    <Tr>
                      <Td>
                        <Checkbox />
                      </Td>
                      <Td>
                        <p>
                          {name}
                              <span className="font-bold">
                          {
                            isDefault ? (
                              `(${t(
                                "Default"
                              )})`
                            ) : (
                              ""
                            )
                          }
                              </span>
                        </p>
                      </Td>
                      <Td>{code}</Td>
                      <Td>{sortOrder}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            visit((r) =>
                              r
                                .addPath(getCurrentPath())
                                .addPath("edit")
                                .addPath(id)
                            );
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </Td>
                    </Tr>
                  )
                )}
              </TBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
};

export default LanguagesList;
