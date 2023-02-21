import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Checkbox,
  EditIcon,
  ListIcon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  ItemsPagination,
  usePaginationControls,
  Button,
  Input,
  useAdminGetSiteInformationsQuery,
} from "ui";
import { mapArray, useForm } from "utils";

export default () => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();

  const { form } = useForm<
    Parameters<typeof useAdminGetSiteInformationsQuery>[0]
  >({ pagination }, { pagination });
  const { data: info } = useAdminGetSiteInformationsQuery(form);

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4 w-full shadow-lg border p-2 rounded-lg">
        <div className="flex items-center text-xl font-bold gap-2">
          <ListIcon className="text-base" />
          <p>{t("Information List")}</p>
        </div>
        <Table
          TrProps={{ className: "" }}
          TdProps={{ className: "border" }}
          ThProps={{ className: "whitespace-nowrap border" }}
          className="w-full"
        >
          <THead>
            <Th align="left">
              <div className="flex w-full items-center gap-4">
                <Checkbox />
                <p>{t("Information Name")}</p>
              </div>
            </Th>
            <Th>{t("Sort Order")}</Th>
            <Th>{t("Action")}</Th>
            <Tr>
              <Th>
                <Input placeholder={t("Type Category name")} />
              </Th>
              <Th>
                <Input type="number" />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(info, ({ id, title, sortOrder }, i) => (
              <Tr>
                <Td className="w-[99%]">
                  <div className="flex items-center gap-4 font-semibold">
                    <Checkbox />
                    <p>{title}</p>
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
                          .addPath(id)
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
