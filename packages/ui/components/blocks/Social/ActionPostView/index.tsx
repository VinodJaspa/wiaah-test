import { Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { PostView, Carousel, VideoThumbnail } from "ui";
import { SocialActionsCardPlaceholder } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { ActionsCardListWrapper } from "../ActionsCardsListWrapper";
import { NumberShortner } from "@UI/../utils/src";

export const ActionPostView: React.FC<{ videoId: string }> = ({ videoId }) => {
  const { t } = useTranslation();

  const video = SocialActionsCardPlaceholder.filter(
    (video) => video.id === videoId
  );
  return (
    <div className="w-full h-full ">
      {video[0] ? (
        <div className="flex items-start justify-center h-screen mx-28">
          <div className="w-full h-5/6 ">
            <PostView
              postId="4"
              queryName="newFeedPost"
              data={video[0]}
              idParam="newsfeedpostid"
              renderChild={() => {
                return (
                  <Carousel componentsPerView={1} controls={video.length > 1}>
                    {video.map((video, i) => (
                      <div key={i}>
                        <VideoThumbnail
                          key={i}
                          videoSrc={video.videoSrc}
                          views={NumberShortner(parseInt(video.views))}
                          description={video.description}
                          isShort={false}
                        />
                      </div>
                    ))}
                  </Carousel>
                );
              }}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-xl font-semibold">
            Post {videoId} does not exist
          </h1>
        </div>
      )}

      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("other_posts", "other posts")}
      </Text>
      <div className="flex justify-center w-full h-fit">
        <div className="md:w-8/12 w-11/12">
          <ActionsCardListWrapper
            popup={false}
            videos={SocialActionsCardPlaceholder}
          />
        </div>
      </div>
    </div>
  );
};
