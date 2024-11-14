import React from "react";
import { useSetRecoilState } from "recoil";
import {
  useStory,
  CurrentStoryProgressState,
  PostAttachment,
  AffiliationPostStory,
  NewsFeedPostStory,
  ShopPostStory,
  ServicePostStory,
} from "ui";
import { StoryType } from "@features/API";
import { useTimer } from "@UI/../hooks";

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
> = ({ type, src = "", text, play = false, id }) => {
  const { nextStory } = useStory();
  const setCurrentStoryProgress = useSetRecoilState(CurrentStoryProgressState);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current
          .play()
          .catch((error) => console.error("Video play error:", error));
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    }

    if (play) {
      // Ensure useTimer is only called when `play` becomes true
      const cleanup = useTimer(7, setCurrentStoryProgress, 200, nextStory);
      return cleanup; // If `useTimer` returns a cleanup function, it will be called on component unmount or when `play` changes.
    }
  }, [play, setCurrentStoryProgress, nextStory]);

  const Content = () => {
    switch (type) {
      case "image":
        return <PostAttachment src={src} type={type} />;
      case "video":
        return (
          <div>
            <video
              ref={videoRef}
              style={{ maxHeight: "100%", objectFit: "contain" }}
              src={src}
              onEnded={nextStory}
            />
          </div>
        );
      case StoryType.Post:
        return <NewsFeedPostStory postId={id} storyId="33" />;
      case StoryType.Product:
        return <ShopPostStory postId={id} />;
      case StoryType.Affiliation:
        return <AffiliationPostStory postId={id} />;
      case StoryType.Service:
        return <ServicePostStory postId={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full justify-center">
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
