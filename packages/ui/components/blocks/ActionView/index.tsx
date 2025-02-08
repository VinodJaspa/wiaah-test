import EllipsisText from "@blocks/EllipsisText";
import { useSocialControls } from "@blocks/Layout";
import { ContentHostType } from "@features/API";
import { LocationAddress } from "@features/Services/components/DataDisplay/LocationAddress/LocationAddress";
import { useLikeContent } from "@features/Social";
import {
  Avatar,
  Button,
  CommentOutlineIcon2,
  DigitalCamera,
  HeartFillIcon,
  HeartOutlineIcon,
  HStack,
  LocationOutlineIcon,
  LoopIcon,
  MusicNoteFillIcon,
  PersonGroupIcon,
  SaveFlagFIllIcon,
  SaveFlagOutlineIcon,
  ShareIcon,
  ShoppingCartOutlinePlusIcon,
  Slider,
  StarsIcon,
  Verified,
  VerticalDotsIcon,
  VolumeIcon,
  VStack,
} from "@partials";
import Link from "next/link";
import { PersonalizeActions } from "placeholder";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, NumberShortner } from "utils";

export const ActionsView: React.FC = () => {
  const { t } = useTranslation();
  const { shareLink, showContentComments } = useSocialControls();
  const { mutate } = useLikeContent();
  const { getUrl } = useRouting();
  const { createRemixAction, showContentTaggedProfiles, openMusicDetails } =
    useSocialControls();

  const memoizedCreateRemixAction = useCallback(createRemixAction, []);
  const memoizedShowContentTaggedProfiles = useCallback(
    showContentTaggedProfiles,
    [],
  );
  const memoizedOpenMusicDetails = useCallback(openMusicDetails, []);
  const [isSaved, setIsSaved] = useState(false);

  // Toggle the saved state
  const toggleSave = () => setIsSaved(!isSaved);
  const [isLiked, setIsLiked] = useState(false);

  // Toggle the liked state and update count accordingly
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const [data] = useState(PersonalizeActions);
  const actions = data;

  const hasProduct = true;
  const product = useMemo(() => {
    if (hasProduct) {
      return {
        shopName: "Nike",
        verified: true,
        prodTitle:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
        photo: "/wiaah_logo.png",
      };
    }
    return null;
  }, [hasProduct]);

  // State to manage the currently playing video
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoContainersRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for video containers

  const handlePlayPause = (index: number) => {
    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      if (playingIndex === index) {
        // Pause the currently playing video
        currentVideo.pause();
        setPlayingIndex(null);
      } else {
        // Play the selected video
        if (playingIndex !== null && videoRefs.current[playingIndex]) {
          videoRefs.current[playingIndex].pause(); // Pause the previous video
        }
        currentVideo.play();
        setPlayingIndex(index);
        videoContainersRef.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  // Effect to handle video end event
  React.useEffect(() => {
    const videoElements = videoRefs.current;

    const handleEnded = (index: number) => {
      const nextIndex = (index + 1) % actions.length; // Loop back to first video
      handlePlayPause(nextIndex); // Play the next video
    };

    // Add ended event listeners
    videoElements.forEach((videoElement, index) => {
      if (videoElement) {
        const onEnded = () => handleEnded(index);
        videoElement.addEventListener("ended", onEnded);

        // Clean up event listener on component unmount
        return () => {
          videoElement.removeEventListener("ended", onEnded);
        };
      }
    });

    // Clean up effect
    return () => {
      videoElements.forEach((videoElement, index) => {
        if (videoElement) {
          videoElement.removeEventListener("ended", () => handleEnded(index));
        }
      });
    };
  }, [actions, playingIndex]); // Re-run if actions change

  // Scroll event handling to detect up or down scroll and play the corresponding video
  const debouncedScrollHandler = useCallback(() => {
    let lastCallTime = Date.now();

    return (event: WheelEvent) => {
      const now = Date.now();
      if (now - lastCallTime < 200) return;
      lastCallTime = now;

      const delta = event.deltaY;
      const nextIndex =
        delta > 0
          ? playingIndex !== null
            ? (playingIndex + 1) % actions.length
            : 0
          : playingIndex !== null
            ? (playingIndex - 1 + actions.length) % actions.length
            : actions.length - 1;

      handlePlayPause(nextIndex);
    };
  }, [actions.length, handlePlayPause, playingIndex]);

  React.useEffect(() => {
    const handleScroll = debouncedScrollHandler();

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [debouncedScrollHandler]);

  return (
    <div suppressHydrationWarning={true} className="h-screen w-fit ">
      {/* actions View */}
      <Slider variant="vertical">
        {mapArray(actions, (v, i) => (
          <div
            key={i}
            ref={(el) => (videoContainersRef.current[i] = el)} // Assign video container ref
            className="sm:w-[min(26rem,100%)] w-full mx-auto h-full md:h-5/6 relative "
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)} // Assign video ref
              src={v.src}
              className="w-full h-full object-cover"
            />

            <div className="absolute pb-14 z-10 px-4 py-6 text-white text-xl top-0 left-0 overflow-hidden w-full h-full flex flex-col justify-between">
              <div className="flex flex-col w-full gap-6">
                <div className="flex justify-between">
                  <DigitalCamera />
                  <div
                    onClick={() => {
                      memoizedOpenMusicDetails(v.musicId);
                    }}
                    className="cursor-pointer px-2 py-1 bg-black bg-opacity-40 flex items-center gap-2"
                  >
                    <MusicNoteFillIcon />
                    <p className="text-xs font-medium">{v?.audio?.name}</p>
                  </div>
                  <HStack className="gap-4">
                    <VolumeIcon className="text-lg" />
                    <VerticalDotsIcon className="text-sm" />
                  </HStack>
                </div>
                <Button
                  colorScheme="gray"
                  className="self-end px-4 bg-white bg-opacity-30"
                >
                  <ShoppingCartOutlinePlusIcon className="text-2xl text-white" />
                </Button>
              </div>

              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col gap-2">
                  <HStack className="flex-wrap gap-2">
                    {[
                      {
                        icon: <LoopIcon />,
                        label: t("Remix"),
                        onClick: () => {
                          memoizedCreateRemixAction(v.id);
                        },
                      },
                      {
                        icon: <StarsIcon />,
                        label: v.effect.name,
                      },
                    ].map((v, i) => (
                      <HStack
                        key={i}
                        onClick={v.onClick}
                        className="rounded-full cursor-pointer bg-black bg-opacity-40 py-1 px-2"
                      >
                        {v.icon}
                        <p className="text-xs font-semibold text-white">
                          {v.label}
                        </p>
                      </HStack>
                    ))}
                  </HStack>
                  <HStack>
                    <Link href={`/profile/${v.profile.id}`}>
                      <Avatar
                        className="flex-shrink-0"
                        src={v?.profile?.photo}
                      />
                    </Link>
                    <div className="flex flex-col">
                      <HStack>
                        <Link
                          href={`/profile/${v.profile.id}`}
                          className="font-semibold"
                        >
                          {v?.profile?.username}
                        </Link>
                        {v?.profile?.verified ? (
                          <Verified className="text-primary text-sm" />
                        ) : null}
                      </HStack>
                      <HStack>
                        <HStack className="bg-black text-xs rounded-full text-white bg-opacity-40 py-1 px-2">
                          <LocationOutlineIcon />
                          <LocationAddress location={v.location} />
                        </HStack>
                        <HStack
                          className="cursor-pointer bg-black text-xs rounded-full text-white bg-opacity-40 py-1 px-2 flex-shrink-0"
                          onClick={() =>
                            memoizedShowContentTaggedProfiles(
                              v.id,
                              ContentHostType.Action,
                            )
                          }
                        >
                          <PersonGroupIcon />
                          <p>
                            {v.tags.length} {t("people")}
                          </p>
                        </HStack>
                        <HStack className="bg-black text-xs rounded-full text-white bg-opacity-40 py-1 px-2">
                          <MusicNoteFillIcon />
                          <p>Carpe Diem</p>
                        </HStack>
                      </HStack>
                    </div>
                  </HStack>
                  <div className="flex text-sm gap-2 text-white">
                    <EllipsisText
                      content={
                        "This ensures that the component behaves differently based on the isActionView prop, truncating the content at 65 characters when isActionView is true and at 150 characters otherwise." +
                        product.prodTitle
                      }
                      maxLines={2}
                      index={i}
                      isActionView
                    />
                  </div>
                </div>
                {/* Add the Play/Pause Button */}
                <Button
                  onClick={() => handlePlayPause(i)} // Call the play/pause function
                  className="self-end"
                  colorScheme={playingIndex === i ? "success" : "primary"}
                >
                  {playingIndex === i ? "Pause" : "Play"} {/* Toggle label */}
                </Button>
              </div>
            </div>

            <div className="  flex flex-col gap-4 w-[34px] text-3xl self-end absolute z-10 bottom-4 -right-12">
              <button
                onClick={() =>
                  mutate(
                    {
                      args: {
                        contentId: v.id,
                        contentType: ContentHostType.Action,
                      },
                    },
                    {
                      onSuccess(data, variables, context) {},
                    },
                  )
                }
              >
                <VStack onClick={toggleLike} className="cursor-pointer">
                  {/* Toggle between filled and outline heart based on liked state */}
                  {isLiked ? <HeartFillIcon /> : <HeartOutlineIcon />}
                  {/* Display the updated like count */}
                  <p className="font-medium text-xs">
                    {NumberShortner(v.reactionNum)}
                  </p>
                </VStack>
              </button>
              <button
                onClick={() =>
                  showContentComments(ContentHostType.Action, v.id)
                }
              >
                <VStack>
                  <CommentOutlineIcon2 />
                  <p className="font-medium text-xs">
                    {NumberShortner(v.comments)}
                  </p>
                </VStack>
              </button>
              <button
                onClick={() =>
                  shareLink(getUrl((routes) => routes.visitSocialPost(v.id)))
                }
              >
                <VStack>
                  <ShareIcon />
                  <p className="text-xs font-medium">
                    {NumberShortner(v.shares)}
                  </p>
                </VStack>
              </button>
              <VStack onClick={toggleSave} className="cursor-pointer">
                {/* Toggle between outline and filled icon based on saved state */}
                {isSaved ? <SaveFlagFIllIcon /> : <SaveFlagOutlineIcon />}
                {/* Update text based on saved state */}
                <p className="font-medium text-xs">
                  {isSaved ? t("Saved") : t("Save")}
                </p>
              </VStack>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
