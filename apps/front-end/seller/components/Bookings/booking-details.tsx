import { useState } from "react";
import QRCodeVerification from "components/QRCodeVerification/QRCodeVerification";
import BookingOverview from "./BookingOverview";
import BookingSummaryCard from "./BookingSummary";
import CancellationPolicy from "./CancellationPolicy";
import PaymentStatus from "./PaymentStatus";
import ServiceItems from "./ServiceItems";
import ServiceLocation from "./ServiceLocation";
import BookingActionButtons from "./BookingActionButtons";
import CancelBookingModal from "components/modals/CancelBookingModal";

export default function BookingDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelBooking = () => {
    // Logic to cancel booking
    console.log("Booking has been cancelled.");
    setIsModalOpen(false);
  };

  const mockData = {
    bookingId: "BKG123456",
    overview: {
      clientName: "Julia Smith",
      dateTime: "July 20, 2024, 2:00 PM",
      duration: "2 hours",
      checkout: "Oct 27, 2024",
      guests: 2,
    },
    services: [
      {
        title: "Personalized Fitness Training",
        quantity: "1",
        image:
          "https://tse1.mm.bing.net/th/id/OIP.QFPOWhqfY2ntSapnRheFcgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Hotel",
        quantity: "1 night",
        image:
          "https://th.bing.com/th/id/R.f0dedca98dfe4615a60f88b66c350242?rik=6c5xhZLjCY6cpA&riu=http%3a%2f%2fimages.marketing-interactive.com.s3.amazonaws.com%2fwp-content%2fuploads%2f2017%2f04%2f00-Sheraton-Hong-Kong-Hotel-Exterior.jpg&ehk=M7HGY0IWWI%2bKxjYnjDMlvjfw8ihfSNTzNn11NakMXVA%3d&risl=&pid=ImgRaw&r=0",
      },
    ],
    clientImage:
      "https://randomuser.me/api/portraits/women/44.jpg",
    location: {
      name: "Clean Sweep Services",
      address: "123 Fitness Ave, Anytown, USA",
      contact: "555-123-4567",
    },
    summary: {
      serviceFee: 80,
      bookingFee: 5,
      cancellationFee: 5,
      total: 85,
    },
    payment: {
      cardLast4: "1234",
      status: "Cancelled",
      date: "July 18, 2024",
    },
    policy:
      "The guest may cancel the booking only up to 24 hours before the reservation time, unless they have paid a cancellation fee.",
    qrImage:
      "https://static.vecteezy.com/system/resources/previews/002/557/391/original/qr-code-for-scanning-free-vector.jpg",
    refundAmount: 75,
    checkIn: "July 20, 2024, 2:00 PM",
    checkOut: "July 20, 2024, 4:00 PM",
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <CancelBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancelBooking={handleCancelBooking}
        bookingId={mockData.bookingId}
        clientName={mockData.overview.clientName}
        clientImage={mockData.clientImage}
        date={mockData.overview.dateTime.split(",")[0]}
        time={mockData.overview.dateTime.split(",")[1]}
        duration={mockData.overview.duration}
        checkIn={mockData.checkIn}
        checkOut={mockData.checkOut}
        guestsAllowed={mockData.overview.guests}
        services={mockData.services}
        location={mockData.location.name}
        address={mockData.location.address}
        contact={mockData.location.contact}
        fees={mockData.summary}
        cardLast4={mockData.payment.cardLast4}
        refundAmount={mockData.refundAmount}
      />

      {/* Page Content */}
      <h1 className="text-2xl font-bold">Booking Details</h1>
      <BookingOverview overview={mockData.overview} />
      <ServiceItems services={mockData.services} />
      <ServiceLocation location={mockData.location} />
      <BookingSummaryCard {...mockData.summary} cardLast4={mockData.payment.cardLast4} status={mockData.payment.status} date={mockData.payment.date} />
      <PaymentStatus payment={mockData.payment} />
      <CancellationPolicy policy={mockData.policy} />
      <QRCodeVerification qrImage={mockData.qrImage} />
      <BookingActionButtons onCancel={() => setIsModalOpen(true)} />
    </main>
  );
}
