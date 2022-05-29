import { Progress } from "@chakra-ui/react";
import React from "react";
import { ProgressBar } from "types/market/ProgressBar";
export interface ProgressBarsProps {
  progressBarsData: ProgressBar[];
}
export const ProgressBars: React.FC<ProgressBarsProps> = ({
  progressBarsData,
}) => {
  return (
    <div className="flex gap-2 w-full">
      {progressBarsData.map(({ progress }, i) => (
        <Progress
          key={i}
          size={"xs"}
          w="100%"
          colorScheme={"primary"}
          value={progress}
        />
      ))}
    </div>
  );
};
