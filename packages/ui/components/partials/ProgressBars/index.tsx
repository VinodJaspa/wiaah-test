import { Progress } from "@chakra-ui/react";
import { useTypedReactPubsub } from "@libs";
import React from "react";
import { ProgressBar } from "types";

export interface ProgressBarsProps {
  srcKey: string;
}

export const useProgressBars = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (k) => k.socialStoryProgressBarsState
  );

  React.useEffect(() => removeListner);

  function update(progress: ProgressBar[]) {
    emit({ progress });
  }

  return {
    update,
    listen: Listen,
  };
};

export const ProgressBars: React.FC<ProgressBarsProps> = ({ srcKey }) => {
  const [progressBarsData, setProgressBarsData] =
    React.useState<ProgressBar[]>();
  const { listen } = useProgressBars();

  listen((props) => {
    if (props && props.progress) {
      setProgressBarsData(props.progress);
    } else {
      setProgressBarsData([]);
    }
  });

  return (
    <div className="flex gap-2 w-full">
      {progressBarsData
        ? progressBarsData.map(({ progress }, i) => (
            <Progress
              key={i}
              size={"xs"}
              w="100%"
              colorScheme={"primary"}
              value={progress}
            />
          ))
        : null}
    </div>
  );
};
