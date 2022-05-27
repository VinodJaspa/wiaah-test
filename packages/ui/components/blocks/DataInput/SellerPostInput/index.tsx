import React from "react";
import { useTranslation } from "react-i18next";
import { BiImage } from "react-icons/bi";
import { IoVideocamOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import { Avatar, Divider, Textarea, Button } from "ui";

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
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    onPostSubmit && onPostSubmit(value);
  };

  return (
    <div className="shadow-md p-4 flex w-full gap-4 flex-col">
      <div className="flex w-full gap-4">
        <Avatar
          data-testid="UserImage"
          photoSrc={userPhotoSrc}
          name={userName}
        />
        <Textarea
          className="resize-y min-h-[3rem] max-h-40"
          data-testid="PostInput"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("write_something", "write something")}
        />
      </div>
      <Divider />
      <div className="pl-2 w-full flex justify-between items-center">
        <div className="flex items-center gap-8 text-2xl">
          <BiImage
            className="cursor-pointer text-3xl text-red-500"
            data-testid="AttachPhotoBtn"
          />
          <IoVideocamOutline
            className="cursor-pointer text-3xl text-yellow-500"
            data-testid="AttachVideoBtn"
          />
          <HiOutlineLocationMarker
            className="cursor-pointer text-blue-500"
            data-testid="AddPostLocationBtn"
          />
          <BsEmojiSmile
            data-testid="AddStatusBtn"
            className="cursor-pointer text-purple-500"
          />
          <CgPlayButtonR
            data-testid="AttachActionBtn"
            className="cursor-pointer text-primary"
            cursor={"pointer"}
            color="primary.main"
          />
        </div>
        <Button data-testid="SubmitBtn" onClick={handleSubmit} className="px-8">
          {t("post", "Post")}
        </Button>
      </div>
    </div>
  );
};
