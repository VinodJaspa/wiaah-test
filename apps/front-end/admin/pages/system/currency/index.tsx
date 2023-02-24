import {
  Button,
  Checkbox,
  EditIcon,
  Input,
  ListIcon,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useAdminGetCurrenciesQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { useRouting } from "routing";

interface Currency {
  name: string;
  code: string;
  rate: number;
  enabled: boolean;
  isDefault: boolean;
  id: string;
}

const currencies: Currency[] = [
  {
    id: "1",
    code: "USD",
    name: "US Dollar",
    enabled: true,
    isDefault: true,
    rate: 1,
  },
  {
    id: "1",
    code: "EUR",
    name: "Euro",
    rate: 0.94170826,
    isDefault: false,
    enabled: true,
  },
];

const Currency: NextPage = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useAdminGetCurrenciesQuery>[0]>(
    { pagination },
    { pagination }
  );
  const { data: currencies } = useAdminGetCurrenciesQuery(form);

  return (
    <section>
      <div className="border border-gray-300">
        <div className="flex border-b border-gray-300 items-center gap-2 p-4">
          <ListIcon />
          <p>{t("Currency List")}</p>
        </div>
        <div className="p-4">
          <TableContainer>
            <Table ThProps={{ align: "left" }} className="w-full">
              <THead>
                <Tr>
                  <Th>
                    <Checkbox />
                  </Th>
                  <Th>{t("Currency Title")}</Th>
                  <Th>{t("Code")}</Th>
                  <Th>{t("Value")}</Th>
                  <Th>{t("Status")}</Th>
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
                  <Th>
                    <Input type="number" />
                  </Th>
                  <Th>
                    <Select>
                      <SelectOption value={true}>{t("Enabled")}</SelectOption>
                      <SelectOption value={false}>{t("Disabled")}</SelectOption>
                    </Select>
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(
                  currencies,
                  ({ code, id, name, exchangeRate, symbol, enabled }) => (
                    <Tr>
                      <Td>
                        <Checkbox />
                      </Td>
                      <Td>
                        <p>
                          {name}
                          {/* <span className="font-bold">
                            {isDefault ? `(${t("Default")})` : ""}
                          </span> */}
                        </p>
                      </Td>
                      <Td>{code}</Td>
                      <Td>{exchangeRate}</Td>
                      <Td>{enabled ? t("Enabled") : t("Disabled")}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            visit((r) =>
                              r
                                .addPath(getCurrentPath())
                                .addPath("edit")
                                .addPath(id)
                            );
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </Td>
                    </Tr>
                  )
                )}
              </TBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
};

export default Currency;
