export interface Room {
  type: string;
  nightPrice: number;
  nights: number;
}
export interface Service {
  serviceThumbnail: string;
  serviceName: string;
  serviceOwner: string;
  contacts?: {
    phone?: string;
    email?: string;
  };
  rooms: Room[];
}
