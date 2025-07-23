import TextInput from "./TextInput";
import Dropdown from "./Dropdown";
import DimensionInput from "./DimensionInput";
import SpecialDiscount from "./ProductDiscount";

export default function ProductAttributes({handleOpenModal}) {
  return (
    <>
      <h2 className="font-bold text-md text-black mb-2">Product Attributes</h2>
      <div className="flex flex-col space-y-4">
        <TextInput label="Price" placeholder="e.g., 49.99" />
        <TextInput label="Inventory" placeholder="e.g., 100" />
        <Dropdown label="Category" options={[{ label: "Wallet", value: "wallet" }]} />
        <Dropdown label="Subcategory" options={[]} />
        <TextInput label="Model Number" placeholder="e.g., MWL-001" />
        <TextInput label="Weight (kg)" placeholder="e.g., 0.5" />
        <DimensionInput label="Dimensions (cm)" />
        <TextInput label="Material" placeholder="e.g., Genuine Leather" />
        <Dropdown label="Gender" options={[{ label: "Unisex", value: "unisex" }]} />
        <DimensionInput label="Custom Dimensions (cm)" />
        <TextInput label="Model Number" placeholder="e.g., SKU-001" />
        <TextInput label="SKU / BARCODE" placeholder="e.g., 1234567890123" />
        <Dropdown label="Product Type" options={[]} />
        <Dropdown label="Condition" options={[]} />
       <SpecialDiscount handleOpenModal={handleOpenModal}/>
        <Dropdown label="Shipping Settings" options={[]} />
      </div>
    </>
  );
}
