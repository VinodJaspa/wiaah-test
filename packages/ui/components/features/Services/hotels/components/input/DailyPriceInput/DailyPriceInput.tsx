import React from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  Tr,
  Td,
  TBody,
  Input,
  InputGroup,
  InputLeftElement,
  DollarIcon,
} from "@UI";

type DailyPriceData = Record<number, number>;

const weekDaysList: Record<number, string> = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

export interface DailyPriceInputProps {
  value: DailyPriceData;
  onChange: (data: DailyPriceData) => any;
}

export const DailyPriceInput: React.FC<DailyPriceInputProps> = ({
  value = {
    0: 150,
    1: 150,
    2: 250,
    3: 200,
    4: 300,
    5: 150,
    6: 230,
  },
  onChange,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const formatedDays = value
    ? Object.entries(value).map((v, i) => ({
        name: weekDaysList[parseInt(v[0])] || null,
        price: v[1],
        idx: i,
        ogKey: v[0],
      }))
    : [];
  return (
    <div className="flex flex-col w-full gap-2">
      <Table TdProps={{ className: "p-0 py-2" }}>
        {/* <THead className="border-b">
          <Tr>
            <Th>{t("Daily")}</Th>
            <Th>{t("Price")}</Th>
          </Tr>
        </THead> */}
        <TBody>
          {formatedDays.map((d, i) => (
            <Tr>
              <Td>
                <p className="font-semibold text-sm">{t(d.name || "")}</p>
              </Td>
              <Td className="text-iconGray">
                <InputGroup>
                  <InputLeftElement>
                    <DollarIcon className="text-xl" />
                  </InputLeftElement>
                  <Input
                    type={"number"}
                    value={d.price}
                    onChange={(e) =>
                      onChange &&
                      onChange({
                        ...value,
                        [d.ogKey]: parseInt(e.target.value),
                      })
                    }
                  />
                </InputGroup>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
};
