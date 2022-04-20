import React, { useEffect } from "react";
import { ProgressBars } from "ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  SocialStoriesProgressBarDataState,
  CurrentStoryProgressState,
} from "ui/state";
import { useTimer } from "ui/Hooks";
export const StoiresProgressBars: React.FC = () => {
  const data = useRecoilValue(SocialStoriesProgressBarDataState);
  const setCurrent = useSetRecoilState(CurrentStoryProgressState);
  useEffect(() => {
    useTimer(7, setCurrent, 100);
  }, []);
  return (
    <>
      <ProgressBars progressBarsData={data} />
    </>
  );
};
