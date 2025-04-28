import React from "react";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Textarea,
  Button,
  useUserData,
  ImageIcon,
  SmilingFaceEmoji,
  VideoCameraIcon,
  LocationOnPointIcon,
  PersonIcon,
  PlayButtonFillIcon,
  AddNewPostModal,
  useNewPost,
} from "@UI";
import { runIfFn } from "utils";

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
  const { OpenModal } = useNewPost();
  const { user } = useUserData();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const handleSubmit = () => {
    OpenModal();
  };

  return (
    <div
      style={{
        boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.1)",
      }}
      className="flex justify-center items-center w-full py-6 gap-4 flex-col rounded-[1.25rem]"
    >
      <div className="flex items-center gap-4 px-12">
        <Avatar
          className="min-w-[3rem]"
          data-testid="UserImage"
          src={user ? user.photoSrc : ""}
          name={user ? user.name : ""}
        />

        {t("What's in your mind") +
          ", " +
          (user?.name || "user") +
          " " +
          "? " +
          t("share it with who you love!")}
        <Button
          data-testid="SubmitBtn"
          onClick={handleSubmit}
          className="px-8 h-fit"
        >
          {t("Publish a Post")}
        </Button>
      </div>
    </div>
  );
};
