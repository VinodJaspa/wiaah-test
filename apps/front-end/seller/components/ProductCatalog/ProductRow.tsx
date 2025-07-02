
import ProductStatusBadge from "./   ProductStatusBadge";
import ProductActions from "./ProductActions";

export default function ProductRow({ product }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-4 px-4 align-middle">
        <img
          src={product.image}
          alt="product"
          className="w-10 h-10 rounded-full"
        />
      </td>
      <td className="py-4 px-4 align-middle text-gray-700 text-sm font-medium">
        #{product.id}
      </td>
      <td className="py-4 px-4 align-middle text-gray-700 text-sm break-words max-w-[180px]">
        {product.category}
      </td>
      <td className="py-4 px-4 align-middle text-gray-700 text-sm">
        {product.price} €
      </td>
      <td className="py-4 px-4 align-middle text-gray-700 text-sm">
        {product.stock}
      </td>
      <td className="py-4 px-4 align-middle">
        <ProductStatusBadge status={product.status} />
      </td>
      <td className="py-4 px-4 align-middle text-gray-500 text-sm">
        {product.updatedAt}
      </td>
      <td className="py-4 px-4 align-middle">
        <ProductActions />
      </td>
    </tr>
  );
}
