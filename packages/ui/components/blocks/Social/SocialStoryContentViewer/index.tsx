import React from "react";
import { useSetRecoilState } from "recoil";
import {
  useStory,
  useTimer,
  CurrentStoryProgressState,
  PostAttachment,
  AffiliationPostStory,
  NewsFeedPostStory,
  ShopPostStory,
  ServicePostStory,
} from "ui";
import { StoryType } from "@features/API";

export interface SocialStoryContentViewerProps {
  type: StoryType;
  src?: string;
  text?: string;
  id: string;
  play?: boolean;
  onProgress?: (progress: number) => any;
  onFinish?: () => any;
}
export const SocialStoryContentViewer: React.FC<
  SocialStoryContentViewerProps
> = ({ type, src, text, play, id }) => {
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
    switch (type) {
      case "image":
        return <PostAttachment src={src || ""} type={type} />;
      case "video":
        return (
          <div>
            <video
              ref={videoRef}
              style={{ maxHeight: "100%", objectFit: "contain" }}
              src={src}
            />
          </div>
        );
      case StoryType.Post:
        return <NewsFeedPostStory postId={id} storyId="33" />;
      case StoryType.Product:
        return <ShopPostStory postId={id} />;
      case StoryType.Affiliation:
        return <AffiliationPostStory postId={id} />;
      // case StoryType.Base:
      //   return <ActionPostStory postId={id} />;
      case StoryType.Service:
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
      {text && (
        <p
          className={`w-full text-center font-bold py-4 ${type === "text" ? "text-3xl" : "text-lg"
            }`}
        >
          {text}
        </p>
      )}
      {Content()}
    </div>
  );
};
