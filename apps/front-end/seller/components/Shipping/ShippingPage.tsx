import React from "react";
import { useState } from "react";
import ShippingList from "./ShippingList";

import AddShippingModal from "components/modals/AddShippingModal";
import AddShippingButton from "./AddShippingButton";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";


export default function ShippingSettingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen px-6 py-10 bg-white space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping Settings</h1>
          <p className="mt-2 text-sm font-medium text-gray-700">Define Your Shipping Region and rates</p>
        </div>
        <AddShippingButton onClick={() => setIsModalOpen(true)} />
      </div>

      <ShippingList />
      <Pagination />

      <AddShippingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}