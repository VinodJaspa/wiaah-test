import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export interface ProductProps {
  name?: string;
  price: number;
  oldPrice?: number;
  imgUrl?: string;
  rating?: number;
  off?: number;
  reviews?: number;
  category?: "";
  saved?: boolean;
  avaible?: number;
  shippedToYourCountry?: boolean;
}

export const ProductViewRight: React.FC<ProductProps> = ({
  name = "",
  price,
  oldPrice,
  rating = 0,
  shippedToYourCountry = true,
  avaible,
  off = "",
  category = "",
  reviews = 0,
}) => {
  let [optionOpened, setOptionOpened] = useState(false);
  return (
    <>
      <samp className="green-text">{category}</samp>
      <h1 className="m-0 text-2xl font-bold text-gray-800 ">{name}</h1>
      <div className="flex items-center">
        <div className="inline-flex items-center">
          {rating <= 5 && rating >= 0 ? (
            <div className="product-rating flex items-center text-xl">
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
        <div className="mx-3 h-5 w-px bg-gray-300"></div>
        <span className="text-gray-500">{reviews} Reviews</span>
      </div>
      <div className="mt-2 flex items-center font-bold">
        <span className="product-price text-3xl">${price}</span>
        {!oldPrice ? (
          ""
        ) : (
          <span className="product-old-price ml-5 text-2xl text-slate-400 line-through">
            {oldPrice}
          </span>
        )}
      </div>
      <div className="my-2 inline-block rounded-md bg-red-400 px-4 py-1 font-bold text-white">
        <span>{off}% </span>
        <span> OFF</span>
      </div>
      <div className="mb-2 text-lg">
        <div>
          <span className="font-bold">
            {avaible ? "Available:" + avaible : "Not Available"}{" "}
          </span>
          <span className="text-gray-500"> In Stock</span>
        </div>
        <div className="text-red-500">
          {shippedToYourCountry ? "Shipping available in your country" : ""}
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1 font-light">Color</div>
        <div className="flex">
          <div className="mr-3 h-8 w-8 rounded-sm border-2 border-black bg-red-500"></div>
          <div className="green-background mr-3 h-8 w-8 rounded-sm "></div>
          <div className="mr-3 h-8 w-8 rounded-sm bg-blue-500 "></div>
        </div>
      </div>
      <div>
        <div className="mb-1 font-light">Size</div>
        <div
          className={`${
            optionOpened ? "" : "h-10"
          } shipping-selector mb-7 overflow-hidden rounded-sm border border-solid px-2 transition-height duration-300 ease-in-out`}
        >
          <div
            className="accordion-toggle mb-3 flex h-10 items-center justify-between"
            onClick={() => {
              setOptionOpened(!optionOpened);
            }}
          >
            <span className="font-light">Small</span>
            <FaChevronUp className={`${optionOpened ? "" : "rotate-180"} `} />
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input
              name="shipping"
              type="radio"
              value="val"
              className="rounded text-pink-500"
            />
            <span className="ml-2 text-xs">Label</span>
          </div>
        </div>
      </div>
      <button className="green-background w-full rounded-sm py-2 text-white">
        ADD TO CART
      </button>
    </>
  );
};
