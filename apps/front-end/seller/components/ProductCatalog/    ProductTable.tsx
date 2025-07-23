"use client";

import React, { useState } from "react";

import ProductRow from "./ProductRow";
import FilterBar from "./    FilterBar";
import AddNewProductButton from "./    AddNewProductButton";

import { useRouter } from "next/router";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";

const PRODUCTS_PER_PAGE = 5;

export const products = [
  {
    id: "3821",
    image: "https://m.media-amazon.com/images/I/61DAwd0Wt-L._SL1280_.jpg",
    category: "Electronics > Audio",
    price: 59.99,
    stock: "12 units left",
    status: "Online",
    updatedAt: "June 21, 2025",
  },
  {
    id: "4512",
    image: "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
    category: "Home & Kitchen > Appliances",
    price: 129.5,
    stock: "Out of Stock",
    status: "Out of Stock",
    updatedAt: "June 15, 2025",
  },
  {
    id: "5298",
    image: "https://th.bing.com/th/id/OIP.uJp4icgDciz4ezqtfL2FmAHaNK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Fashion > Accessories",
    price: 25.75,
    stock: "25 units left",
    status: "Online",
    updatedAt: "June 20, 2025",
  },
  {
    id: "6147",
    image: "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
    category: "Books > Fiction",
    price: 14.99,
    stock: "Pending Review",
    status: "Pending Review",
    updatedAt: "June 22, 2025",
  },
  {
    id: "7833",
    image: "https://tse1.mm.bing.net/th/id/OIP.Xw2KHWc7JA1DAhakF8KCsAHaLI?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Sports & Outdoors > Equipment",
    price: 79.99,
    stock: "8 units left",
    status: "Online",
    updatedAt: "June 18, 2025",
  },
  {
    id: "3821",
    image: "https://m.media-amazon.com/images/I/61DAwd0Wt-L._SL1280_.jpg",
    category: "Electronics > Audio",
    price: 59.99,
    stock: "12 units left",
    status: "Online",
    updatedAt: "June 21, 2025",
  },
  {
    id: "4512",
    image: "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
    category: "Home & Kitchen > Appliances",
    price: 129.5,
    stock: "Out of Stock",
    status: "Out of Stock",
    updatedAt: "June 15, 2025",
  },
  {
    id: "5298",
    image: "https://th.bing.com/th/id/OIP.uJp4icgDciz4ezqtfL2FmAHaNK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Fashion > Accessories",
    price: 25.75,
    stock: "25 units left",
    status: "Online",
    updatedAt: "June 20, 2025",
  },
  {
    id: "6147",
    image: "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
    category: "Books > Fiction",
    price: 14.99,
    stock: "Pending Review",
    status: "Pending Review",
    updatedAt: "June 22, 2025",
  },
  {
    id: "7833",
    image: "https://tse1.mm.bing.net/th/id/OIP.Xw2KHWc7JA1DAhakF8KCsAHaLI?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Sports & Outdoors > Equipment",
    price: 79.99,
    stock: "8 units left",
    status: "Online",
    updatedAt: "June 18, 2025",
  },
];

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginated = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );
  const router = useRouter()

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product listings, update details, and track inventory.
          </p>
        </div>
        <AddNewProductButton handleClick ={()=>router.push("/add-product") } />
      </div>
    <SearchBoxInner/>
      {/* Filters */}
      <FilterBar />

      {/* Table */}
      <div className="overflow-hidden border rounded-xl bg-white mt-4">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr className="border-b">
              <th className="p-3 font-medium text-center">Product</th>
              <th className="p-3 font-medium text-center">Product ID</th>
              <th className="p-3 font-medium text-center">Category</th>
              <th className="p-3 font-mediu text-centerm">Price</th>
              <th className="p-3 font-medium text-center">Stock</th>
              <th className="p-3 font-medium text-center">Status</th>
              <th className="p-3 font-medium text-center">Last Updated</th>
              <th className="p-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginated.map((p) => (
              <ProductRow key={p.id} product={p} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-2">
        <nav className="inline-flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1 text-gray-500 hover:text-black disabled:opacity-30"
            disabled={page === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 text-gray-500 hover:text-black disabled:opacity-30"
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </nav>
      </div>
    </div>
  );
}
