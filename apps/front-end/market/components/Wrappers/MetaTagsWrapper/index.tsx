import { ServicePresentationType } from "@features/API";
import React from "react";
import {
  MetaAuthor,
  MetaDescription,
  MetaImage,
  MetaTitle,
  MetaVideo,
  RequiredSocialMediaTags,
} from "react-seo";

interface MetaTagConfig {
  title?: string;
  description?: string;
  presentation?: {
    type: ServicePresentationType;
    src: string;
  };
  ownerFirstName?: string;
}

export const MetaTags: React.FC<{ metaConfig: MetaTagConfig }> = ({
  metaConfig,
}) => {
  const { title, description, presentation, ownerFirstName } = metaConfig;

  return (
    <>
      {title && <MetaTitle content={title} />}
      {description && <MetaDescription content={description} />}
      {presentation &&
        (presentation.type === "vid" ? (
          <MetaVideo content={presentation.src} />
        ) : (
          <MetaImage content={presentation.src} />
        ))}
      {ownerFirstName && <MetaAuthor author={ownerFirstName} />}
      <RequiredSocialMediaTags />
    </>
  );
};
