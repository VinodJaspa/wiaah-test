import React from "react"
import ShippingItem from "./ShippingItem";


const shippingMethods = [
  { label: "Free Shipping", description: "4–8 business days" },
  { label: "Click & Collect", description: "Collect at Shop in 30 minutes" },
  { label: "Express", description: "1–2 business days" },
  { label: "Economy", description: "3–5 business days" },
  { label: "Priority", description: "1–2 business days" },
];

export default function ShippingList() {
  return (
    <div className="divide-y border rounded-md overflow-hidden">
      {shippingMethods.map((method, index) => (
        <ShippingItem
          key={index}
          label={method.label}
          description={method.description}
          onClick={() => alert(`Edit ${method.label}`)}
        />
      ))}
    </div>
  );
}
