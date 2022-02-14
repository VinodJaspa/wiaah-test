import React, { useState } from "react";
import { BuyerComment } from "./BuyerComment";

export interface ProductDescriptionProps {
  /**
   * How large should the button be?
   */
  description: string;
  /**
   * Primary UI component for user interaction
   */
  comments: Array<{
    name: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}
/**
 * Product full description and reviews component.
 */
export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  comments,
  description = "Product Description here!",
}) => {
  let [tab, setTab] = useState(0);
  return (
    <>
      <div className="">
        <div className="product-tab-titles">
          <button
            onClick={() => {
              setTab(0);
            }}
            className={`${
              tab == 0 ? "green-background text-white" : "text-gray-500"
            }  h-9 px-4`}
          >
            Description
          </button>
          <button
            onClick={() => {
              setTab(1);
            }}
            className={`${
              tab == 1 ? "green-background text-white" : "text-gray-500"
            }  h-9 px-4`}
          >
            Reviews ({comments.length})
          </button>
        </div>
        <div className="h-px bg-gray-200"></div>
        <div className={`${tab == 0 ? "hidden" : ""} h-96 overflow-scroll`}>
          {comments.map((item, key: number) => {
            return (
              <div className="mt-3" key={key}>
                <BuyerComment
                  name={item.name}
                  date={item.date}
                  rating={item.rating}
                  comment={item.comment}
                />
              </div>
            );
          })}
        </div>
        <div
          className={`${tab == 1 ? "hidden" : ""} h-96 overflow-scroll pt-3`}
        >
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </>
  );
};
