import AddNewShippingButton from "@UI/components/shadcn-components/AddressCard/AddNewShippingButton";
import AddressCard from "@UI/components/shadcn-components/AddressCard/AddressCard";
import IllustrationCard from "@UI/components/shadcn-components/AddressCard/IllustrationCard";
import { useResponsive } from "hooks";
import React from "react"
import { FiEdit2 } from "react-icons/fi";
import { HiArrowLeft, HiHome } from "react-icons/hi";
import AddAddressDialog from "../AddAddressDialog";


const addresses = {
  shipping: [
    "123 Main St, Apt 4B, Anytown, CA 91234",
    "123 Main St, Apt 4B, Anytown, CA 91234",
  ],
  billing: ["123 Main St, Apt 4B, Anytown, CA 91234"],
};

function AddressItem({ address }: { address: string }) {
  return (
    <div className="flex items-start justify-between p-3 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
          <HiHome className="text-xl text-gray-700" />
        </div>
        <div className="text-sm text-gray-800">
          <p className="font-medium mb-0.5">Home</p>
          <p className="text-gray-600 leading-snug">{address}</p>
        </div>
      </div>
      <button className="text-gray-600 hover:text-gray-800 p-1">
        <FiEdit2 />
      </button>
    </div>
  );
}

function AddressBookMobile({setOpen}) {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-900 mb-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition"
        >
          <HiArrowLeft className="text-xl" />
        </button>
        <h1 className="text-lg font-semibold">My Address Book</h1>
      </div>

      {/* Shipping Addresses */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-2">Shipping Address</h2>
        <div className="space-y-4">
          {addresses.shipping.map((addr, i) => (
            <AddressItem key={i} address={addr} />
          ))}
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mt-6 mb-2">Billing Address</h2>
        <div className="space-y-4">
          {addresses.billing.map((addr, i) => (
            <AddressItem key={i} address={addr} />
          ))}
        </div>
      </div>

      {/* Add New Address Button */}
      <div className="pt-6">
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-3 rounded-md hover:bg-gray-800 transition">
          <span className="text-xl">＋</span> Add new address
        </button>
      </div>
    </div>
  );
}

export default function AddressBookSection() {
  const [open, setOpen] = React.useState(false);
  const handleEdit = (label: string) => {
    console.log("Edit clicked for:", label);
  };
  const { isMobile } = useResponsive();

  if (isMobile) {
    return <AddressBookMobile setOpen={setOpen} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
            <AddAddressDialog isOpen={open} onClose={() => setOpen(false)} />
      {/* Left Column */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Address Book</h1>
        <p className="text-sm text-gray-500 mb-8">
          Manage your saved addresses for faster checkout.
        </p>

        <AddressCard
          label="Default delivery Address"
          name="Liam Carter"
          address={["123 Maple Street", "Springfield, CA 91234", "United States"]}
          onEdit={() => handleEdit("Default delivery Address")}
        />

        <AddressCard
          label="Other Addresses"
          name="Olivia Bennett"
          address={["456 Oak Avenue", "Springfield, CA 91234", "United States"]}
          onEdit={() => handleEdit("Other Addresses")}
        />

        <AddressCard
          label="Billing address"
          name="Noah Thompson"
          address={["789 Pine Lane", "Springfield, CA 91234", "United States"]}
          onEdit={() => handleEdit("Billing address")}
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col items-end gap-4">
        <AddNewShippingButton onClick={() => setOpen(true)} />
        <IllustrationCard imageSrc="/address-home.svg" />
        <IllustrationCard imageSrc="/other-address.svg" />
        <IllustrationCard imageSrc="/billing-address.svg" />
      </div>
    </div>
  );
}
