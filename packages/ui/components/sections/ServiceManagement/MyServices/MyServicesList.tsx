import React from "react";
import { useTranslation } from "react-i18next";
import {
  useGetMyServicesQuery,
  MyServicesCtx,
  Button,
  useCursorScrollPagination,
  ScrollCursorPaginationWrapper,
  Table,
  THead,
  Td,
  Tr,
  Image,
  useGetMyShopType,
  TrashIcon,
  EditIcon,
  Checkbox,
  Modal,
  ModalContent,
  ModalFooter,
  HStack,
  useDeleteServiceMutation,
  useUserData,
} from "@UI";
import { ServiceType } from "@features/API";
export interface MyServicesListProps {}

export const UserServicesList: React.FC<{ accountId: string }> = () => {
  const [deleteId, setDeleteId] = React.useState<string>();

  const { mutate, isLoading: deleteLoading } = useDeleteServiceMutation();

  const { AddNewService, EditService } = React.useContext(MyServicesCtx);

  const { controls, props, getHasMore, getNextCursor } =
    useCursorScrollPagination({ take: 15 });

  const { data: res } = useGetMyServicesQuery(props, {
    onSuccess(data) {
      getHasMore(data.hasMore || false);
      getNextCursor(data.cursor);
    },
  });

  const { t } = useTranslation();

  const { data } = useGetMyShopType();

  const showOn = (v: ServiceType[]) =>
    v.includes((data?.type || "") as ServiceType);

  return (
    <div className="flex flex-col gap-8 w-full">
      <ScrollCursorPaginationWrapper controls={controls}>
        <Table>
          <THead>
            <Td></Td>
            <Td>{t("Image")}</Td>
            <Td>
              {(() => {
                switch (data?.type) {
                  case ServiceType.Hotel:
                    return `${t("Room")}`;
                  case ServiceType.Restaurant:
                    return `${t("Table")}`;

                  case ServiceType.BeautyCenter:
                    return `${t("Treatment Seat")}`;

                  case ServiceType.HealthCenter:
                    return `${t("Doctor")}`;

                  case ServiceType.HolidayRentals:
                    return `${t("Property")}`;

                  case ServiceType.Vehicle:
                    return `${t("Vehicle")}`;

                  default:
                    return t("Service");
                }
              })()}
            </Td>
            <Td>{t("Price")}</Td>
            {showOn([ServiceType.Restaurant]) ? (
              <>
                <Td>{t("Menu type")}</Td>
              </>
            ) : null}
            {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
              <>
                <Td>{t("Bedroom")}</Td>
                <Td>{t("Beds")}</Td>
                <Td>{t("Bathroom")}</Td>
              </>
            ) : null}
            {showOn([ServiceType.HealthCenter]) ? (
              <>
                <Td>{t("Speciality")}</Td>
              </>
            ) : null}
            {showOn([ServiceType.BeautyCenter]) ? (
              <>
                <Td>{t("Category")}</Td>
              </>
            ) : null}
            <Td>{t("Date")}</Td>
            <Td>{t("action")}</Td>
          </THead>
        </Table>
        {res
          ? res.data.map((service, i) => {
              return (
                <Tr>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>
                    <Image src={service.thumbnail} className="w-24 h-16" />
                  </Td>
                  <Td>{service.name}</Td>
                  <Td>{service.price}</Td>
                  {showOn([ServiceType.Restaurant]) ? (
                    <>
                      <Td>{service.menuType}</Td>
                    </>
                  ) : null}
                  {showOn([ServiceType.Hotel]) ? (
                    <>
                      <Td>{service.num_of_rooms}</Td>
                      <Td>{service.beds}</Td>
                      <Td>{service.bathrooms}</Td>
                    </>
                  ) : null}
                  {showOn([ServiceType.HealthCenter]) ? (
                    <>
                      <Td>{service.speciality}</Td>
                    </>
                  ) : null}
                  {showOn([ServiceType.BeautyCenter]) ? (
                    <>
                      <Td>{service.treatmentCategory}</Td>
                    </>
                  ) : null}
                  <Td>{new Date(service.createdAt).toDateString()}</Td>
                  <Td>
                    <Button
                      onClick={() => setDeleteId(service.id)}
                      center
                      className="p-2"
                      colorScheme="danger"
                    >
                      <TrashIcon />
                    </Button>
                    <Button
                      onClick={() => EditService(service.id)}
                      center
                      className="p-2"
                    >
                      <EditIcon />
                    </Button>
                  </Td>
                </Tr>
              );
            })
          : null}
      </ScrollCursorPaginationWrapper>
      <Button onClick={() => AddNewService()} className="self-end">
        {t("Add new service")}
      </Button>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(undefined)}>
        <ModalContent>
          <p className="font-semibold text-xl">
            {t("Are you sure you wish to delete the service")}:{" "}
            {res?.data.find((v) => v.id === deleteId)?.name || ""}
          </p>
          <ModalFooter>
            <HStack className="justify-end">
              <Button
                loading={deleteLoading}
                onClick={() => mutate({ id: deleteId! })}
                colorScheme="danger"
              >
                {t("Delete")}
              </Button>
              <Button
                loading={deleteLoading}
                onClick={() => setDeleteId(undefined)}
              >
                {t("Cancel")}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export const MyServicesList: React.FC<MyServicesListProps> = () => {
  const { user } = useUserData();

  return <UserServicesList accountId={user?.id!} />;
};
