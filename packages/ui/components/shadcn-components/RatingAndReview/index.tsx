"use client";
import React from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

// ---------- Rating Summary ----------
const RatingSummary = ({
  average,
  totalReviews,
  breakdown,
}: {
  average: number;
  totalReviews: number;
  breakdown: { stars: number; percent: number }[];
}) => {
  return (
    <div className="flex gap-6 items-start">
      {/* Average Rating */}
      <div className="flex flex-col items-center">
        <p className="text-4xl font-bold">{average.toFixed(1)}</p>
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(average) ? "fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm">{totalReviews}+ reviews</p>
      </div>

      {/* Breakdown */}
      <div className="flex-1 space-y-2">
        {breakdown.map((b) => (
          <div key={b.stars} className="flex items-center gap-2">
            <p className="w-4 text-sm">{b.stars}</p>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-black rounded"
                style={{ width: `${b.percent}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{b.percent}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Review Card ----------
const ReviewCard = ({
  name,
  avatar,
  date,
  rating,
  text,
  likes,
  comments,
}: {
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
}) => {
  return (
    <div className="flex gap-4 py-6 border-b">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{date}</p>
        <div className="flex text-yellow-400 mt-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-700 mt-2">{text}</p>

        {/* Actions */}
        <div className="flex gap-4 mt-3 text-gray-500 text-sm">
          <div className="flex items-center gap-1 cursor-pointer">
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Main Reviews Section ----------
export default function ReviewsSection() {
  const breakdown = [
    { stars: 5, percent: 40 },
    { stars: 4, percent: 30 },
    { stars: 3, percent: 15 },
    { stars: 2, percent: 10 },
    { stars: 1, percent: 5 },
  ];

  const reviews = [
    {
      name: "Sophia Carter",
      avatar: "https://i.pravatar.cc/100?img=1",
      date: "2 months ago",
      rating: 5,
      text: "Absolutely stunning dress! The fit is perfect, and the material feels luxurious. I wore it to a gala, and received compliments all night. Highly recommend!",
      likes: 25,
      comments: 2,
    },
    {
      name: "Isabella Rossi",
      avatar: "https://i.pravatar.cc/100?img=2",
      date: "3 months ago",
      rating: 4,
      text: "The dress is beautiful and well-made, but the sizing runs a bit small. I had to exchange for a larger size, but the process was smooth. Overall, a great purchase.",
      likes: 18,
      comments: 3,
    },
    {
      name: "Ava Chen",
      avatar: "https://i.pravatar.cc/100?img=3",
      date: "4 months ago",
      rating: 5,
      text: "This dress exceeded my expectations! The design is elegant, and the quality is top-notch. It's a timeless piece that I’ll cherish for years to come.",
      likes: 30,
      comments: 1,
    },
  ];

  return (
    <div className="w-full  bg-white mt-4">
      {/* Summary */}
      <h2 className="text-base font-medium text-black mb-4">Rating and reviews</h2>
      <RatingSummary average={4.5} totalReviews={100} breakdown={breakdown} />

      {/* Reviews List */}
      <div className="mt-6">
        {reviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
    </div>
  );
}
