import { QueryPaginationInputs } from "src";
import { DateRange } from "types";

export interface HotelsMetaData {
  serviceName: string;
  serviceId: string;
  serviceProvider: string;
  serviceThumbnail: string;
  location: string;
  type: string;
  rate: number;
  description: string;
  price: number;
  date: DateRange;
}

export const getHotelsMetaDataFetcher = async (
  pagination: QueryPaginationInputs,
  location: string
): Promise<HotelsMetaData[]> => {
  const data: HotelsMetaData[] = [
    {
      serviceId: "123",
      serviceName: "test",
      serviceProvider: "provider",
      serviceThumbnail: "/place-2.jpg",
      location,
      type: "professional host",
      description: "random description",
      rate: 3.75,
      date: {
        from: Date.now(),
        to: Date.now(),
      },
      price: 45,
    },
    {
      serviceId: "123",
      serviceName: "test",
      serviceProvider: "provider",
      serviceThumbnail: "/place-2.jpg",
      location,
      type: "professional host",
      description: "random description",
      rate: 3.75,
      price: 45,
      date: {
        from: Date.now(),
        to: Date.now(),
      },
    },
    {
      serviceId: "123",
      serviceName: "test",
      serviceProvider: "provider",
      serviceThumbnail: "/place-2.jpg",
      location,
      type: "professional host",
      description: "random description",
      rate: 3.75,
      price: 45,
      date: {
        from: Date.now(),
        to: Date.now(),
      },
    },
    {
      serviceId: "123",
      serviceName: "test",
      serviceProvider: "provider",
      serviceThumbnail: "/place-2.jpg",
      location,
      type: "professional host",
      description: "random description",
      rate: 3.75,
      price: 45,
      date: {
        from: Date.now(),
        to: Date.now(),
      },
    },
    {
      serviceId: "123",
      serviceName: "test",
      serviceProvider: "provider",
      serviceThumbnail: "/place-2.jpg",
      location,
      type: "professional host",
      description: "random description",
      rate: 3.75,
      price: 45,
      date: {
        from: Date.now(),
        to: Date.now(),
      },
    },
  ];
  return [...data, ...data];
};
