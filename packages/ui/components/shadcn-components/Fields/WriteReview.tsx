import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, review });
    onClose(); // close modal after submit
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Scrollable Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
          {/* Title */}
          <Dialog.Title className="text-center text-base font-medium mb-4">
            Write a review
          </Dialog.Title>

          {/* Product Info */}
          <div className="flex flex-col items-start">
            <img
              src="https://picsum.photos/500/450?random=1"
              alt="Product"
              className="rounded-xl w-full object-cover max-h-[250px]"
            />
            <div className="mt-4 text-start">
              <h3 className="font-semibold">Cozy Knit Sweater</h3>
              <p className="text-gray-500 text-sm">$49.99</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2 text-center">
              How would you rate this product?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    rating === star
                      ? "bg-black text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {"★".repeat(star)}
                </button>
              ))}
            </div>
          </div>

          {/* Review Box */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="text-sm font-medium">Write your review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Share your thoughts..."
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-1/2 pl-4 pr-4 bg-gray-100 hover:bg-gray-200 text-black font-medium py-3 rounded-lg transition"
            >
              Submit Review
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewFormModal;
