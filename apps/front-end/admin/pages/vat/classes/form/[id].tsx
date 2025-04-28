import React from "react";
import { NextPage } from "next";
import {
  ArrowRoundBack,
  Button,
  Divider,
  EditIcon,
  Input,
  InputRequiredStar,
  MinusIcon,
  PlusIcon,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { mapArray } from "utils";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import Head from "next/head";

interface TaxRate {
  rateId: string;
  rateName: string;
  basedOn: "store" | "shipping" | "billing";
}

const taxRates: TaxRate[] = [
  {
    rateId: "",
    basedOn: "store",
    rateName: "UK Vat",
  },
];

const Classesform: NextPage = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { back } = useRouting();
  return (
    <React.Fragment>
      <Head>
        <title>Admin | Vat Classes Form</title>
      </Head>
      <section>
        <div className="py-4 flex gap-1 justify-end">
          <Button center className="w-8 h-8">
            <SaveIcon className="fill-white" />
          </Button>
          <Button
            center
            className="w-8 h-8"
            onClick={() => back()}
            colorScheme="white"
          >
            <ArrowRoundBack />
          </Button>
        </div>

        <div className="border">
          <div className="p-4 border-b border-b-gray-300 flex items-center gap-2">
            <EditIcon />
            <p>{t("Edit Tax Class")}</p>
          </div>
          <div className="p-4">
            <Table
              TdProps={{ className: "odd:w-1/4 event:w-3/4" }}
              className="w-full"
            >
              <TBody>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    {t("Tax Class Title")}
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    {t("Description")}
                  </Td>
                  <Td>
                    <Input />
                  </Td>
                </Tr>
              </TBody>
            </Table>
            <p className="text-xl">{t("Tax Rates")}</p>
            <Divider />
            <Table
              TdProps={{ className: "border border-collapse" }}
              ThProps={{ align: "left", className: "border" }}
              className="w-full"
            >
              <THead>
                <Tr>
                  <Th>{t("Tax Rate")}</Th>
                  <Th>{t("Based On")}</Th>
                  <Th>{t("Priority")}</Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(taxRates, ({ basedOn, rateId, rateName }) => (
                  <Tr key={rateId}>
                    <Td>
                      <Select value={rateName}>
                        <SelectOption value={rateName}>{rateName}</SelectOption>
                      </Select>
                    </Td>
                    <Td>
                      <Select value={basedOn}>
                        <SelectOption value={"store"}>
                          {t("Store Address")}
                        </SelectOption>
                        <SelectOption value={"shipping"}>
                          {t("Shipping address")}
                        </SelectOption>
                        <SelectOption value={"billing"}>
                          {t("Billing Address")}
                        </SelectOption>
                      </Select>
                    </Td>
                    <Td>
                      <Input type="number" />
                    </Td>
                    <Td align="right">
                      <Button colorScheme="danger" center className="w-8 h-8">
                        <MinusIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td align="right">
                    <Button center className="w-8 h-8">
                      <PlusIcon />
                    </Button>
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Classesform;
