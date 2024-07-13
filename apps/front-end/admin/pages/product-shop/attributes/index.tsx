import {
  AdminTableCellTypeEnum,
  Button,
  EditIcon,
  GetAdminProductAttributesQuery,
  SpinnerFallback,
  useAdminGetAttributesQuery,
  usePaginationControls,
} from "@UI";
import { AdminListTable } from "@components";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, useForm } from "utils";

const AttributesList: NextPage = () => {
  const { controls, pagination } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetAttributesQuery>[0]
  >(
    {
      name: "",
      pagination,
    },
    { pagination }
  );
  const {
    data: _data,
    isLoading,
    isError,
    error,
  } = useAdminGetAttributesQuery(form);
  const data = FAKE_PRODUCTS_ATTR;

  console.log({ error });

  return (
    <section>
      {/* ADD isLoading and isError when graphql is ready*/}
      <SpinnerFallback isLoading={false}>
        <AdminListTable
          pagination={controls}
          onAdd={() => {
            visit((r) => r.addPath(getCurrentPath()).addPath("form"));
          }}
          title={t("Profession")}
          headers={[
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Name"),
              inputProps: inputProps("name"),
            },
            {
              type: AdminTableCellTypeEnum.action,
            },
          ]}
          data={mapArray(data?.data, ({ id, name }) => ({
            id,
            cols: [
              {
                value: name,
              },

              {
                type: AdminTableCellTypeEnum.action,
                actionBtns: [
                  <Button
                    key={id}
                    onClick={() =>
                      visit((r) =>
                        r
                          .addPath(getCurrentPath())
                          .addPath("form")
                          .addQuery({ id })
                      )
                    }
                    center
                    className="w-8 h-8"
                  >
                    <EditIcon />
                  </Button>,
                ],
              },
            ],
          }))}
        />
      </SpinnerFallback>
    </section>
  );
};

export default AttributesList;

const FAKE_PRODUCTS_ATTR: GetAdminProductAttributesQuery["adminGetAttributes"] =
{
  __typename: "ProductAttributesPaginationResponse",
  hasMore: true,
  total: 2,
  data: [
    {
      __typename: "ProductAttribute",
      id: "attribute1",
      name: "Size",
    },
    {
      __typename: "ProductAttribute",
      id: "attribute2",
      name: "Color",
    },
  ],
};
