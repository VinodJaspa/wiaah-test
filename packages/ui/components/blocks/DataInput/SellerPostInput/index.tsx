import React from "react";
import { useTranslation } from "react-i18next";
import { BiImage } from "react-icons/bi";
import { IoVideocamOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import {
  Avatar,
  Textarea,
  Button,
  useUserData,
  ImageIcon,
  SmilingFaceEmoji,
  VideoCameraIcon,
  LocationOnPointIcon,
  VideosPlayIcon,
} from "ui";

export interface SellerPostInputProps {
  userPhotoSrc: string;
  userName: string;
  onPostSubmit?: (text: string) => any;
}

export const SellerPostInput: React.FC<SellerPostInputProps> = ({
  userName,
  userPhotoSrc,
  onPostSubmit,
}) => {
  const { user } = useUserData();
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    onPostSubmit && onPostSubmit(value);
  };

  return (
    <div
      style={{
        boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.1)",
      }}
      className="flex w-full py-6 gap-4 flex-col"
    >
      <div className="flex w-full gap-4 px-12">
        <Avatar
          data-testid="UserImage"
          src={user ? user.photoSrc : ""}
          name={user ? user.name : ""}
        />
        <Textarea
          className="resize-y text-PHText min-h-[3rem] border-[0px] max-h-40"
          data-testid="PostInput"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            t("What's in your mind") +
            ", " +
            (user?.name || "user") +
            " " +
            "? " +
            t("Just write it down here")
          }
        />
        <Button
          data-testid="SubmitBtn"
          onClick={handleSubmit}
          className="px-8 h-fit"
        >
          {t("Publish")}
        </Button>
      </div>
      <div className="flex w-full gap-8 px-[4.5rem]">
        <div className="flex py-2 items-center justify-center gap-2 cursor-pointer w-full rounded-xl bg-red-100 fill-red-500 text-red-500">
          <ImageIcon data-testid="AttachPhotoBtn" className="text-xl" />
          {t("Picture")}
        </div>
        <div className="flex py-2 items-center justify-center gap-2 cursor-pointer w-full rounded-xl bg-yellow-100 fill-yellow-500 text-yellow-500">
          <SmilingFaceEmoji data-testid="AddStatusBtn" className="text-xl" />
          {t("Feeling")}
        </div>

        <div className="flex py-2 items-center justify-center gap-2 cursor-pointer w-full rounded-xl bg-blue-100 fill-blue-500 text-blue-500">
          <VideoCameraIcon data-testid="AttachVideoBtn" className="text-xl" />
          {t("Live")}
        </div>
        <div className="flex py-2 items-center justify-center gap-2 cursor-pointer w-full rounded-xl bg-primary-100 fill-primary-500 text-primary-500">
          <LocationOnPointIcon
            data-testid="AddPostLocationBtn"
            className="text-xl"
          />
          {t("Location")}
        </div>
        <div className="flex py-2 items-center justify-center gap-2 cursor-pointer w-full rounded-xl bg-purple-100 fill-purple-500 text-purple-500">
          <VideosPlayIcon data-testid="AttachActionBtn" className="text-xl" />
          {t("Video")}
        </div>
      </div>
    </div>
  );
};
