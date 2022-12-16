import React from "react";
import { useRouting } from "routing";
import { OrderDetailsSection } from "ui";

const EditOrder = () => {
  const { getParam, back } = useRouting();
  const orderId = getParam("id");

  return (
    <section className="flex flex-col gap-4 w-full">
      <OrderDetailsSection />
    </section>
  );
};

export default EditOrder;
