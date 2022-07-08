export interface ServiceMetaData {
  serviceName: string;
  serviceId: string;
  serviceProvider: string;
  serviceThumbnail: string;
  location: string;
  type: string;
  rate: number;
  description: string;
  price: number;
  date: {
    from: number;
    to: number;
  };
}

export const getServicesMetaDataFetcher = async (
  take: number,
  page: number,
  location: string
): Promise<ServiceMetaData[]> => {
  const data: ServiceMetaData[] = [
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
