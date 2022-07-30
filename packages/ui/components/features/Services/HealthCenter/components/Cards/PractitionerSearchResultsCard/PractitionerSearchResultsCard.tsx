import { HealthCenterPractitioner } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { AspectRatio, HighlightText, Button, ServicesRequestKeys } from "ui";

export interface PractitionerSearchResultsCardProps {
  practitioner: HealthCenterPractitioner;
  children?: string;
}

export const PractitionerSearchResultsCard: React.FC<
  PractitionerSearchResultsCardProps
> = ({ practitioner }) => {
  const { visit } = useRouting();
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-2 rounded overflow-hidden">
      <AspectRatio className="group" ratio={1}>
        <img
          className="w-full h-full object-cover"
          src={practitioner.photo}
          alt={practitioner.name}
        />
        <div
          className={
            "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
          }
        >
          <Button
            onClick={() =>
              visit((routes) =>
                routes.visitService(
                  practitioner,
                  ServicesRequestKeys.healthCenter
                )
              )
            }
          >
            {t("Details")}
          </Button>
        </div>
      </AspectRatio>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col font-semibold">
          <div>
            <HighlightText toHighlight={practitioner.name}>
              {practitioner.name}
            </HighlightText>
          </div>
          <span>{practitioner.specialty}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>{practitioner.location.address}</span>
          <span>
            {practitioner.location.postalCode} {practitioner.location.city}
          </span>
        </div>
      </div>
    </div>
  );
};
