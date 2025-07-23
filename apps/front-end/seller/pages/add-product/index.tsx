import ImageUploader from "components/ImageUploader";
import TitleDescriptionSection from "components/TitleDescriptionSection";

import Head from "next/head";
import { SellerLayout } from "@blocks";
import ProductAttributes from "components/ ProductAttributes";
import React from "react";
import AddDiscountModal from "components/modals/AddDiscountModal";

export default function ProductFormLayout() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <Head>
        <title>wiaah | add products</title>
      </Head>
      <SellerLayout>
      <AddDiscountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <form className="w-full px-32 py-4 space-y-6">
          <h1 className="text-2xl font-semibold">Add a new product</h1>

          <TitleDescriptionSection />

          <div className="space-y-4 w-full">
            <h2 className="text-lg font-medium">Images & Video</h2>

            {/* Thumbnails preview */}
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-md" />
              <div className="w-24 h-24 bg-gray-200 rounded-md" />
            </div>

            <ImageUploader type="image" />
            <ImageUploader type="video" />
          </div>

          <ProductAttributes  handleOpenModal={()=> setIsModalOpen(true)} />

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-black text-white text-sm font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </SellerLayout>
    </>
  );
}
