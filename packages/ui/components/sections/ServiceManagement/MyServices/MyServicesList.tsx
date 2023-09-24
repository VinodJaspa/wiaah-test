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
  Th,
  TBody,
} from "@UI";
import { ServiceType } from "@features/API";
import { setTestid } from "utils";
export interface MyServicesListProps {}

export const UserServicesList: React.FC<{ accountId: string }> = () => {
  const [deleteId, setDeleteId] = React.useState<string>();

  const { mutate, isLoading: deleteLoading } = useDeleteServiceMutation();

  const { AddNewService, EditService } = React.useContext(MyServicesCtx);

  const { controls, props, getHasMore, getNextCursor } =
    useCursorScrollPagination({ take: 15 });

  const { data: res } = useGetMyServicesQuery(props, {
    onSuccess(data) {
      getHasMore(data?.hasMore || false);
      getNextCursor(data?.cursor);
    },
  });

  const { t } = useTranslation();

  const { data } = useGetMyShopType();
  const serviceType = data?.type || ServiceType.Hotel;

  const showOn = (v: ServiceType[]) => v.includes(serviceType);

  return (
    <div className="flex flex-col gap-8 w-full">
      <Button
        {...setTestid("add-new-service-btn")}
        onClick={() => AddNewService()}
        className="self-end mr-4"
      >
        {t("Add new service")}
      </Button>
      <ScrollCursorPaginationWrapper controls={controls}>
        <Table TdProps={{ align: "center" }} className="w-full">
          <THead>
            <Th align="center">
              <Checkbox></Checkbox>
            </Th>
            <Th>{t("Image")}</Th>
            <Th>
              {(() => {
                switch (serviceType) {
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
            </Th>
            <Th>{t("Price")}</Th>
            {showOn([ServiceType.Restaurant]) ? (
              <>
                <Th>{t("Menu type")}</Th>
              </>
            ) : null}
            {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
              <>
                <Th>{t("Bedroom")}</Th>
                <Th>{t("Beds")}</Th>
                <Th>{t("Bathroom")}</Th>
              </>
            ) : null}
            {showOn([ServiceType.HealthCenter]) ? (
              <>
                <Th>{t("Speciality")}</Th>
              </>
            ) : null}
            {showOn([ServiceType.BeautyCenter]) ? (
              <>
                <Th>{t("Category")}</Th>
              </>
            ) : null}
            <Th>{t("Date")}</Th>
            <Th align="right">{t("Action")}</Th>
          </THead>
          <TBody>
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
                      {showOn([
                        ServiceType.Hotel,
                        ServiceType.HolidayRentals,
                      ]) ? (
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
                      <Td align="right">
                        <HStack>
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
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </TBody>
        </Table>
      </ScrollCursorPaginationWrapper>

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
