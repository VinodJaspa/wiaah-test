import { ServicePostMetaDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PostAttachment,
  Slider,
  AspectRatio,
  PriceDisplay,
  Button,
  Rate,
  LocationOutlineIcon,
  UserProfile,
  Service,
  LocationIcon,
} from "@UI";
import { startCase } from "lodash";
import {
  AttachmentType,
  Profile,
  ServicePost,
  Account,
  PostLocation,
} from "@features/API";

export type Post = Pick<
  ServicePost,
  | "id"
  | "userId"
  | "comments"
  | "reactionNum"
  | "shares"
  | "createdAt"
  | "views"
  | "location"
  | "serviceId"
  | "serviceType"
> & {
  location: Pick<PostLocation, "address" | "city" | "state" | "country">;
  service: Pick<Service, "id" | "thumbnail" | "price" | "rating" | "title">;
  user: Pick<Account, "id"> & {
    profile?: Pick<
      Profile,
      "id" | "username" | "verified" | "profession" | "photo" | "followers"
    >;
  };
};

export interface SocialServicePostMetaDataCardProps {
  post: Post;
  onClick?: (post: Post) => any;
}

export const SocialServicePostMetaDataCard: React.FC<
  SocialServicePostMetaDataCardProps
> = ({ post, onClick }) => {
const { t } = useTranslation();
  if (!post) return null;
  return (
    <div className="flex flex-col w-full">
      <div
        onClick={() => onClick && onClick(post)}
        className="relative w-full bg-transparent"
      >
        <AspectRatio ratio={3 / 4}>
          <Slider>
            {post?.service?.thumbnail
              ? [post.service.thumbnail].map((att, i) => (
                <PostAttachment
                  key={i}
                  blur
                  src={att}
                  type={AttachmentType.Img}
                />
              ))
              : null}
          </Slider>
        </AspectRatio>
        {post.user.profile ? (
          <div className="absolute bottom-0 left-0 w-full p-2 text-white bg-gradient-to-t from-black  to-transparent">
            <UserProfile
              user={{
                name: post.user.profile.username,
                id: post.user.profile.id,
                photo: post.user.profile.photo,
                profession: post.user.profile.profession,
                verified: post.user.profile.verified,
              }}
            />
          </div>
        ) : null}
        <div className="cursor-pointer absolute top-4 left-0 flex flex-col w-full text-lg bg-gray-500 bg-opacity-50 p-2 text-white">
          {/* <p className="font-semibold  lg:text-2xl ">{name}</p> */}
          <p className="w-full text-lg font-bold text-right text-primary">
            {">>"} {startCase(post.serviceType)} {"<<"}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-col w-full py-2 px-4">
        <div className="flex font-bold text-lg justify-between gap-4 w-full">
          <p>{post.service.title}</p>
          <PriceDisplay price={post.service.price} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Rate rating={post.service.rating} />
              {/* <p>
                {post.service.} {t("Reviews")}
              </p> */}
            </div>
            <div className="flex items-center gap-1">
              <LocationIcon />
              <p>{post.location ? post.location.country || "" : null}</p>
            </div>
          </div>
          <Button>{t("View")}</Button>
        </div>
      </div>
    </div>
  );
};
