import React from "react";
import { HorizontalScrollSection } from "../sections/HorizontalScrollSection";

export default function PlacesAndVideos() {
  const places = [
    {
      title: "Hilton Walt Disney World",
      rating: 4.5,
      image: "/images/hilton1.jpg",
      buttonLabel: "Book now",
      onButtonClick: () => alert("Booked Hilton Walt Disney World"),
    },
    {
      title: "Hilton Walt Disney World",
      rating: 4.5,
      image: "/images/hilton2.jpg",
      buttonLabel: "Book now",
      onButtonClick: () => alert("Booked Hilton Walt Disney World"),
    },
    // ...more
  ];

  const videos = [
    {
      title: "Fashionista's Choice",
      rating: 4.5,
      reviews: 1200,
      image: "/images/fashion.jpg",
      buttonLabel: "Add to cart",
      onButtonClick: () => alert("Added to cart"),
      isVideo: true,
    },
    {
      title: "Grand Haven Hotel",
      rating: 4.5,
      reviews: 1200,
      image: "/images/hotel.jpg",
      buttonLabel: "Book now",
      onButtonClick: () => alert("Booked Grand Haven Hotel"),
      isVideo: true,
    },
    // ...more
  ];

  return (
    <div className="space-y-8 p-6">
      <HorizontalScrollSection title="Places near you" items={places} />
      <HorizontalScrollSection title="Most viewed videos" items={videos} />
    </div>
  );
}
