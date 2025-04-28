import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Table,
  Tr,
  Td,
  Th,
  TBody,
  TableContainer,
  SectionHeader,
  useGetMyShippingRules,
  HStack,
  EditIcon,
  TrashIcon,
  Checkbox,
  THead,
  PlusIcon,
  BasicPagination,
  usePaginationControls,
} from "@UI";
import { ShippingSettingsContext } from "../ShippingSettingsSection";

export const ShippingSettings: React.FC = () => {
  const { addNew, edit } = React.useContext(ShippingSettingsContext);
  const { isMobile } = useResponsive();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { controls, pagination } = usePaginationControls();

  const { data } = useGetMyShippingRules({ ...pagination });

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("shipping_settings", "Shipping Settings")}>
        {isMobile ? (
          <div className="bg-primary w-8 h-8 rounded-full flex justify-center items-center">
            <PlusIcon className="text-white" onClick={addNew} />
          </div>
        ) : (
          <Button onClick={addNew} outline>
            {t("Add Shipping")}
          </Button>
        )}
      </SectionHeader>
      <p className="lg:text-xl px-4 py-2">
        {t("Define your shipping regions and how rates are calculated.")}{" "}
        <span>
          <button className="text-primary cursor-pointer">
            {t("Learn more")}
          </button>
        </span>
      </p>
      <TableContainer>
        <Table
          TdProps={{
            className:
              "text-grayText whitespace-nowrap border-b font-medium border-y-grayText border-opacity-50",
          }}
          ThProps={{ className: "whitespace-nowrap" }}
          className="w-full"
        >
          <THead className="bg-primary-50">
            <Tr>
              <Th>{t("Edit")}</Th>
              <Th>{t("Shipping Name")}</Th>
              <Th>{t("Processing Time")}</Th>
              <Th>{t("Listings")}</Th>
              <Th>{t("Action")}</Th>
            </Tr>
          </THead>
          <TBody>
            {data
              ? data.map((method, i) => (
                  <Tr key={method.id + i}>
                    <Td>
                      <button
                        onClick={() => {
                          edit(method.id);
                        }}
                        className="text-primary text-xl"
                      >
                        <EditIcon />
                      </button>
                    </Td>
                    <Td className="pl-0">
                      <HStack>
                        <p>{method.name}</p>
                      </HStack>
                    </Td>
                    <Td>
                      {`${method.deliveryTimeRange.from}-${
                        method.deliveryTimeRange.to
                      } ${t("days")}`}
                    </Td>
                    <Td>{method.listing}</Td>
                    <Td className="text-primary">
                      <HStack>
                        <button
                          onClick={() => {
                            // TODO:delete
                          }}
                          className="text-xl"
                        >
                          <TrashIcon />
                        </button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              : null}
          </TBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end">
        <BasicPagination controls={controls} />
      </div>
    </div>
  );
};
