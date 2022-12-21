import {
  Button,
  Checkbox,
  EditIcon,
  Input,
  ListIcon,
  Pagination,
  PlusIcon,
  PriceDisplay,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useRouting } from "routing";

interface zone {
  id: string;
  name: string;
  description: string;
}

const zones: zone[] = [
  {
    id: "1",
    name: "Uk Shipping",
    description: "uk shipping zones",
  },
  {
    id: "2",
    name: "Uk Vat Zone",
    description: "UK Vat",
  },
  {
    id: "1",
    name: "Uk Shipping",
    description: "uk shipping zones",
  },
  {
    id: "2",
    name: "Uk Vat Zone",
    description: "UK Vat",
  },
  {
    id: "1",
    name: "Uk Shipping",
    description: "uk shipping zones",
  },
  {
    id: "2",
    name: "Uk Vat Zone",
    description: "UK Vat",
  },
];

const GeoZones: NextPage = () => {
  const { t } = useTranslation();
  const { back, getCurrentPath, visit } = useRouting();
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
          <p>{t("Coupon List")}</p>
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
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th></Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(zones, ({ description, name, id }) => (
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
        <Pagination />
      </div>
    </section>
  );
};

export default GeoZones;
