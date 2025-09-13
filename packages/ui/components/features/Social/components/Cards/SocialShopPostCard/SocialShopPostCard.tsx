import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Interaction } from "types";
import {
  UserProfileDisplay,
  CommentIcon,
  HeartIcon,
  ShareIcon,
  useSocialPostSettingsPopup,
  HorizontalDotsIcon,
  LocationIcon,
  StarOutlineIcon,
  PersonFillIcon,
  Image,
  ShoppingCartIcon,
  PriceDisplay,
  UnDiscountedPriceDisplay,
  useLikeContent,
  useLoginPopup,
} from "@UI";
import { useTypedReactPubsub } from "@libs";
import { ContentHostType, Product, ProductPost, Profile } from "@features/API";
import { useRecoilValue } from "recoil";
import { isUserLoggedIn } from "state";


export interface SocialShopPostcardProps {
  profileInfo: Pick<
    Profile,
    "id" | "verified" | "photo" | "username" | "profession"
  >;
  postInfo: Pick<
    ProductPost,
    "id" | "comments" | "shares" | "reactionNum" | "userId" | "createdAt"
  > & {
    product: Pick<
      Product,
      | "id"
      | "presentations"
      | "title"
      | "hashtags"
      | "price"
      | "cashback"
      | "discount"
    >;
  };
  onInteraction?: (interaction: Interaction) => any;
  handleOpen?: () => void;
}

export const SocialShopPostcard: React.FC<SocialShopPostcardProps> = ({
  postInfo,
  profileInfo,
  handleOpen,
}) => {
  const { OpenModal } = useSocialPostSettingsPopup();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(postInfo.createdAt),
    to: new Date(),
  });
  const { mutate: like } = useLikeContent();
  const { emit } = useTypedReactPubsub((r) => r.openPostCommentInput);

  const userLoggedIn = useRecoilValue(isUserLoggedIn);
  const { OpenLoginPopup } = useLoginPopup();

  const date = getSince();

  const discount = postInfo.product.discount;
  const cashback = postInfo.product.cashback;

  // ✅ Reusable login-guard wrapper
  const handleProtectedClick = (callback: () => void) => {
    if (!userLoggedIn) {
      OpenLoginPopup();
    } else {
      callback();
    }
  };

  return (
    <div className="relative isolate group rounded md:rounded-[1.25rem] overflow-hidden w-full h-full">
      <Image
        className="w-full h-full object-cover"
        src={
          postInfo?.product.presentations &&
          postInfo.product.presentations.length > 0
            ? postInfo.product.presentations[0].src
            : ""
        }
        alt={"image"}
        onClick={() =>
          handleProtectedClick(() => {
            if (handleOpen) handleOpen();
          })
        }
      />

      <div
        onClick={() =>
          handleProtectedClick(() => {
            if (handleOpen) handleOpen();
          })
        }
        className="absolute group-hover:opacity-100 opacity-0 transition-opacity bg-black bg-opacity-40 px-8 py-6 text-white top-0 left-0 bottom-0 right-0 flex flex-col w-full justify-between"
      >
        <div className="flex flex-col w-full ">
          <div className="flex gap-2 items-center">
            <div className="min-w-[2.5rem] ">
              <UserProfileDisplay
                storyUserData={{
                  name: profileInfo.username,
                  userPhotoSrc: profileInfo.photo,
                  id: profileInfo.id,
                }}
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <p className="font-bold">{profileInfo.username}</p>
                <div className="flex gap-1 items-center">
                  <LocationIcon className="text-white" />
                  <p>{profileInfo.profession}</p>
                </div>
              </div>
              <div className="flex items-end flex-col">
                <div className="h-4 overflow-hidden">
                  <HorizontalDotsIcon
                    onClick={() =>
                      handleProtectedClick(() => OpenModal(postInfo?.id))
                    }
                    className="text-2xl text-white fill-white cursor-pointer"
                  />
                </div>
                <p className="font-semibold">
                  {date ? `${date.value} ${date.timeUnit} ${t("ago")}` : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex noScroll gap-3 font-medium text-white overflow-x-scroll">
              {postInfo.product.hashtags.map((tag, i) => (
                <p key={i}>#{tag}</p>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span
                onClick={() =>
                  handleProtectedClick(() => {
                    /* Shopping cart action */
                  })
                }
                className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30 cursor-pointer"
              >
                <ShoppingCartIcon className="fill-white" />
              </span>
              <span
                onClick={() =>
                  handleProtectedClick(() =>
                    like({
                      args: {
                        contentId: postInfo.id,
                        contentType: ContentHostType.PostShop,
                      },
                    })
                  )
                }
                className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30 cursor-pointer"
              >
                <HeartIcon className="fill-white" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <PriceDisplay price={postInfo.product.price} />
              <UnDiscountedPriceDisplay
                amount={postInfo.product.price}
                discount={discount.amount}
              />
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex gap-7">
              <div
                onClick={() =>
                  handleProtectedClick(() =>
                    like({
                      args: {
                        contentId: postInfo.id,
                        contentType: ContentHostType.PostShop,
                      },
                    })
                  )
                }
                className="cursor-pointer flex gap-2 items-center"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <HeartIcon />
                </span>
                <p className="font-bold text-base">{postInfo.reactionNum}</p>
              </div>

              <div
                onClick={() =>
                  handleProtectedClick(() => {
                    emit({ id: postInfo.id });
                  })
                }
                className="cursor-pointer flex items-center gap-2"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <CommentIcon />
                </span>
                <p className="font-bold text-base">{postInfo.comments}</p>
              </div>

              <div
                onClick={() =>
                  handleProtectedClick(() => {
                    /* Share logic */
                  })
                }
                className="flex gap-2 items-center cursor-pointer"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <ShareIcon />
                </span>
                <p className="font-bold text-base">{postInfo.shares}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                onClick={() =>
                  handleProtectedClick(() => {
                    /* Person action */
                  })
                }
                className="flex gap-2 items-center cursor-pointer"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <PersonFillIcon />
                </span>
              </div>
              <div
                onClick={() =>
                  handleProtectedClick(() => {
                    /* Star action */
                  })
                }
                className="flex gap-2 items-center cursor-pointer"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <StarOutlineIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
