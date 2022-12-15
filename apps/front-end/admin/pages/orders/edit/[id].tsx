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

interface Order {
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
  items: {
    id: string;
    name: string;
    model: string;
    qty: number;
    unitPrice: number;
  }[];
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
  shipping: {
    method: string;
    cost: number;
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

const EditOrder = () => {
  const { getParam, back } = useRouting();
  const orderId = getParam("id");
  const { t } = useTranslation();

  const order: Order = {
    id: orderId,
    createdAt: new Date(),
    buyer: {
      name: "buyer name",
    },
    invoice: {
      id: "135",
    },
    items: [
      {
        id: "13215",
        name: "product name",
        model: "product model",
        qty: randomNum(5),
        unitPrice: 150,
      },
      {
        id: "132354",
        name: "product name 2",
        model: "product model 2",
        qty: randomNum(5),
        unitPrice: 200,
      },
    ],
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
    shipping: {
      cost: randomNum(30),
      method: "International",
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
  };

  const subTotal = order.items.reduce((acc, curr) => {
    return acc + curr.unitPrice * curr.qty;
  }, 0);

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
              {t("Order")}
              {`(#${order.id})`}
            </p>
          </div>
        </div>
        <div className="text-lg p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4">
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Invoice")}</p>
              <p>{order.invoice.id}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Buyer")}</p>
              <p className="text-primary">{order.buyer.name}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Date Added")}</p>
              <p>{new Date(order.createdAt).toDateString()}</p>
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
                {mapArray(order.items, (item, i) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.model}</Td>
                    <Td>{item.qty}</Td>
                    <Td>
                      <PriceDisplay price={item.unitPrice} />
                    </Td>
                    <Td>
                      <PriceDisplay price={item.unitPrice * item.qty} />
                    </Td>
                    <Td>
                      <MinusIcon className="text-white rounded cursor-pointer hover:bg-red-600 w-8 h-8 p-2 bg-red-500" />
                    </Td>
                  </Tr>
                ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Payment Address")}</p>
              <p>{order.payment.address.firstName}</p>
              <p>{order.payment.address.lastName}</p>
              <p>{order.payment.address.city}</p>
              <p>{order.payment.address.state}</p>
              <p>{order.payment.address.postal}</p>
              <p>{order.payment.address.country}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="flex w-full rounded overflow-hidden">
            <div className="bg-gray-200 w-full p-4 flex flex-col gap-1">
              <p className="font-semibold">{t("Payment Address")}</p>
              <p>{order.shipping.address.firstName}</p>
              <p>{order.shipping.address.lastName}</p>
              <p>{order.shipping.address.city}</p>
              <p>{order.shipping.address.state}</p>
              <p>{order.shipping.address.postal}</p>
              <p>{order.shipping.address.country}</p>
            </div>
            <SettingsGear />
          </div>
          <div className="border flex border-gray-300 rounded overflow-hidden">
            <Select className="w-full" label={t("Payment Method")}>
              <SelectOption value={order.payment.method}>
                {order.payment.method}
              </SelectOption>
            </Select>
            <Refresh />
          </div>
          <div className="border flex border-gray-300 rounded overflow-hidden">
            <Select className="w-full" label={t("Shipping Method")}>
              <SelectOption value={order.shipping.method}>
                {order.shipping.method}
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
              <Td className="w-full font-bold">{order.shipping.method}</Td>
              <Td>
                <PriceDisplay price={order.shipping.cost} />
              </Td>
            </Tr>
            <Tr>
              <Td className="w-full font-bold">{t("Total")}</Td>
              <Td>
                <PriceDisplay price={subTotal + order.shipping.cost} />
              </Td>
            </Tr>
          </TBody>
        </Table>
      </div>
    </section>
  );
};

export default EditOrder;

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
