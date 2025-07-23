
import { useRouter } from "next/router";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getRouting } from "routing";
import ReturnedOrderDetail from "components/ReturnOrders/ReturnedOrderDetail";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";


const MOCK_RETURNS = [
    {
      id: 1,
      status: "Return Initiated",
      orderId: "#9876543210",
      image: "https://image.hm.com/assets/hm/69/32/69320b14b0a02aad0aeddc7b670826b1ee9922dc.jpg?imwidth=1536",
      items: 2,
    },
    {
      id: 2,
      status: "Return Completed",
      orderId: "#1029384756",
      image: "https://source.unsplash.com/80x80/?shirt,green",
      items: 1,
    },
    {
      id: 3,
      status: "Refund Issued",
      orderId: "#6547382910",
      image: "https://image.hm.com/assets/hm/69/32/69320b14b0a02aad0aeddc7b670826b1ee9922dc.jpg?imwidth=1536",
      items: 3,
    },
    {
      id: 4,
      status: "Return Initiated",
      orderId: "#9876543210",
      image: "https://image.hm.com/assets/hm/85/06/850604ae222b85ca4c170edbe252346c3437cd1e.jpg?imwidth=1536",
      items: 2,
    },
    {
      id: 5,
      status: "Return Completed",
      orderId: "#1029384756",
      image: "https://image.hm.com/assets/hm/69/32/69320b14b0a02aad0aeddc7b670826b1ee9922dc.jpg?imwidth=1536",
      items: 1,
    },
    {
      id: 6,
      status: "Refund Issued",
      orderId: "#6547382910",
      image: "https://image.hm.com/assets/hm/85/06/850604ae222b85ca4c170edbe252346c3437cd1e.jpg?imwidth=1536",
      items: 3,
    },
  ];
  

export default function ReturnOrdersSection() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [isReturn, setReturn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReturnId, setSelectedReturnId] = useState<number | null>(null);

  const router = useRouter();
  const PER_PAGE = 5;

  const filtered = MOCK_RETURNS.filter(
    (item) =>
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const handleDetailSection = (id: number) => {
    setSelectedReturnId(id);
    setReturn(true);
  };

  if (isReturn && selectedReturnId !== null) {
    return <ReturnedOrderDetail returnId={selectedReturnId} onBack={()=> setReturn(false)} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Returns Orders</h1>

      {/* Search bar */}
      <div className="relative">
       <SearchBoxInner/>
      </div>

      {/* Return List */}
      <ul className="space-y-2">
        {paginated.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between rounded-lg px-4 py-3 border ${
              selected === item.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            } cursor-pointer`}
            onClick={() => {
              handleDetailSection(item.id);
              setSelected(item.id);
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt="product"
                className={`w-12 h-12 rounded ${
                  selected === item.id ? "border border-blue-400" : ""
                }`}
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.status}
                </p>
                <p className="text-xs text-gray-500">{`Order ${item.orderId}`}</p>
              </div>
            </div>
            <p
              className={`text-sm ${
                selected === item.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {item.items} {item.items === 1 ? "item" : "items"}
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        total={totalPages}
        current={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
