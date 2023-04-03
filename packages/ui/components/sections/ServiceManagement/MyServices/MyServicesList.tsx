import { usePagination } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useGetMyServicesQuery,
  MyServicesCtx,
  MyServicesCardSwitcher,
  Button,
  Stack,
  Divider,
} from "@UI";
export interface MyServicesListProps {}

export const MyServicesList: React.FC<MyServicesListProps> = ({}) => {
  const { AddNewService, EditService } = React.useContext(MyServicesCtx);
  const { page, take } = usePagination(4);
  const { data: res } = useGetMyServicesQuery({ page, take });
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 w-full">
      <Stack col divider={<Divider />}>
        {res
          ? res.data.map((service, i) => (
              <MyServicesCardSwitcher
                onEdit={() => {
                  EditService(service.id);
                }}
                onRemove={() => {}}
                data={service}
                key={i}
              />
            ))
          : null}
      </Stack>
      <Button onClick={() => AddNewService()} className="self-end">
        {t("Add new service")}
      </Button>
    </div>
  );
};
