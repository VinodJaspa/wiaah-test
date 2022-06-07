export type ServiceType = "placeBooking" | "rendez-vous" | "thingsRenting";

export interface AddNewServiceDto {
  serviceType: ServiceType;
  serviceName: string;
  serviceAddress: string;
  serviceImages: File[];
  serviceVideos: File[];
}
