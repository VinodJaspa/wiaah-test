import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import ReviewItem from "./ReviewItem";


const reviews = [
  {
    name: "Sophia Carter",
    timeAgo: "2 weeks ago",
    rating: 5,
    comment:
      "Absolutely love this product! The quality is fantastic, and it fits perfectly. Highly recommend!",
    likes: 25,
    replies: 5,
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    name: "Ethan Bennett",
    timeAgo: "1 month ago",
    rating: 4,
    comment: "Great product overall. The design is stylish, and the material feels durable.",
    likes: 18,
    replies: 3,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Olivia Hayes",
    timeAgo: "2 months ago",
    rating: 3,
    comment: "It’s an okay product. The functionality is decent, but it doesn’t stand out.",
    likes: 12,
    replies: 2,
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  // Repeat more if needed for pagination
];

export default function ReviewList() {
  return (
    <div className="mt-6 space-y-4">
      {reviews.map((review, idx) => (
        <ReviewItem key={idx} {...review} />
      ))}
      <div className="pt-6">
        <Pagination total={5} current={1} onPageChange={() => {}} />
      </div>
    </div>
  );
}
