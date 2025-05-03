import { AspectRatioImage, Button } from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export interface ServiceSearchCardPresentationProps {
  src: string;
  alt: string;
  data: object;
  serviceKey: string;
}

export const ServiceCardPresentation: React.FC<
  ServiceSearchCardPresentationProps
> = ({ alt, src, data, serviceKey }) => {
  const { visit } = useRouting();
const { t } = useTranslation();
  return (
    <AspectRatioImage src={src} alt={alt} className="group" ratio={3 / 4}>
      <div
        className={
          "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
        }
      >
        <Button
          onClick={() =>
            visit((routes) => routes.visitService(data, serviceKey))
          }
        >
          {t("Details")}
        </Button>
      </div>
    </AspectRatioImage>
  );
};
