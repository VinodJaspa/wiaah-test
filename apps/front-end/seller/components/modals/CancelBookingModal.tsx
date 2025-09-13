import { Dialog } from "@headlessui/react";
import ImageBox from "@UI/components/shadcn-components/ImageBox/ImageBox";
import IconTextRow from "components/Bookings/IconTextRow";

import { Contact, MapPin } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai";

interface ServiceItem {
  title: string;
  quantity: string;
  image: string;
}

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: () => void;
  bookingId: string;
  clientName: string;
  clientImage: string;
  date: string;
  time: string;
  duration: string;
  checkIn: string;
  checkOut: string;
  guestsAllowed: number;
  services: ServiceItem[];
  location: string;
  address:string;
  contact: string;
  fees: {
    serviceFee: number;
    bookingFee: number;
    cancellationFee: number;
    total: number;
  };
  cardLast4: string;
  refundAmount: number;
}

export default function CancelBookingModal({
  isOpen,
  onClose,
  onCancelBooking,
  bookingId,
  clientName,
  clientImage,
  date,
  time,
  duration,
  checkIn,
  checkOut,
  guestsAllowed,
  services,
  location,
  address,
  contact,
  fees,
  cardLast4,
  refundAmount,
}: CancelBookingModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centered Modal */}
      <div className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-4xl mx-auto my-auto z-50">
        <Dialog.Panel className="bg-white rounded-lg overflow-auto max-h-[90vh] shadow-lg w-auto px-6 py-10 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-semibold">
              Booking Cancel
            </Dialog.Title>
            <button onClick={onClose}>
              <AiOutlineClose className="text-gray-500 hover:text-black text-lg" />
            </button>
          </div>
          <p className="text-sm text-green-600">Booking ID: {bookingId}</p>

          {/* Client Info */}
          <div className="flex items-center space-x-4">
            <ImageBox
              src={clientImage}
              alt={clientName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-600">Client</p>
              <p className="font-medium">{clientName}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
            <div>
              <p className="font-medium">Booking Date & Time</p>
              <p>{date}, {time}</p>
            </div>
            <div>
              <p className="font-medium">Service Duration</p>
              <p>{duration}</p>
            </div>
            <div>
              <p className="font-medium">Check-in/out</p>
              <p>Check-in: {checkIn}<br />Check-out: {checkOut}</p>
            </div>
            <div>
              <p className="font-medium">Guests Allowed</p>
              <p>{guestsAllowed} guests</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-2">Services Booked</h3>
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center space-x-3 mb-2">
                <img src={service.image} alt={service.title} className="w-10 h-10 rounded object-cover" />
                <div>
                  <p className="font-medium">{service.title}</p>
                  <p className="text-sm text-gray-600">{service.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="text-sm text-gray-700">
            <h3 className="font-semibold mb-1">Service Location</h3>
            <div className="space-y-4">
              <IconTextRow
                icon={<MapPin className="w-6 h-6" />}
                title={location}
                subtitle={address}
              />
              <IconTextRow
                icon={<Contact className="w-6 h-6" />}
                title="Contact"
                subtitle={contact}
              />
            </div>
          </div>

          {/* Fees */}
          <div className="text-sm text-gray-800">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${fees.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Fee</span>
                <span>${fees.bookingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation Fee</span>
                <span>${fees.cancellationFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 border-t pt-2">
                <span>Total</span>
                <span>${fees.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-1">Payment Info</h3>
            <p className="text-sm text-gray-800">Visa **** {cardLast4}</p>
          </div>

          {/* Refund */}
          <div>
            <h3 className="font-semibold mb-1">Refund Details</h3>
            <p className="text-red-600 font-semibold text-sm">
              Total amount to refund: ${refundAmount}
            </p>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <button
              onClick={onCancelBooking}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Cancel Booking
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
