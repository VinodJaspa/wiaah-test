import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Button,
  Checkbox,
  EditIcon,
  Input,
  ListIcon,
  PlusIcon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
} from "ui";
import { mapArray, randomNum } from "utils";

const ServiceShopFilter = () => {
  const [filterGroupAsc, setFilterGroupAsc] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const filterGroups: {
    name: string;
    sortOrder: number;
    id: string;
  }[] = [...Array(10)].map((_, i) => ({
    name: `filter-${i}`,
    id: i.toString(),
    sortOrder: randomNum(5),
  }));

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Service Filters </title>
      </Head>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">{t("Filters")}</p>
          <div className="text-xl h-12 items-stretch flex gap-1 ">
            <Button
              onClick={() =>
                visit((r) =>
                  r.addPath(getCurrentPath({ noParams: true })).addPath("form"),
                )
              }
            >
              <PlusIcon />
            </Button>
            <Button colorScheme="danger">
              <TrashIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 border">
          <div className="px-4 text-lg py-2 border-b flex items-center gap-2">
            <ListIcon />
            <p>{t("Filter List")}</p>
          </div>

          <Table
            ThProps={{ align: "right" }}
            TdProps={{ align: "right", className: "border lg:min-w-[12rem]" }}
          >
            <THead>
              <Tr>
                <Th className="text-primary">
                  <div className="flex gap-2">
                    <Checkbox />
                    <div
                      onClick={() => setFilterGroupAsc((v) => !v)}
                      className="flex items-center gap-1"
                    >
                      <p>{t("Filter Group")}</p>
                      <span className="text-xl">
                        {filterGroupAsc ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      </span>
                    </div>
                  </div>
                </Th>
                <Th className="text-primary">{t("Sort Order")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th>
                  <Input placeholder={t("type filter name")} />
                </Th>
                <Th>
                  <Input type={"number"} />
                </Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(filterGroups, ({ id, name, sortOrder }) => (
                <Tr>
                  <Td className="w-full">
                    <div className="flex gap-2">
                      <Checkbox className="inline-block" />
                      <p>{name}</p>
                    </div>
                  </Td>
                  <Td>{sortOrder}</Td>
                  <Td>
                    <div className="w-fit h-12 text-lg flex items-stretch gap-1">
                      <Button>
                        <EditIcon
                          onClick={() =>
                            visit((r) =>
                              r
                                .addPath(getCurrentPath({ noParams: true }))
                                .addPath("form")
                                .addQuery({ filter_id: id }),
                            )
                          }
                        />
                      </Button>
                      <Button colorScheme="danger">
                        <TrashIcon />
                      </Button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ServiceShopFilter;
