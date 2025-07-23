import React from "react";

// In WishlistTable.tsx
type WishlistItem = {
  id: number;
  image: string;
  title: string;
  price: string;
  stock: string; // changed from specific literal types
};


type WishlistTableProps = {
  items: WishlistItem[];
  onAddToCart: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function WishlistTable({
  items,
  onAddToCart,
  onRemove,
}: WishlistTableProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Product Title</th>
              <th className="py-3 px-4">Unit Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4 text-blue-600">{item.price}</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {item.stock}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-4">
                  <button
                    className="text-blue-600 font-medium hover:underline"
                    onClick={() => onAddToCart(item.id)}
                  >
                    Add to cart
                  </button>
                  <button
                    className="text-gray-500 hover:underline"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2 text-sm text-gray-600">
          <button className="px-2 py-1 hover:text-black">{'<'}</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-full ${
                page === 1
                  ? "bg-gray-200 text-black"
                  : "hover:bg-gray-100 hover:text-black"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-2 py-1 hover:text-black">{'>'}</button>
        </div>
      </div>
    </div>
  );
}
