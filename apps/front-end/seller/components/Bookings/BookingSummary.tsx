import React from "react";

interface BookingSummaryProps {
  serviceFee: number;
  bookingFee: number;
  cancellationFee: number;
  total: number;
  cardLast4: string;
  status: string;
  date: string;
  showCancellationPolicy?: boolean;
  instructions?: string;
}

const BookingSummaryCard: React.FC<BookingSummaryProps> = ({
  serviceFee,
  bookingFee,
  cancellationFee,
  total,
  cardLast4,
  status,
  date,
  showCancellationPolicy = true,
  instructions = "Please arrive 15 minutes early for a brief consultation. Wear comfortable workout attire and bring a water bottle.",
}) => {
  return (
    <div className="max-w-lg w-full bg-white">
      <div>
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 text-sm">{instructions}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
        <div className="text-sm text-gray-800 space-y-1">
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Booking Fee</span>
            <span>${bookingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cancellation Fee</span>
            <span>${cancellationFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Payment Info</h2>
        <p className="text-sm text-gray-800">Visa **** {cardLast4}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Status</h2>
        <p className="text-sm text-gray-800">{status}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>

      {showCancellationPolicy && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Cancellation Policy</h2>
          <p className="text-sm text-gray-600">
            The guest may cancel the booking only up to 24 hours before the reservation time, unless they have paid a cancellation fee.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingSummaryCard;
