import {
  NewsfeedPost,
  ProductPost,
  ServicePost,
  StoryType,
} from "@features/API";
import { useTimer } from "@UI/../hooks";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  AffiliationPostStory,
  CurrentStoryProgressState,
  NewsFeedPostStory,
  PostAttachment,
  ServicePostStory,
  ShopPostStory,
  useStory,
} from "ui";

export interface SocialStoryContentViewerProps {
  type: StoryType;
  src?: string;
  text?: string;
  id: string;
  play?: boolean;
  onProgress?: (progress: number) => any;
  onFinish?: () => any;
  post?:
    | Pick<NewsfeedPost, "id">
    | Pick<ServicePost, "id">
    | Pick<ProductPost, "id">;
}

export const SocialStoryContentViewer: React.FC<
  SocialStoryContentViewerProps
> = ({ type, src = "", text, play = false, id, post }) => {
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
    const [isStoryModalClicked, setIsStoryModalClicked] =
      useState<boolean>(false);

    switch (type) {
      case StoryType.Image:
        return <PostAttachment src={src} type={type} />;
      case StoryType.Video:
        return (
          <div>
            <video
              className="w-full h-full"
              ref={videoRef}
              style={{ objectFit: "contain" }}
              src={src}
              onEnded={nextStory}
            />
          </div>
        );
      case StoryType.Post:
        return (
          <div
            onClick={() => setIsStoryModalClicked((prev) => !prev)}
            className="relative w-full"
          >
            <NewsFeedPostStory postId={id} storyId="33" />
            {isStoryModalClicked && (
              <Link
                href={`/post/${post.id}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap flex items-center gap-2 bg-black text-white rounded-md p-2 font-medium"
              >
                <span>See Post</span>
                <ChevronRight />
              </Link>
            )}
          </div>
        );
      case StoryType.Product:
        return (
          <div
            onClick={() => setIsStoryModalClicked((prev) => !prev)}
            className="relative w-full"
          >
            <ShopPostStory postId={id} />
            {isStoryModalClicked && (
              <Link
                href={`/post/${post.id}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap flex items-center gap-2 bg-black text-white rounded-md p-2 font-medium"
              >
                <span>See Post</span>
                <ChevronRight />
              </Link>
            )}
          </div>
        );
      case StoryType.Affiliation:
        return <AffiliationPostStory postId={id} />;
      case StoryType.Service:
        return (
          <div
            onClick={() => setIsStoryModalClicked((prev) => !prev)}
            className="relative w-full"
          >
            <ServicePostStory postId={id} />
            {isStoryModalClicked && (
              <Link
                href={`/post/${post.id}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap flex items-center gap-2 bg-black text-white rounded-md p-2 font-medium"
              >
                <span>See Post</span>
                <ChevronRight />
              </Link>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full justify-center">
      {text && (
        <p
          className={`w-full text-center font-bold pb-4 pt-2 ${
            type === "text" ? "text-3xl" : "text-lg"
          }`}
        >
          {text}
        </p>
      )}
      {Content()}
    </div>
  );
};
