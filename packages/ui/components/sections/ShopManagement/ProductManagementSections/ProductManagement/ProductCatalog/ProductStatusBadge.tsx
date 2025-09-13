export default function ProductStatusBadge({ status }) {
  const color = {
    "Online": "bg-green-100 text-green-800",
    "Out of Stock": "bg-red-100 text-red-800",
    "Pending Review": "bg-yellow-100 text-yellow-800",
  }[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-center ${color}`}
    >
      {status}
    </span>
  );
}
