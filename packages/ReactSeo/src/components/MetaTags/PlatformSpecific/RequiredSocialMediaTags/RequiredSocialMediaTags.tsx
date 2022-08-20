import React from "react";
import { MetaTwitterCard } from "react-seo";
export interface RequiredSocialMediaTagsProps {}

export const RequiredSocialMediaTags: React.FC<
  RequiredSocialMediaTagsProps
> = () => {
  return (
    <>
      <MetaTwitterCard variant="large" />
    </>
  );
};
