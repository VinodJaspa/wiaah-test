import ReviewList from "./ReviewList";
import ReviewStats from "./ReviewStats";


export default function ProductReviewSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white">
      <ReviewStats />
      <ReviewList />
    </div>
  );
}
