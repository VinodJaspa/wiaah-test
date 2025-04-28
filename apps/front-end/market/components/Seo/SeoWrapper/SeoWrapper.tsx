import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  MetaCopyright,
  MetaDescription,
  MetaImage,
  MetaKeywords,
  MetaSubject,
  MetaTitle,
  MetaUrl,
  RequiredSocialMediaTags,
} from "react-seo";

export const SeoWrapper: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <>
      <RequiredSocialMediaTags />
      <MetaImage content="https://images.adsttc.com/media/images/5efe/1f7f/b357/6540/5400/01d7/newsletter/archdaily-houses-104.jpg?1593712501" />
      <MetaKeywords
        content={[
          t("marketplace"),
          t("sell"),
          t("selling"),
          t("shop"),
          t("service"),
        ]}
      />
      <MetaUrl url="https://wiaah.com" />
      <MetaDescription
        content={t(
          "wiaah is a would wide social marketplace that let sellers and service providers reach out millions of people through social media"
        )}
      />
      <MetaSubject subject={t("Wiaah marketplace")} />
      <MetaCopyright content={t("Wiaah")} />
      <MetaTitle content={`Wiaah | Market`} />
      {children}
    </>
  );
};
