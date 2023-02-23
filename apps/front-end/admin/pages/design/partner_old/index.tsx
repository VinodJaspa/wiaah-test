import {
  Avatar,
  Button,
  EditIcon,
  HStack,
  ListIcon,
  PlusIcon,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  Pagination,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "placeholder";
import { mapArray } from "utils";
import { useRouting } from "routing";

interface Partner {
  id: string;
  logo: string;
  name: string;
  status: string;
  backlink: string;
}

const partners: Partner[] = [...Array(5)].map((_, i) => ({
  id: i.toString(),
  backlink: `test link-${i}`,
  logo: getRandomImage(),
  name: `test name -${i}`,
  status: "Active",
}));

const Partner: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  return (
    <section>
      <div className="border border-gray-300">
        <div className="flex p-4 justify-between">
          <div className="flex items-center text-xl gap-2">
            <ListIcon />
            <p>{t("Partners List")}</p>
          </div>
          <Button
            onClick={() =>
              visit((r) => r.addPath(getCurrentPath()).addPath("add"))
            }
            center
          >
            <PlusIcon /> {t("Add")}
          </Button>
        </div>
        <div className="p-4">
          <TableContainer>
            <Table className="w-full">
              <THead>
                <Tr>
                  <Th>{t("Logo")}</Th>
                  <Th>{t("Name")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Backlink")}</Th>
                  <Th>{t("Action")}</Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(partners, ({ backlink, id, logo, name, status }) => (
                  <Tr>
                    <Td>
                      <Avatar className="w-[3rem]" src={logo} />
                    </Td>
                    <Td>{name}</Td>
                    <Td>{status}</Td>
                    <Td>{backlink}</Td>
                    <Td align="right">
                      <HStack className="justify-end">
                        <Button className="w-8 h-8 p-[0px]" center>
                          <EditIcon />
                        </Button>
                        <Button
                          className="px-[0rem] text-xl w-8 h-8"
                          colorScheme="danger"
                          center
                        >
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

export default Partner;
