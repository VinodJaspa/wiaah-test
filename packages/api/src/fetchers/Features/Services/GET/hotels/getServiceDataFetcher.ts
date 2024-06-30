import { ServiceData, ServicePaymentMethod } from "types";
import { FetchingMock } from "utils";

export const getServiceDataFetcher = async (
  id: string,
): Promise<ServiceData> => {
  if (!id) throw new Error("invalid service id provided");
  await FetchingMock;

  return {
    available: 5,
    cashBack: {
      unit: "%",
      value: 5,
    },
    category: "hotels",
    discount: {
      discount: {
        unit: "%",
        value: 5,
      },
      discountedUnits: 15,
    },
    id: "1",
    included: ["breakfast", "park"],
    name: "service name",
    rating: 4,
    reviews: 15,
    servicePresentation: [
      {
        type: "image",
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
      {
        type: "image",
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
      },
      {
        type: "image",
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
      },
      {
        type: "image",
        original: "https://picsum.photos/id/1020/1000/600/",
        thumbnail: "https://picsum.photos/id/1020/250/150/",
      },
      {
        type: "video",
        original:
          "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
        thumbnail:
          "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
      },
    ],
    shippedToYourCountry: true,
    price: {
      amount: 150,
      currency: "USD",
    },
    serviceRules: {
      refundable: false,
      payment: ServicePaymentMethod.Cash,
    },
    serviceTransport: {
      airCondition: true,
      luggageCapacity: 2,
      guests: 5,
      passengers: 15,
      seats: 5,
      type: "automatic",
      typeOfDevice: "Mobile",
    },
    type: "rent",
    propertyDetails: {
      size: {
        inMeter: 5,
        inFeet: 30,
      },
      residentsCapacity: {
        max: 2,
        residentType: "adults",
      },
    },
    videoConsulition: true,
  };
};
