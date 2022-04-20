import React from "react";
import { IoMdMail } from "react-icons/io";
import { Rate } from "antd";
import { useLoginPopup } from "ui/Hooks";
import { useTranslation } from "react-i18next";

export interface SellerProps {
  id: String;
  name: string;
  reviews?: number;
  rating?: number;
}

export const SellerCard: React.FC<SellerProps> = ({
  id = "15",
  name = "No_Name",
  reviews = 0,
  rating = 0,
}) => {
  const { t } = useTranslation();
  const { OpenLoginPopup } = useLoginPopup();
  return (
    <>
      <div className="green-background flex h-full flex-col justify-between rounded-lg py-3 text-white">
        <div className="flex w-full justify-end pr-3">
          <button className="green-text h-8 w-24 rounded-sm bg-white uppercase">
            {t("Follow", "FOLLOW")}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <img
              src="/shop-3.jpeg"
              alt=""
              className="mt-4 h-24 w-24 rounded-full"
            />
          </div>

          <div className="my-2 flex justify-center">{name}</div>
          <a href={`/wiaah/${id}#reviews`} className="flex justify-center">
            <Rate disabled allowHalf value={rating} />
          </a>
          <div className="my-2 flex justify-center font-light">
            {reviews + " " + t("Reviews", "Reviews")}
          </div>
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => OpenLoginPopup()}
              className="green-text inline-flex items-center rounded-sm bg-white px-8 py-2"
            >
              {" "}
              <IoMdMail className="mr-2 inline text-lg uppercase" />{" "}
              {t("Contact_The_Seller", "Contact The Seller")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
