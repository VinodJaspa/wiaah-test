import { useRecoilState } from "recoil";
import {
  AddressCardDetails,
  AddressDetails,
} from "types/market/AddressDetails.interface";
import { UserAddressesState } from "../state";

export const useUserAddresses = () => {
  const [addresses, setAddresses] = useRecoilState(UserAddressesState);

  function DeleteAddress(itemId: string) {
    setAddresses((state) => state.filter((item) => item.id !== itemId));
  }
  function UpdateAddress(itemId: string, updatedInput: AddressDetails) {
    const itemIndex = addresses.findIndex((address) => address.id === itemId);
    if (itemIndex < 0) return;
    const itemsBefore = addresses.slice(0, itemIndex);
    const itemsAfter = addresses.slice(itemIndex, addresses.length - 1);
    setAddresses([
      ...itemsBefore,
      { id: itemId, ...updatedInput },
      ...itemsAfter,
    ]);
  }
  function AddAddress(address: AddressCardDetails) {
    setAddresses((state) => [...state, address]);
  }
  return {
    DeleteAddress,
    UpdateAddress,
    AddAddress,
    addresses,
  };
};
