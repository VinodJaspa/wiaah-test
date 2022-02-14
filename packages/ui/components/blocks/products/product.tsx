import React, { useState, useEffect } from "react";
import { colorShades } from "../../helpers/colorShades";
import Link from "next/link";
import {
    AiFillStar,
    AiOutlineStar,
    AiFillHeart,
    AiOutlineHeart
  } from "react-icons/ai";
interface ProductProps {
  name?: string;
  price?: number;
  oldPrice?: number
  imgUrl?: string;
  rating?: number;
  cashback?: number;
  off?: number;
  saved?:boolean;
  url?:string;

}

export const Product: React.FC<ProductProps> = ({ name="", price=0, oldPrice=0, imgUrl, rating=0, cashback="", off="", saved=false, url="/products/product-url-here" }) => {

  return (
    <>
      <Link href={url}>
        <div className="cursor-pointer max-w-xs block relative rounded-lg overflow-hidden border-2 border-cyan-400/30">
          <div className="block relative">
            <div className="aspect-[custum-aspect] overflow-hidden">
              <img src={imgUrl} alt="shop_img" className="w-full object-fill w-full" />
            </div>

            {off? <div className="absolute top-1 left-1 bg-red-400 text-white text-xs p-1 rounded-full product-off">{cashback}% Cashback</div> : ''}
            {cashback? <div className="absolute bottom-1 right-1 bg-red-400 text-white text-xs p-1 rounded-full product-cashback">{off}% OFF</div> : '' }            
            {saved? <AiFillHeart className="absolute top-1 right-1 text-2xl text-red-400" /> : <AiOutlineHeart className="absolute top-1 right-1 text-2xl text-gray-400" />}  
          
          </div>
          <div className="text-slate-700">
              <div className="font-bold ml-2 mt-2 product-name" >{name}</div>
              <div className="font-bold ml-2 mt-2" ><span className="product-price">${price}</span>{!oldPrice? "" : <span className="product-old-price text-xs text-slate-400 line-through ml-1">${oldPrice}</span>}</div>
              {rating? (
                <div className="font-bold ml-2 mt-2 mb-4 product-rating" >
                {[...Array(rating)].map((_, i: number) => (
                    <AiFillStar className="inline text-orange-500" key={i}/>
                ))}
                {[...Array(5-rating)].map((_, i: number) => (
                    <AiOutlineStar className="inline text-orange-500" key={i}/>
                ))} 
              </div>
              ) : ''}
          </div>
        </div>
      </Link>
    </>
  );
};
Product.defaultProps = {
  name:"",
  price:0,
  oldPrice:0,
  saved:false,
  imgUrl: "/no-image.png",
  off: 0,
  cashback: 0,
  rating:0,
}
