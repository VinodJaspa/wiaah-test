import React from "react";
import { PostAttachment, ProfileInfo } from "types";
import { ActionHeader, ActionHeaderProps } from "ui";
import { PostAttachmentsViewer } from "ui";
import { useRouter } from "next/router";

export interface PlaceCardProps {
  user: ProfileInfo;
  placeAttachments: PostAttachment[];
  placeLocation?: string;
  placeType?: string;
  openFrom?: string;
  openTo?: string;
  openDays?: string[];
  fixedHeight?: string;
  headerProps?: Partial<ActionHeaderProps>;
}

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const PlaceCard: React.FC<PlaceCardProps> = ({
  placeAttachments,
  placeLocation,
  placeType,
  user,
  fixedHeight,
  openFrom,
  openTo,
  headerProps,
  openDays,
}) => {
  const router = useRouter();
  return (
    <div
      className={`relative isolate overflow-hidden rounded-xl bg-black w-full max-w-[30rem]`}
    >
      <PostAttachmentsViewer attachments={placeAttachments} />
      {openFrom && openTo && (
        <div className="absolute bg-black bg-opacity-60 text-2xl font-bold gap-1 flex flex-col items-center top-1/2 left-0 just-ce text-white transform -translate-y-1/2 w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span>{openFrom}</span>
            </div>
            <span>-</span>
            <div className="flex items-center gap-2">
              <span>{openTo}</span>
            </div>
          </div>
          {openDays && (
            <div className="flex gap-2 items-center text-base">
              <div className="flex items-center gap-2">
                <span className="fontbold text-primary">Open</span>
                {/* <Text color="#f53858">Closed</Text>
                <Text textTransform={"capitalize"}>
                  opens on friday 10:00 AM
                </Text> */}
              </div>
              {/* {weekdays.map((day,i)=>{

             const dayFound = openDays.findIndex((openDay:string)=> openDay.toLocaleLowerCase() === day.toLocaleLowerCase())
            return (
                <Text textTransform={"capitalize"} color={dayFound > -1 ? "primary.main" : "whiteAlpha.900"}>
                {day.substring(0,2)}
              </Text>
            )
          }
            )} */}
            </div>
          )}
        </div>
      )}
      {user && (
        <ActionHeader
          {...headerProps}
          className="absolute text-white min-h-max  left-0 bottom-0 w-full p-2 bg-gradient-to-t bg-opacity-50 from-black to-transparent"
          color="white"
          subName={placeType}
          actionHashtags={[]}
          userName={user.name || ""}
          userThumbnail={user.thumbnail || ""}
          actionLocation={placeLocation}
          onProfileClick={(profileName) => router.push(`/shop/${profileName}`)}
          onTitleClick={(title) => router.push(`/places?tag=${title}`)}
          onLocationClick={(location) =>
            router.push(`/localisation?tag=${location}`)
          }
        />
      )}
    </div>
  );
};
