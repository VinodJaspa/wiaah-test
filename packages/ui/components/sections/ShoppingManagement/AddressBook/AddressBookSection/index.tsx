import AddNewShippingButton from "@UI/components/shadcn-components/AddressCard/AddNewShippingButton";
import AddressCard from "@UI/components/shadcn-components/AddressCard/AddressCard";
import IllustrationCard from "@UI/components/shadcn-components/AddressCard/IllustrationCard";


export default function AddressBookSection() {
  const handleEdit = (label: string) => {
    console.log("Edit clicked for:", label);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
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
        <AddNewShippingButton onClick={() => console.log("Add New Shipping")} />

        <IllustrationCard imageSrc="/house-1.png" />
        <IllustrationCard imageSrc="/house-2.png" />
        <IllustrationCard imageSrc="/house-3.png" />
      </div>
    </div>
  );
}
