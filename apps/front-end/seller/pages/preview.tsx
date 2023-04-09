import { ServiceRangeBookingCalander } from "@UI";
import { NextPage } from "next";
import React from "react";

const preview: NextPage = () => {
  const [value, setValue] = React.useState<any>([]);

  console.log({ value });
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={"w-1/2"}>
        <ServiceRangeBookingCalander
          bookedDates={[new Date()]}
          date={new Date()}
          onChange={(v) => {
            setValue(v);
            console.log({ v });
          }}
          value={value}
        />
        <p>from :{value[0] ? new Date(value[0]).toDateString() : ""}</p>
        <p>to :{value[1] ? new Date(value[1]).toDateString() : ""}</p>
      </div>
    </div>
  );
};

export default preview;
