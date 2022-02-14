import React from "react";
import { IoMdMail } from "react-icons/io";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export interface SellerProps {
  name: string;
  reviews?: number;
  rating?: number;
}

export const SellerCard: React.FC<SellerProps> = ({
  name = "No_Name",
  reviews = 0,
  rating = 0,
}) => {
  return (
    <>
      <div className="">
        <div className="green-background rounded-lg pb-1 text-white">
          <div className="flex w-full justify-end pr-3 pt-3">
            <button className="green-text h-8 w-24 rounded-sm bg-white">
              FOLLOW
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="/shop-3.jpeg"
              alt=""
              className="mt-4 h-24 w-24 rounded-full"
            />
          </div>

          <div className="my-2 flex justify-center">{name}</div>
          <div className="flex justify-center">
            {rating <= 5 && rating >= 0 ? (
              <div className="product-rating ml-2 mt-2 mb-4 font-bold">
                {[...Array(rating)].map((_, i: number) => (
                  <AiFillStar className="inline text-orange-500" key={i} />
                ))}
                {[...Array(5 - rating)].map((_, i: number) => (
                  <AiOutlineStar className="inline text-orange-500" key={i} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-2 flex justify-center font-light">
            {reviews} Reviews
          </div>
          <div className="my-5 flex justify-center">
            <button className="green-text inline-flex items-center rounded-sm bg-white px-8 py-2">
              {" "}
              <IoMdMail className="mr-2 inline text-lg" /> CONTACT THE SELLER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
