import { HStack, Image } from "@partials";
import React from "react";
import { useGetActionQuery } from "../services";

export const ActionAudioView: React.FC<{
  actionId: string;
}> = ({ actionId }) => {
  const { data } = useGetActionQuery(actionId);

  const audioTitle = "Leave The Door Open";

  return (
    <div className="flex flex-col gap-4">
      <HStack>
        {/* <Image  src={} /> */}
        <div className="flex flex-col gap-4">
          <p className="text-bold">{audioTitle}</p>
        </div>
      </HStack>
    </div>
  );
};
