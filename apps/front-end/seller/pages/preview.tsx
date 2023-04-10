import {
  ServiceAppointmentDurationTimeListInput,
  ServiceAppontmentDurationTimeTableInput,
} from "@UI";
import { NextPage } from "next";
import React from "react";

const preview: NextPage = () => {
  const [value, setValue] = React.useState<any>([]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={"w-1/2 h-3/4 overflow-y-scroll"}>
        <ServiceAppontmentDurationTimeTableInput
          workingDates={[
            [
              new Date(new Date().setHours(3)),
              new Date(new Date().setHours(16)),
            ],
          ]}
          onChange={(v) => {
            setValue(v);
          }}
          value={value}
        />
      </div>
    </div>
  );
};

export default preview;
