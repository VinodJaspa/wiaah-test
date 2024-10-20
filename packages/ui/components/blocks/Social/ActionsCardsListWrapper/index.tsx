import { Carousel } from "../../../blocks/Carousel";
import { PostViewPopup } from "../../../blocks/Popups";
import {
  VideoThumbnail,
  VideoThumbnailProps,
} from "../../../blocks/VideoThumbnail";
import { ListWrapper } from "../../../blocks/Wrappers";
import { useModalDisclouser } from "hooks";
import { NumberShortner, useBreakpointValue } from "utils";
import { useRouter } from "next/router";
import React, { useState } from "react";

type ActionsCardListWrapperProps = {
  videos: VideoThumbnailProps[];
  popup?: boolean;
};

export const ActionsCardListWrapper: React.FC<ActionsCardListWrapperProps> = ({
  videos,
  popup = true,
}) => {
  const router = useRouter();

  const cols = useBreakpointValue({ base: 3 });
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleClick = (id: string) => {
    router.push(`/action/post/${id}`);
  };

  return (
    <ListWrapper
      listProps={{
        className: "gap-1 md:gap-4 flex flex-col",
      }}
      props={{
        className: "flex justify-between  w-full gap-1 md:gap-4",
      }}
      cols={cols}
    >
      {videos.map((video, i) => {
        const { isOpen, handleClose, handleOpen } = useModalDisclouser();
        const vids = [video.videoSrc];

        return (
          <React.Fragment key={i}>
            <VideoThumbnail
              key={i}
              id={video.id}
              videoSrc={video.videoSrc}
              views={NumberShortner(parseInt(video.views))}
              description={video.description}
              handleOpen={
                popup ? handleOpen : () => handleClick(video.id || "")
              }
              isFocused={focusedIndex === i}
              onFocus={() => setFocusedIndex(i)}
              isShort={true}
            />

            {popup && (
              <PostViewPopup
                isOpen={isOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                queryName="shopName"
                idParam="shopId"
                data={video}
                renderChild={() => {
                  return (
                    <Carousel componentsPerView={1} controls={vids.length > 1}>
                      {vids.map((image, index) => (
                        <div key={index}>
                          <VideoThumbnail
                            key={i}
                            videoSrc={video.videoSrc}
                            views={NumberShortner(parseInt(video.views))}
                            description={video.description}
                            isFocused={focusedIndex === i}
                            onFocus={() => setFocusedIndex(i)}
                            isShort={false}
                          />
                        </div>
                      ))}
                    </Carousel>
                  );
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </ListWrapper>
  );
};
