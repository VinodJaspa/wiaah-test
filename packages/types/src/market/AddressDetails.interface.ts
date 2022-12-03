export interface AddressCardDetails extends AddressDetails {
  id: string;
}
export interface AddressDetails {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode?: number;
  country: string;
  city: string;
  contact: string | number;
}

export interface AddressInputsFields extends AddressDetails {
  defaultDeliveryAddress?: boolean;
  defaultBillingAddress?: boolean;
}
