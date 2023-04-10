import { ComponentMeta } from "@storybook/react";
import React from "react";
import { Table, TBody, THead, Td, Th, Tr } from "@UI";
import {
  StorybookImplemntationLayout,
  storybookPartailsTitle,
} from "utils";

export default {
  title: storybookPartailsTitle + "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Table, TBody, THead, Td, Th, Tr } from "@UI";

...
return (
<Table>
    <THead>
        <Tr>
        <Th>Name</Th>
        <Th>Price</Th>
        <Th>Stock</Th>
        <Th>Status</Th>
        </Tr>
    </THead>
    <TBody>
        {productsPh.map((prod, idx) => (
        <Tr key={idx}>
            <Td>{prod.name}</Td>
            <Td>{prod.price}</Td>
            <Td>{prod.stock}</Td>
            <Td>{prod.status}</Td>
        </Tr>
        ))}
    </TBody>
</Table>
)
        `}
    >
      <Table>
        <THead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
          </Tr>
        </THead>
        <TBody>
          {productsPh.map((prod, idx) => (
            <Tr key={idx}>
              <Td>{prod.name}</Td>
              <Td>{prod.price}</Td>
              <Td>{prod.stock}</Td>
              <Td>{prod.status}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </StorybookImplemntationLayout>
  );
};

export const WithColumnStretch = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Table, TBody, THead, Td, Th, Tr } from "@UI";

...
return (
<Table>
    <THead>
        <Tr>
        <Th>Name</Th>
        <Th>Price</Th>
        <Th>Stock</Th>
        <Th>Status</Th>
        </Tr>
    </THead>
    <TBody>
        {productsPh.map((prod, idx) => (
        <Tr key={idx}>
            <Td className="w-full">{prod.name}</Td>
            <Td>{prod.price}</Td>
            <Td>{prod.stock}</Td>
            <Td>{prod.status}</Td>
        </Tr>
        ))}
    </TBody>
</Table>
)
        `}
    >
      <Table>
        <THead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
          </Tr>
        </THead>
        <TBody>
          {productsPh.map((prod, idx) => (
            <Tr key={idx}>
              <Td className="w-full">{prod.name}</Td>
              <Td>{prod.price}</Td>
              <Td>{prod.stock}</Td>
              <Td>{prod.status}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </StorybookImplemntationLayout>
  );
};
export const WithChildsProps = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Table, TBody, THead, Td, Th, Tr } from "@UI";

...
return (
<Table
    TdProps={{
        className: "whitespace-nowrap",
    }}
    ThProps={{
        className: "text-left",
    }}
    >
    <THead>
        <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
        </Tr>
    </THead>
    <TBody>
        {productsPh.map((prod, idx) => (
        <Tr key={idx}>
            <Td className="w-full">{prod.name}</Td>
            <Td>{prod.price}</Td>
            <Td>{prod.stock}</Td>
            <Td>{prod.status}</Td>
        </Tr>
        ))}
    </TBody>
</Table>
)
        `}
    >
      <Table
        TdProps={{
          className: "whitespace-nowrap",
        }}
        ThProps={{
          className: "text-left",
        }}
      >
        <THead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
          </Tr>
        </THead>
        <TBody>
          {productsPh.map((prod, idx) => (
            <Tr key={idx}>
              <Td className="w-full">{prod.name}</Td>
              <Td>{prod.price}</Td>
              <Td>{prod.stock}</Td>
              <Td>{prod.status}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </StorybookImplemntationLayout>
  );
};
export const Striped = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Table, TBody, THead, Td, Th, Tr } from "@UI";

...
return (
<Table
    TdProps={{
        className: "whitespace-nowrap",
    }}
    ThProps={{
        className: "text-left",
    }}
    TrProps={{
        className: "even:bg-primary-50",
    }}
    >
    <THead>
        <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
        </Tr>
    </THead>
    <TBody>
        {productsPh.map((prod, idx) => (
        <Tr key={idx}>
            <Td className="w-full">{prod.name}</Td>
            <Td>{prod.price}</Td>
            <Td>{prod.stock}</Td>
            <Td>{prod.status}</Td>
        </Tr>
        ))}
    </TBody>
</Table>
)
        `}
    >
      <Table
        TdProps={{
          className: "whitespace-nowrap",
        }}
        ThProps={{
          className: "text-left",
        }}
        TrProps={{
          className: "even:bg-primary-50",
        }}
      >
        <THead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
          </Tr>
        </THead>
        <TBody>
          {productsPh.map((prod, idx) => (
            <Tr key={idx}>
              <Td className="w-full">{prod.name}</Td>
              <Td>{prod.price}</Td>
              <Td>{prod.stock}</Td>
              <Td>{prod.status}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </StorybookImplemntationLayout>
  );
};
const productsPh = [
  {
    name: "product 1",
    price: "5 USD",
    stock: 17,
    status: "active",
  },
  {
    name: "product 2",
    price: "57 USD",
    stock: 4,
    status: "active",
  },
  {
    name: "product 3",
    price: "30 USD",
    stock: 5,
    status: "active",
  },
  {
    name: "product 4",
    price: "12 USD",
    stock: 10,
    status: "active",
  },
  {
    name: "product 5",
    price: "15 USD",
    stock: 25,
    status: "active",
  },
];
