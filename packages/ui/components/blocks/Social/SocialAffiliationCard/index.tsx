import React, { useState } from "react";
import { HiDotsHorizontal, HiOutlineLink } from "react-icons/hi";
import {
  Avatar,
  Button,
  Input,
  PriceDisplay,
  ServicePresentation,
  useDateDiff,
  useHandlePostSharing,
} from "ui";
import { CommentsViewer, PostInteractions, useAuthenticationModal } from "ui";
import { useTranslation } from "react-i18next";
import { PostAttachmentsViewer, PostInteractionsProps } from "ui";
import { HtmlDivProps } from "types";
import { useDimensions } from "hooks";
import {
  Affiliation,
  AffiliationPost,
  ProductPresentation,
  Profile,
  ServicePresentationType,
} from "@features/API";
import { getRandomImage } from "placeholder";
import { AttachmentType } from "@features/API/gql/generated";
import { useGetMyUserData } from "@UI/../api";
import Link from "next/link";
import { useRouter } from "next/router";

export interface SocialAffiliationCardProps {
  post: Pick<
    AffiliationPost,
    | "id"
    | "userId"
    | "affiliationId"
    | "views"
    | "reactionNum"
    | "shares"
    | "comments"
    | "createdAt"
  > & {
    affiliation: Pick<
      Affiliation,
      | "id"
      | "commision"
      | "createdAt"
      | "itemId"
      | "itemType"
      | "product"
      | "service"
      | "status"
    >;
    user: {
      profile: Pick<
        Profile,
        "id" | "username" | "verified" | "photo" | "ownerId"
      >;
    };
  };

  showPostInteraction?: boolean;
  onCardClick?: (id: string) => any;
  innerProps?: HtmlDivProps;
  interactionsProps?: Partial<PostInteractionsProps>;
  showComments?: boolean;
}

export const SocialAffiliationCard: React.FC<SocialAffiliationCardProps> = ({
  post,
  onCardClick,
  showPostInteraction = true,
  showComments = true,
  interactionsProps,
}) => {
  const { isOpen, openModal } = useAuthenticationModal();
  // FAKE USER
  const user = undefined;
  const detailsRef = React.useRef(null);
  const detailsDimensions = useDimensions(detailsRef);
  const { handleShare } = useHandlePostSharing();
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<{
    status: boolean;
    reactions: number;
  }>({
    status: false,
    reactions: post.reactionNum as number,
  });

  const router = useRouter();

  const { getSince } = useDateDiff({
    from: new Date(post.createdAt),
    to: new Date(),
  });

  const since = getSince();
  const affiliationLink = "";

  function handleCopyLink() {
    navigator.clipboard.writeText(affiliationLink);
  }

  const prod: {
    presentations: ProductPresentation[] | ServicePresentation[];
    name: string;
    price: number;
  } =
    post?.affiliation?.itemType === "service"
      ? {
          name: post.affiliation.service?.name || "",
          price: post.affiliation.service?.price || 0,
          presentations: [
            {
              src: post.affiliation.product?.thumbnail || "",
              type: ServicePresentationType.Img,
            },
          ],
        }
      : {
          name: post?.affiliation?.product?.title || "",
          price: post?.affiliation?.product?.price || 0,
          presentations:
            post?.affiliation?.product?.presentations ||
            ([] as ProductPresentation[]),
        };

  const handleLikeUnlike = () => {
    if (isLiked.status) {
      setIsLiked({ status: false, reactions: isLiked.reactions - 1 });
    } else {
      setIsLiked({ status: true, reactions: isLiked.reactions + 1 });
    }
  };

  return (
    <div
      className="text-white w-full gap-4 rounded-lg h-[520px] flex flex-col bg-primary p-4"
      data-testid="socialAffiliationContainer"
      onClick={() => onCardClick && onCardClick(post.id)}
    >
      <div className="w-full h-full pb-4">
        <div className="flex text-lg justify-end w-full">
          <HiDotsHorizontal />
        </div>
        <div className="w-full flex justify-between h-full gap-2 flex-col">
          {/* User Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  onClick={() =>
                    router.push(`/profile/${post.user.profile.id}`)
                  }
                  className="bg-black"
                  src={post?.user?.profile?.photo}
                  name={post?.user?.profile?.username}
                />
                <div className="flex flex-col">
                  <Link
                    href={`/profile/${post.user.profile.id}`}
                    className="text-lg fong-semibold"
                  >
                    {post?.user?.profile?.username}
                  </Link>
                  <p className="text-xs">
                    {since.value} {since.timeUnit}
                  </p>
                </div>
              </div>
              {isFollowing ? (
                <Button onClick={() => setIsFollowing(false)}>
                  {t("unfollow", "Unfollow")}
                </Button>
              ) : (
                <Button onClick={() => setIsFollowing(true)}>
                  {t("follow", "Follow")}
                </Button>
              )}
            </div>
            <div className="flex gap-1">
              <p>{t("Win")}</p> <p>{post.affiliation?.commision}%</p>
              <p>{t("of commision by affiliating it")}</p>
            </div>
          </div>
          <div className="relative w-full h-[200px]">
            <PostAttachmentsViewer
              carouselProps={{ arrows: false }}
              attachments={
                post.affiliation.product?.presentations || [
                  { src: "/shop.jpeg", type: AttachmentType.Img },
                ]
              }
            />
            <div className="flex justify-center items-center absolute bottom-0 right-0 px-4 py-2 bg-black bg-opacity-60 text-white">
              <PriceDisplay price={prod.price} />
            </div>
          </div>
          <div
            className="flex text-black p-1 rounded bg-white gap-2 flex-col"
            ref={detailsRef}
          >
            <p className="font-bold">{prod.name}</p>
            <div className="flex border-2 border-primary rounded-xl align-center h-12">
              <div className="flex justify-center items-center h-full border-r border-gray-200 px-4 cursor-pointer text-gray-500">
                <HiOutlineLink onClick={handleCopyLink} />
              </div>

              <Input
                onClick={
                  !user
                    ? () => {
                        console.log("Input Clicked");
                        openModal();
                      }
                    : undefined
                }
                value={affiliationLink}
                onChange={() => {}}
              />
            </div>

            {showPostInteraction && (
              <div className="text-black bg-white px-4">
                <PostInteractions
                  {...interactionsProps}
                  comments={post.comments}
                  onShare={(mothed) => handleShare(mothed, post.id)}
                  likes={post.reactionNum}
                  shares={post.shares}
                  onHeartIConClick={handleLikeUnlike}
                  isLiked={isLiked}
                />
              </div>
            )}
            {showComments && (
              <CommentsViewer maxInitailComments={4} comments={[]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
