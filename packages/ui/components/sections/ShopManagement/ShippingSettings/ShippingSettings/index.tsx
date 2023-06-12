import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiPlusSquare } from "react-icons/fi";
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
  FlagIcon,
  Pagination,
  HStack,
  EditIcon,
  TrashIcon,
  Checkbox,
} from "@UI";
import { ShippingSettingsContext } from "../ShippingSettingsSection";

export const ShippingSettings: React.FC = () => {
  const { addNew } = React.useContext(ShippingSettingsContext);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { data } = useGetMyShippingRules();

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("shipping_settings", "Shipping Settings")}>
        {isMobile ? (
          <FiPlusSquare className="text-2xl" onClick={addNew} />
        ) : (
          <Button onClick={addNew} outline>
            {t("Add Shipping")}
          </Button>
        )}
      </SectionHeader>
      <p className="lg:text-xl ">
        {t("Define your shipping regions and how rates are calculated.")}{" "}
        <button className="text-primary cursor-pointer">
          {t("Learn more")}
        </button>
      </p>
      <TableContainer>
        <Table className="w-full">
          <Tr>
            <Th></Th>
            <Th>{t("Shipping Name")}</Th>
            <Th>{t("Processing Time")}</Th>
            <Th>{t("Listings")}</Th>
            <Th>{t("Action")}</Th>
          </Tr>
          <TBody>
            {data
              ? data.map((method, i) => (
                  <Tr key={method.id + i}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td className="pl-0">
                      <HStack>
                        {method?.countries?.at(0)?.code ? (
                          <FlagIcon
                            size={"48"}
                            code={method.countries.at(0)!.code}
                          />
                        ) : null}
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
                        <Button
                          colorScheme="darkbrown"
                          onClick={() => {
                            // TODO: edit
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          colorScheme="danger"
                          onClick={() => {
                            // TODO:delete
                          }}
                        >
                          <TrashIcon />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              : null}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </div>
  );
};
