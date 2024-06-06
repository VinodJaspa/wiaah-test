import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Badge,
  Image,
  Input,
  Pagination,
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
} from "ui";
import { mapArray, randomNum } from "utils";

interface Payback {
  id: string;
  seller: string;
  buyer: string;
  service: string;
  status: string;
  guarantee: number;
  rejectReason: string;
  thumbnail: string;
}

const Payback: NextPage = () => {
  const { t } = useTranslation();

  const paybackHistory: Payback[] = [...Array(10)].map((_, i) => ({
    id: randomNum(99999999).toString(),
    seller: `seller name-${i}`,
    buyer: `buyer name-${i}`,
    guarantee: randomNum(150),
    service: `service name-${i}`,
    status: "Pending",
    rejectReason: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy-${i}`,
    thumbnail: getRandomImage(),
  }));

  return (
    <section>
      <TableContainer>
        <Table className="min-w-max">
          <THead>
            <Tr>
              <Th className="w-32">{t("Photo")}</Th>
              <Th>{t("ID")}</Th>
              <Th>{t("Seller")}</Th>
              <Th>{t("Buyer")}</Th>
              <Th>{t("Service")}</Th>
              <Th className="w-16">{t("Guarantee")}</Th>
              <Th>{t("Status")}</Th>
              <Th className="w-[20rem]">{t("Refuse Reason")}</Th>
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
                  <SelectOption value={"pending"}>{t("Pending")}</SelectOption>
                  <SelectOption value={"refused"}>{t("Refused")}</SelectOption>
                  <SelectOption value={"refunded"}>
                    {t("Refunded")}
                  </SelectOption>
                </Select>
              </Th>
              <Th>
                <Input />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(
              paybackHistory,
              ({
                buyer,
                guarantee,
                id,
                rejectReason,
                seller,
                service,
                status,
                thumbnail,
              }) => (
                <Tr>
                  <Td>
                    <Image src={thumbnail} alt="thumbnail" />
                  </Td>
                  <Td>{id.slice(0, 10)}</Td>
                  <Td>{seller}</Td>
                  <Td>{buyer}</Td>
                  <Td>{service}</Td>
                  <Td>
                    <PriceDisplay price={guarantee} />
                  </Td>
                  <Td>
                    <Badge className="flex justify-center">{status}</Badge>
                  </Td>
                  <Td>{rejectReason}</Td>
                </Tr>
              )
            )}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </section>
  );
};

export default Payback;
