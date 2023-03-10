import { VideoEditor } from "@UI";
import { NextPage } from "next";
import React from "react";

const preview: NextPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <VideoEditor maxDuration={650} />
    </div>
  );
};

export default preview;
