import {
  Avatar,
  Button,
  EditIcon,
  getRandomImage,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  ListIcon,
  Pagination,
  PlusIcon,
  SearchIcon,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useRouting } from "routing";

interface Collaboration {
  name: string;
  id: string;
  status: string;
  thumbnail: string;
}

const collabs: Collaboration[] = [...Array(5)].map((_, i) => ({
  id: i.toString(),
  name: `collab name-${i}`,
  status: "Activated",
  thumbnail: getRandomImage(),
}));

const Collab: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  return (
    <section>
      <div className="border border-gray-300">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 p-4">
            <ListIcon />
            <p>{t("Collaboration List")}</p>
          </div>
          <div className="flex items-center gap-4">
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input flushed placeholder={t("Search")} />
            </InputGroup>
            <Button
              onClick={() =>
                visit((r) => r.addPath(getCurrentPath()).addPath("form"))
              }
              center
              className="gap-2"
            >
              <PlusIcon />
              <p>{t("Add")}</p>
            </Button>
          </div>
        </div>
        <div className="p-4">
          <TableContainer>
            <Table TdProps={{ align: "center" }} className="w-full">
              <THead>
                <Tr>
                  <Th>{t("Image")}</Th>
                  <Th>{t("Name")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Action")}</Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(collabs, ({ id, name, status, thumbnail }) => (
                  <Tr key={id}>
                    <Td>
                      <Avatar className="w-[3rem]" src={thumbnail} />
                    </Td>
                    <Td>{name}</Td>
                    <Td>{status}</Td>
                    <Td>
                      <HStack className="w-fit">
                        <Button center>
                          <EditIcon
                            onClick={() =>
                              visit((v) =>
                                v
                                  .addPath(getCurrentPath())
                                  .addPath("form")
                                  .addQuery({ id })
                              )
                            }
                          />
                        </Button>
                        <Button center colorScheme="danger">
                          <TrashIcon />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default Collab;
