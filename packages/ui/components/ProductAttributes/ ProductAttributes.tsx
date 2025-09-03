import React from "react";
import { useFormikContext } from "formik";


import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import SelectField from "@UI/components/shadcn-components/Fields/SelectField";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import { CreateProductInput } from "@features/API/gql/generated";
import SpecialDiscount from "@features/Services/components/ProductDiscount";
const colors = [
  { value: "red", colorCode: "#ff0000" },
  { value: "green", colorCode: "#00ff00" },
  { value: "blue", colorCode: "#0000ff" },
  { value: "yellow", colorCode: "#ffff00" },
];

const sizes = ["S", "M", "L", "XL"];
const genders = [
  { label: "Male", id: "550e8400-e29b-41d4-a716-446655440000", value: "male" },
  { label: "Female", id: "550e8400-e29b-41d4-a716-446655440001", value: "female" },
  { label: "Unisex", id: "550e8400-e29b-41d4-a716-446655440002", value: "unisex" },
];
const material = [
  { label: "ll", id: "550e8400-e29b-41d4-a716-446655440000", value: "ll" },
  { label: "lether", id: "550e8400-e29b-41d4-a716-446655440001", value: "Leather" },
  { label: "PU", id: "550e8400-e29b-41d4-a716-446655440002", value: "PU" },
];


const subcategories = [
  { label: "Wallets", id: "550e8400-e29b-41d4-a716-446655440010", value: "wallets" },
  { label: "Bags", id: "550e8400-e29b-41d4-a716-446655440011", value: "bags" },
  { label: "Belts", id: "550e8400-e29b-41d4-a716-446655440012", value: "belts" },
];

const productTypes = [
  { label: "Physical Goods", id: "550e8400-e29b-41d4-a716-446655441000", value: "physical_goods" },
  { label: "Digital Goods", id: "550e8400-e29b-41d4-a716-446655441001", value: "digital_goods" },
  { label: "Services", id: "550e8400-e29b-41d4-a716-446655441002", value: "services" },
];

const conditions = [
  { label: "New", id: "550e8400-e29b-41d4-a716-446655442000", value: "new" },
  { label: "Used - Like New", id: "550e8400-e29b-41d4-a716-446655442001", value: "used_like_new" },
  { label: "Used - Good", id: "550e8400-e29b-41d4-a716-446655442002", value: "used_good" },
  { label: "Refurbished", id: "550e8400-e29b-41d4-a716-446655442003", value: "refurbished" },
];

const shippingSettings = [
  { label: "Free Shipping", id: "550e8400-e29b-41d4-a716-446655443000", value: "free_shipping" },
  { label: "Flat Rate", id: "550e8400-e29b-41d4-a716-446655443001", value: "flat_rate" },
  { label: "Calculated at Checkout", id: "550e8400-e29b-41d4-a716-446655443002", value: "calculated_at_checkout" },
];


export default function ProductAttributes({ handleOpenModal }: { handleOpenModal: () => void }) {
  const { values, errors, touched, setFieldValue } = useFormikContext<CreateProductInput>();

  // Toggle color selection
  function handleColorSelect(value: string) {
    const selectedColors = values.colors || [];
    if (selectedColors.includes(value)) {
      setFieldValue(
        "colors",
        selectedColors.filter((c) => c !== value)
      );
    } else {
      setFieldValue("colors", [...selectedColors, value]);
    }
  }

  // Toggle size selection (lowercase)
  function handleSizeSelect(value: string) {
    const selectedSizes = values.sizes || [];
    if (selectedSizes.includes(value)) {
      setFieldValue(
        "sizes",
        selectedSizes.filter((s) => s !== value)
      );
    } else {
      setFieldValue("sizes", [...selectedSizes, value]);
    }
  }

  return (
    <>
      <Subtitle>Product Attributes</Subtitle>

      <div className="flex flex-col space-y-4">
        <InputField type="number"  name="price" label="Price" placeholder="e.g., 49.99" />
        <InputField type="number"  name="stock" label="Inventory" placeholder="e.g., 100" />

        <SelectField
          label="Category"
          name="categoryId"
          options={[{ label: "Wallet", id: "550e8400-e29b-41d4-a716-446655440100" ,value:'wallet' }]}
    
        />

        <SelectField
          label="Subcategory"
          name="subcategoryId"
          options={subcategories}
    
        />

        {/* Colors */}
        <div>
  <label className="block font-medium mb-1">Color</label>
  <div className="flex space-x-3">
    {colors.map(({ value, colorCode }) => (
      <button
        key={value}
        type="button"
        className={`w-6 h-6 rounded-full border-2 ${
          (values.colors || []).includes(value) ? "border-black" : "border-transparent"
        }`}
        style={{ backgroundColor: colorCode }}
        onClick={() => handleColorSelect(value)}
      />
    ))}
  </div>
  {/* Error message for colors */}
  {touched.colors && errors.colors && (
    <p className="text-red-600 text-sm mt-1">{errors.colors}</p>
  )}
</div>

<div>
  <label className="block font-medium mb-1">Size</label>
  <div className="flex space-x-2">
    {sizes.map((size) => {
      const lower = size.toLowerCase();
      return (
        <button
          key={size}
          type="button"
          className={`rounded-full px-3 py-1 text-sm border ${
            (values.sizes || []).includes(lower)
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleSizeSelect(lower)}
        >
          {size}
        </button>
      );
    })}
  </div>
  {/* Error message for sizes */}
  {touched.sizes && errors.sizes && (
    <p className="text-red-600 text-sm mt-1">{errors.sizes}</p>
  )}
</div>
<SelectField
          label="Material"
          name="material"
          placeholder="Enter product material"
          options={material}
    
        />

        {/* <InputField name="material" label="Material" placeholder="Enter product material" /> */}

        <SelectField
          label="Department (Gender)"
          name="gender"
          options={genders}
    
        />

        <InputField name="productDimensions" label="Product Dimensions" placeholder="LxWxH (in)" />

        <InputField name="itemWeight" label="Item Weight (lbs)" placeholder="Enter weight" />

        <InputField name="modelNumber" label="Model Number" placeholder="Enter model number" />

        <InputField name="eanUpc" label="EAN / UPC" placeholder="Enter EAN/UPC" />

        <SelectField
          label="Product Type"
          name="type"
          options={productTypes}
    
        />

        <SelectField
          label="Condition"
          name="condition"
          options={conditions}
    
        />

        <SpecialDiscount handleOpenModal={handleOpenModal} />

        <SelectField
          label="Shipping Settings"
          name="shippingSettings"
          options={shippingSettings}
    
        />
      </div>
    </>
  );
}
