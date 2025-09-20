import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";

export default function ReviewItem({
  name,
  timeAgo,
  rating,
  comment,
  likes,
  replies,
  avatar,
}: {
  name: string;
  timeAgo: string;
  rating: number;
  comment: string;
  likes: number;
  replies: number;
  avatar: string;
}) {
  return (
    <div className="flex space-x-4 py-4 border-b">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="font-medium text-black">{name}</span>
          <span>{timeAgo}</span>
        </div>
        <div className="text-yellow-400 text-lg mb-1">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
        <p className="text-sm text-gray-800 mb-2">{comment}</p>
        <div className="flex items-center gap-4 text-gray-500 text-xs">
          <span className="flex items-center gap-1">
            <FaThumbsUp /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <FaCommentAlt /> {replies}
          </span>
        </div>
      </div>
    </div>
  );
}
