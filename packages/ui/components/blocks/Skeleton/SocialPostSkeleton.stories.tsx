import { ComponentMeta } from "@storybook/react";
import { SocialPostSkeleton } from "./SocialPostSkeleton";
import { storybookLoadingSkeletonTitle } from "utils";

export default {
  title: storybookLoadingSkeletonTitle + "Social Post Skeleton",
  component: SocialPostSkeleton,
} as ComponentMeta<typeof SocialPostSkeleton>;

export const Default = () => (
  <div className="h-[50vh] w-[50vw]">
    <SocialPostSkeleton />;
  </div>
);
