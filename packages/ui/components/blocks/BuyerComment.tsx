import React from "react";
import { Rate } from "antd";

export interface BuyerCommentProps {
  name?: string;
  date?: string;
  rating?: number;
  comment?: string;
}

export const BuyerComment: React.FC<BuyerCommentProps> = ({
  name,
  date,
  rating = 0,
  comment,
}) => {
  return (
    <>
      <div>
        <span className="mr-4 font-bold">{name}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div className="mt-2">
        <Rate disabled allowHalf value={rating} className="text-orange-500" />
      </div>
      <div className="mt-2">{comment}</div>
      <div className="mt-3 h-px bg-gray-200"></div>
    </>
  );
};
