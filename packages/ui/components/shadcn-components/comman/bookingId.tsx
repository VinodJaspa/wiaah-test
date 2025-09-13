import React from "react";

export default function BookingID({ id }: { id: string }) {
  return (
    <p className="text-sm text-slate-500">
      <span className="font-medium">Booking ID:</span> {id}
    </p>
  );
}
