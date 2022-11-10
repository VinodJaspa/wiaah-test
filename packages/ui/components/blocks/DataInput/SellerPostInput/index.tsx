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
} from "ui";
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
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    onPostSubmit && onPostSubmit(value);
  };

  const buttons: {
    icon: React.ReactNode;
    name: string;
    enabled: boolean;
    className: string;
  }[] = [
    {
      icon: ImageIcon,
      name: t("Picture"),
      enabled: true,
      className: "bg-red-100 fill-red-500 text-red-500",
    },
    {
      icon: SmilingFaceEmoji,
      name: t("Feeling"),
      enabled: false,
      className: "bg-yellow-100 fill-yellow-500 text-yellow-500",
    },
    {
      icon: VideoCameraIcon,
      name: t("Live"),
      enabled: false,
      className: "bg-blue-100 fill-blue-500 text-blue-500",
    },
    {
      icon: LocationOnPointIcon,
      name: t("Location"),
      enabled: true,
      className: "bg-primary-100 fill-primary-500 text-primary-500",
    },
    {
      icon: PlayButtonFillIcon,
      name: t("Action"),
      className: "bg-purple-100 fill-purple-500 text-purple-500",
      enabled: true,
    },
    {
      icon: PersonIcon,
      name: t("Idenity"),
      enabled: true,
      className: "bg-indigo-100 fill-indigo-500 text-indigo-500",
    },
  ];

  return (
    <div
      onClick={() => OpenModal()}
      style={{
        boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.1)",
      }}
      className="flex w-full py-6 gap-4 flex-col rounded-[1.25rem]"
    >
      <div className="flex w-full gap-4 px-12">
        <Avatar
          className="min-w-[3rem]"
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
        {buttons.map(({ className, enabled, icon, name }, i) => (
          <div key={i} className="flex flex-col w-full items-center gap-1">
            <div
              className={`${className || ""} ${
                enabled ? "cursor-pointer" : "opacity-75 cursor-not-allowed"
              } flex py-2 items-center justify-center gap-2 w-full rounded-xl`}
            >
              <div className="text-xl">{runIfFn(icon)}</div>
              <p>{enabled ? name : t("Coming Soon")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
