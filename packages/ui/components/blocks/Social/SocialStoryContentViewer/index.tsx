import React from "react";
import { useSetRecoilState } from "recoil";
import { SocialStoryContentData } from "types";
import {
  useStory,
  useTimer,
  CurrentStoryProgressState,
  PostAttachment,
} from "ui";
import {
  ActionPostStory,
  AffiliationPostStory,
  NewsFeedPostStory,
  ShopPostStory,
  ServicePostStory,
} from "ui";

export interface SocialStoryContentViewerProps extends SocialStoryContentData {
  play?: boolean;
  onProgress?: (progress: number) => any;
  onFinish?: () => any;
}
export const SocialStoryContentViewer: React.FC<
  SocialStoryContentViewerProps
> = ({ storyType, storySrc, storyText, play, id }) => {
  const { nextStory } = useStory();
  const setCurrentStoryProgress = useSetRecoilState(CurrentStoryProgressState);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    }
    if (play) {
      useTimer(7, setCurrentStoryProgress, 200, nextStory);
    }
  }, [play]);

  const Content = () => {
    switch (storyType) {
      case "image":
        return <PostAttachment src={storySrc || ""} type={storyType} />;
      case "video":
        return (
          <div>
            <video
              ref={videoRef}
              style={{ maxHeight: "100%", objectFit: "contain" }}
              src={storySrc}
            />
          </div>
        );
      case "newsFeedPost":
        return <NewsFeedPostStory postId={id} />;
      case "shopPost":
        return <ShopPostStory postId={id} />;
      case "affiliationPost":
        return <AffiliationPostStory postId={id} />;
      case "action":
        return <ActionPostStory postId={id} />;
      case "servicePost":
        return <ServicePostStory postId={id} />;
      default:
        return null;
    }
  };
  return (
    <div
      className="flex flex-col items-center h-full w-full justify-center"
      // maxW="container.md"
    >
      {storyText && (
        <p
          className={`w-full text-center font-bold py-4 ${
            storyType === "text" ? "text-3xl" : "text-lg"
          }`}
        >
          {storyText}
        </p>
      )}
      {Content()}
    </div>
  );
};
