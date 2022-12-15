import React from "react";
import { useTranslation } from "react-i18next";
import { HiTruck } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  ExclamationCircleIcon,
  Input,
  MinusIcon,
  PlusIcon,
  PriceDisplay,
  RefreshIcon,
  SaveIcon,
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

interface Booking {
  id: string;
  createdAt: Date;
  invoice: {
    id: string;
  };
  buyer: {
    name: string;
  };
  seller: {
    name: string;
  };
  book: {
    id: string;
    name: string;
    model: string;
    qty: number;
    unitPrice: number;
  };
  vat: number;
  payment: {
    method: string;
    address: {
      firstName: string;
      lastName: string;
      state: string;
      country: string;
      city: string;
      street: string;
      postal: string;
    };
  };
}

const ServiceBook = () => {
  const { getParam, back } = useRouting();
  const orderId = getParam("id");
  const { t } = useTranslation();

  const Book: Booking = {
    id: orderId,
    createdAt: new Date(),
    buyer: {
      name: "buyer name",
    },
    invoice: {
      id: "135",
    },
    book: {
      id: "13215",
      name: "product name",
      model: "product model",
      qty: randomNum(5),
      unitPrice: 150,
    },
    vat: randomNum(15),
    payment: {
      method: "Cash",
      address: {
        firstName: "first name",
        lastName: "last name",
        postal: "123465",
        street: "test street",
        city: "Geneve",
        country: "Switzerland",
        state: "state",
      },
    },
    seller: {
      name: "seller name",
    },
  };

  const subTotal = Book.book.qty * Book.book.unitPrice;
  const vatCost = subTotal * Book.vat;
  return (
    <section>
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex fill-white text-white items-center gap-1">
          <SaveIcon className="rounded cursor-pointer hover:bg-cyan-600 w-8 h-8 p-2 bg-cyan-500" />
          <HiTruck className="rounded cursor-pointer hover:bg-blue-600 w-8 h-8 p-2 bg-cyan-500" />
          <ArrowRoundBack
            onClick={() => back()}
            className="fill-black text-black rounded cursor-pointer hover:bg-gray-200 border border-gray-300 w-8 h-8 p-2 white"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <ExclamationCircleIcon />
            <p>
              {t("Book")}
              {`(#${Book.id})`}
            </p>
          </div>
        </div>
        <div className="text-lg p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4">
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Invoice")}</p>
              <p>{Book.invoice.id}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Buyer")}</p>
              <p className="text-primary">{Book.buyer.name}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Date Added")}</p>
              <p>{new Date(Book.createdAt).toDateString()}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <TableContainer>
            <Table
              className="border-collapse w-full"
              ThProps={{ className: "border border-gray-300" }}
              TdProps={{ className: "border border-gray-300" }}
            >
              <THead>
                <Tr>
                  <Th>{t("Product")}</Th>
                  <Th>{t("Model")}</Th>
                  <Th>{t("Quantity")}</Th>
                  <Th>{t("Unit Price")}</Th>
                  <Th>{t("Total")}</Th>
                  <Th>{t("Action")}</Th>
                </Tr>
                <Tr>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input type={"number"} />
                  </Th>
                  <Th>
                    <Input type="number" />
                  </Th>
                  <Th>
                    <Input type="number" />
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                <Tr>
                  <Td>{Book.book.name}</Td>
                  <Td>{Book.book.model}</Td>
                  <Td>{Book.book.qty}</Td>
                  <Td>
                    <PriceDisplay price={Book.book.unitPrice} />
                  </Td>
                  <Td>
                    <PriceDisplay price={Book.book.unitPrice * Book.book.qty} />
                  </Td>
                  <Td>
                    <MinusIcon className="text-white rounded cursor-pointer hover:bg-red-600 w-8 h-8 p-2 bg-red-500" />
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <PlusIcon className="text-white rounded cursor-pointer hover:bg-blue-600 w-8 h-8 p-2 bg-blue-500" />
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </TableContainer>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Payment Address")}</p>
              <p>{Book.payment.address.firstName}</p>
              <p>{Book.payment.address.lastName}</p>
              <p>{Book.payment.address.city}</p>
              <p>{Book.payment.address.state}</p>
              <p>{Book.payment.address.postal}</p>
              <p>{Book.payment.address.country}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="border flex border-gray-300 rounded overflow-hidden">
            <Select className="w-full" label={t("Payment Method")}>
              <SelectOption value={Book.payment.method}>
                {Book.payment.method}
              </SelectOption>
            </Select>
            <Refresh />
          </div>
        </div>
        <div className="border flex  border-gray-300 rounded overflow-hidden">
          <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
            <p className="font-semibold">{t("Comment")}</p>
          </div>
          <SettingsGear />
        </div>

        <Table
          className="border-collapse"
          TdProps={{ align: "right", className: "border border-gray-300" }}
        >
          <TBody>
            <Tr>
              <Td className="w-full font-bold">{t("Sub Total")}</Td>
              <Td>
                <PriceDisplay price={subTotal} />
              </Td>
            </Tr>
            <Tr>
              <Td className="w-full font-bold">{t("Vat")}</Td>
              <Td>
                <PriceDisplay price={vatCost} />
              </Td>
            </Tr>
            <Tr>
              <Td className="w-full font-bold">{t("Total")}</Td>
              <Td>
                <PriceDisplay price={subTotal + vatCost} />
              </Td>
            </Tr>
          </TBody>
        </Table>
      </div>
    </section>
  );
};

export default ServiceBook;

function SettingsGear() {
  return (
    <div className="bg-white cursor-pointer hover:bg-primary-200  text-primary px-4 border border-primary flex justify-center items-center">
      <MdSettings />
    </div>
  );
}

function Refresh() {
  return (
    <div className="bg-white cursor-pointer hover:bg-primary-200  text-primary px-4 h-full border border-primary flex justify-center items-center">
      <RefreshIcon />
    </div>
  );
}
