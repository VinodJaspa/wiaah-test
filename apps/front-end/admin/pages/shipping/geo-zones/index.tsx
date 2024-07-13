import {
  AdminGetShippingSettingsQuery,
  Button,
  Checkbox,
  EditIcon,
  Input,
  ListIcon,
  Pagination,
  PlusIcon,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  useAdminGetShippingSettings,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { useRouting } from "routing";
import { ShippingType } from "@features/API";

const GeoZones: NextPage = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();

  const { controls, pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetShippingSettings>[0]
  >({ pagination }, { pagination });
  const { data: _zones } = useAdminGetShippingSettings(form);
  const zones = FAKE_GEO_ZONES;

  return (
    <section>
      <div className="flex gap-1 py-4 justify-end">
        <Button center className="w-8 h-8">
          <PlusIcon />
        </Button>
        <Button center className="w-8 h-8" colorScheme="danger">
          <TrashIcon />
        </Button>
      </div>

      <div className="border">
        <div className="p-4 border-b border-b-gray-300 flex items-center gap-2">
          <ListIcon />
          <p>{t("Shipping List")}</p>
        </div>
        <TableContainer>
          <Table className="w-full">
            <THead>
              <Tr>
                <Th>
                  <Checkbox />
                </Th>
                <Th>{t("Geo Zone Name")}</Th>
                <Th>{t("Description")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th>
                  <Input {...inputProps("name")} />
                </Th>
                <Th>
                  <Input {...inputProps("description")} />
                </Th>
                <Th></Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(zones, ({ id, description, name }) => (
                <Tr>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>{name}</Td>
                  <Td>{description}</Td>
                  <Td>
                    <Button
                      onClick={() =>
                        visit((r) =>
                          r
                            .addPath(getCurrentPath())
                            .addPath("form")
                            .addPath(id)
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td>
                  <></>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </TableContainer>
        <Pagination controls={controls} />
      </div>
    </section>
  );
};

export default GeoZones;

const FAKE_GEO_ZONES: AdminGetShippingSettingsQuery["getShippingGeoZoneRules"] =
  [
    {
      __typename: "ShippingTypeRule",
      id: "1",
      type: ShippingType.Free,
      name: "Standard Shipping",
      description: "Standard shipping rules and zones",
    },
    {
      __typename: "ShippingTypeRule",
      id: "2",
      type: ShippingType.Paid,
      name: "Express Shipping",
      description: "Express shipping rules and zones",
    },
  ];
