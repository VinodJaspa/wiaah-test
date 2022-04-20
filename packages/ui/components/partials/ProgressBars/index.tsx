import { Flex, Progress } from "@chakra-ui/react";
import React from "react";
import { CurrentStoryProgressState, CurrentStoryIndexState } from "ui/state";
import { useRecoilValue } from "recoil";
import { ProgressBar } from "types/market/ProgressBar";
import { useTimer } from "../../../Hooks";
export interface ProgressBarsProps {
  progressBarsData: ProgressBar[];
}
export const ProgressBars: React.FC<ProgressBarsProps> = ({
  progressBarsData,
}) => {
  return (
    <Flex gap={"0.5rem"} w="100%">
      {progressBarsData.map(({ progress }, i) => (
        <Progress
          key={i}
          size={"xs"}
          w="100%"
          colorScheme={"primary"}
          value={progress}
        />
      ))}
    </Flex>
  );
};
