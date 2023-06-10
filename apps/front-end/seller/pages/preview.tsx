import { OrdersSection } from "@UI/components/sections/ShoppingManagement/Orders/OrdersSection/index";
import { NextPage } from "next";
import React from "react";

const Preview: NextPage = () => {
  const [value, setValue] = React.useState<any>([]);
  const [week, setWeek] = React.useState<Date>(new Date());

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={"w-1/2 h-3/4 overflow-y-scroll"}>
        <OrdersSection shopping />
      </div>
    </div>
  );
};

export default Preview;
