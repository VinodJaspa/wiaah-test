import { usePagination } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  useGetMyServicesQuery,
  MyServicesCtx,
  AspectRatioImage,
  Badge,
  PlusIcon,
  Button,
} from "ui";
export interface MyServicesListProps {}

export const MyServicesList: React.FC<MyServicesListProps> = ({}) => {
  const { AddNewService } = React.useContext(MyServicesCtx);
  const { visit } = useRouting();
  const { page, take } = usePagination();
  const { data: res } = useGetMyServicesQuery({ page, take });
  const { t } = useTranslation();
  React.useEffect(() => {
    if (!res) return;
    if (res.data.length < 1) AddNewService();
  }, [res]);

  return (
    <div className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(10rem,15rem))] w-full">
      {res
        ? res.data.map((data, i) => (
            <div className="flex flex-col">
              <AspectRatioImage
                alt={data.title}
                src={data.thumbnail}
                ratio={4 / 6}
                className="rounded"
              >
                <Badge
                  className="absolute top-2 left-2"
                  value={data.type}
                  cases={{ success: data.type }}
                >
                  {t(
                    data.type
                      .substring(0, 1)
                      .toUpperCase()
                      .concat(data.type.substring(1).replace("_", " "))
                  )}
                </Badge>
              </AspectRatioImage>
              <div className="flex flex-col w-full gap-2 p-2">
                <p className="font-semibold lg:text-lg">{data.title}</p>

                <div className="w-full items-center justify-between flex">
                  <p className="font-bold">{t("Status")}:</p>
                  <Badge
                    value={data.status}
                    cases={{
                      success: "active",
                      fail: "banned",
                      info: "pending",
                      warning: "inActive",
                    }}
                  >
                    {data.status}
                  </Badge>
                </div>
                <Button
                  className="w-fit"
                  onClick={() =>
                    visit((routes) =>
                      routes
                        .addQuery({ s_type: data.type })
                        .addQuery({ s_id: data.id })
                        .addQuery({ s_section: "auto" })
                    )
                  }
                >
                  {t("Edit")}
                </Button>
              </div>
            </div>
          ))
        : null}
      <Badge
        onClick={() => AddNewService()}
        className="flex justify-center items-center cursor-pointer"
        variant="success"
      >
        <PlusIcon className="text-7xl text-primary border-primary" />
      </Badge>
    </div>
  );
};
