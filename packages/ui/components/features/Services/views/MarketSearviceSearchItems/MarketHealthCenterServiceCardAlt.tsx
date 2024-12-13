import React from "react";
import { WorkingDaysCalender, WorkingDaysCalenderProps } from "@blocks";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, AspectRatioImage, Button, HStack } from "@partials";
import { MarketServiceSearchHoverOverlay } from "../MarketServiceSearchCardHoverOverlay";
import { useRouter } from "next/router";
interface MarketHealthCenterServiceCardAltProps {
  id: string;
  title: string;
  location: string;
  speciality: string;
  thumbnail: string;
  appointments: WorkingDaysCalenderProps["workingDates"];
  bookedAppointments: WorkingDaysCalenderProps["workingDates"];
}

export const MarketHealthCenterServiceCardAlt: React.FC<
  MarketHealthCenterServiceCardAltProps
> = ({
  id,
  location,
  speciality,
  thumbnail,
  title,
  appointments,
  bookedAppointments,
}) => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
      <div className="flex flex-col gap-2 p-1">
        {/* Render the thumbnail image with a specific aspect ratio */}
        <MarketServiceSearchHoverOverlay
          onButtonClick={() => router.push(`/service/health_center/${id}`)}
        >
          <AspectRatioImage alt={title} ratio={1.2} src={thumbnail} />
        </MarketServiceSearchHoverOverlay>

        <div className="p-1 flex flex-col gap-4">
          {/* Render the card header containing title, speciality, and location */}
          <div className="flex flex-col gap-2">
            <p className="text font-medium text-primary">{title}</p>
            <p className="text-lg text-gray-800 font-semibold">{speciality}</p>
            <div className="flex text-gray-500 flex-col gap-2">
              <p className="text-sm ">Address</p>
              <p className="text-sm">{location}</p>
            </div>
          </div>

          {/* Render the working days calendar with appointments and booked appointments */}
          <div className="max-h-40 overflow-y-scroll">
            <WorkingDaysCalender
              takenDates={bookedAppointments}
              workingDates={appointments}
            />
          </div>
        </div>
      </div>
    );
  };
