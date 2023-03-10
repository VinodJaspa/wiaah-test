import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,
  EditIcon,
  Input,
  ItemsPagination,
  ListIcon,
  RefreshIcon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  usePaginationControls,
  useGetServiceCategoriesQuery,
  getTranslationStateValue,
} from "ui";
import { mapArray } from "utils";

export default () => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();
  const [lang, setLang] = React.useState("en");
  const { data: categories, refetch } = useGetServiceCategoriesQuery();

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-2xl">{t("Categories")}</p>
        </div>
        <div onClick={() => refetch()} className="flex items-center gap-1">
          <span className="border text-lg flex justify-center items-center shadow rounded h-12 w-12">
            <RefreshIcon />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full shadow-lg border p-2 rounded-lg">
        <div className="flex items-center text-xl font-bold gap-2">
          <ListIcon className="text-base" />
          <p>{t("Category List")}</p>
        </div>
        <Table
          TrProps={{ className: "" }}
          TdProps={{ className: "border" }}
          ThProps={{ className: "whitespace-nowrap border" }}
          className="w-full"
        >
          <THead>
            <Tr>
              <Th align="left">
                <div className="flex w-full items-center gap-4">
                  {/* <Checkbox /> */}
                  <p>{t("Category Name")}</p>
                </div>
              </Th>
              <Th>{t("Sort Order")}</Th>
              <Th>{t("Action")}</Th>
            </Tr>
            <Tr>
              <Th>
                <Input placeholder={t("type category name")} />
              </Th>
              <Th>
                <Input type={"number"} />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(categories, ({ id, name, sortOrder }, i) => (
              <Tr>
                <Td className="w-[99%]">
                  <div className="flex items-center gap-4 font-semibold">
                    {/* <Checkbox /> */}
                    <p>
                      {name.find((v) => v.langId === lang)?.value ||
                        name[0]?.value}
                    </p>
                  </div>
                </Td>
                <Td>{sortOrder}</Td>
                <Td>
                  <Button
                    onClick={() =>
                      visit((r) =>
                        r
                          .addPath(getCurrentPath({ noParams: true }))
                          .addPath("form")
                          .addQuery({ category_id: id })
                      )
                    }
                    className="flex items-center justify-center  text-2xl h-12 w-12"
                  >
                    <EditIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <ItemsPagination controls={controls} />
      </div>
    </div>
  );
};
