import { DesignPlacement, DesignType } from "@features/API";
import {
  AdminListTable,
  AdminTableCellTypeEnum,
  Badge,
  Button,
  CloseIcon,
  EditIcon,
  HStack,
  Select,
  SelectOption,
  useAdminGetDesignsQuery,
  usePaginationControls,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, useForm } from "utils";

const slideshow = () => {
  const { visit, getCurrentPath, getParam, back } = useRouting();
  const type = getParam("type") as DesignType;

  const { t } = useTranslation();

  const validType = Object.values(DesignType).includes(type);
  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetDesignsQuery>[0]
  >(
    { pagination },
    { pagination, type: validType ? type : DesignType.Slideshow }
  );
  const { data: slideShows } = useAdminGetDesignsQuery(form);
  React.useEffect(() => {
    if (!validType) {
      back();
    }
  }, []);

  if (!validType) {
    return null;
  }

  return (
    <AdminListTable
      pagination={controls}
      title={t("Admin") + " " + t(type) + " " + t("list")}
      headers={[
        {
          type: AdminTableCellTypeEnum.image,
          value: t("Photo"),
        },
        {
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("name"),
          value: t("Name"),
        },
        {
          type: AdminTableCellTypeEnum.custom,
          value: t("Placement"),
          custom: (
            <Select
              {...inputProps("placement", "value", "onOptionChange", (e) => e)}
            >
              {Object.values(DesignPlacement).map((v, i) => (
                <SelectOption key={i} value={v}>
                  {v}
                </SelectOption>
              ))}
            </Select>
          ),
        },
        {
          value: t("Action"),
        },
      ]}
      data={mapArray(slideShows, (v) => ({
        id: v.id,
        cols: [
          {
            type: AdminTableCellTypeEnum.image,
            value: v.src,
          },
          {
            value: v.name,
          },
          {
            custom: (
              <HStack className="flex-wrap">
                {v.placement.map((e) => (
                  <Badge>{e}</Badge>
                ))}
              </HStack>
            ),
          },
          {
            actionBtns: [
              <Button
                onClick={() => {
                  visit((r) =>
                    r.addPath(getCurrentPath()).addPath("edit").addPath(v.id)
                  );
                }}
                center
                className="p-2"
              >
                <EditIcon />
              </Button>,
              <Button onClick={() => {}} center className="p-2">
                <CloseIcon />
              </Button>,
            ],
          },
        ],
      }))}
    />
  );
};

export default slideshow;
