"use client";

import React, { useState } from "react";
import AddNewProductButton from "./ProductCatalog/AddNewProductButton";
import { useGetUserProducts } from "@features/index";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import FilterBar from "./ProductCatalog/FilterBar";
import ProductRow from "./ProductCatalog/ProductRow";
import ProductFormLayout from "./AddNewProduct";


const PRODUCTS_PER_PAGE = 5;

export default function ProductTable() {
  const [isAddProduct, setAddProduct] = useState(false);
  // Initial args for query (no cursor initially)
  const initialArgs = {
    sellerId:"6897636c1600dcf693161c0e",
    take: PRODUCTS_PER_PAGE,
    idCursor: undefined,
  };
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserProducts(initialArgs);

  // Flatten pages data into one array for rendering
  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="px-6 py-6 space-y-6">
      {isAddProduct ? (
        <ProductFormLayout setAddProduct={setAddProduct} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Product Catalog</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your product listings, update details, and track inventory.
              </p>
            </div>
            <AddNewProductButton handleClick={() => setAddProduct(true)} />
          </div>

          <SearchBoxInner />
          <FilterBar />

          {/* Table */}
          <div className="overflow-hidden border rounded-xl bg-white mt-4">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr className="border-b">
                  <th className="p-3 font-medium text-center">Product</th>
                  <th className="p-3 font-medium text-center">Product ID</th>
                  <th className="p-3 font-medium text-center">Category</th>
                  <th className="p-3 font-medium text-center">Price</th>
                  <th className="p-3 font-medium text-center">Stock</th>
                  <th className="p-3 font-medium text-center">Status</th>
                  <th className="p-3 font-medium text-center">Last Updated</th>
                  <th className="p-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      Loading products...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4 text-red-500">
                      Error loading products.
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Load More button for pagination */}
          {hasNextPage && !isLoading && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
