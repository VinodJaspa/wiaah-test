import { OrderDetailsSection } from "ui";
import { NextPage } from "next";
import React from "react";
import { useRouting } from "routing";
import { randomNum } from "utils";
import { getRandomImage } from "placeholder";

const products: any[] = [...Array(15)].map((_, i) => ({
  id: String(i),
  productImage: getRandomImage(),
  productName: `product ${i}`,
  quantity: randomNum(10),
  price: {
    amount: randomNum(50),
    currency: "USD",
  },
  total: {
    amount: randomNum(500),
    currency: "USD",
  },
  category: "category",
  status: "confirmed",
  trackingLink: "link",
}));

const downloadableForm: NextPage = () => {
  const { getParam } = useRouting();
  const orderId = getParam("id");

  return (
    <section className="flex flex-col gap-4 w-full">
      <OrderDetailsSection
        order={{
          customer: "customer",
          dateAdded: new Date(Date.now()).toDateString(),
          orderId: `${randomNum(100000)}`,
          orderStatus: "confirmed",
          paymentMethod: "stripe",
          productsNum: randomNum(10),
          total: {
            amount: randomNum(5000),
            currency: "USD",
          },

          products,
        }}
      />
    </section>
  );
};

export default downloadableForm;
