import { VideoEditor } from "@UI";
import { NextPage } from "next";
import React from "react";

const preview: NextPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={"w-1/2"}>
        <VideoEditor onFinish={() => {}} maxDuration={650} />
      </div>
    </div>
  );
};

export default preview;
