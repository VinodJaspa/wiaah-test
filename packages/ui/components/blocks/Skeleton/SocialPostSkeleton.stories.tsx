import { Meta } from "@storybook/react";
import { SocialPostSkeleton } from "./SocialPostSkeleton";
import { storybookLoadingSkeletonTitle } from "utils";

export default {
  title: "UI / blocks / Loading Skeleton /Social Post Skeleton",
  component: SocialPostSkeleton,
} as Meta<typeof SocialPostSkeleton>;

export const Default = () => (
  <div className="h-[50vh] w-[50vw]">
    <SocialPostSkeleton />;
  </div>
);
