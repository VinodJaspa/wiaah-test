import React from "react"
import TabFilter from "components/TabFillter/TabFilter";
import { useState } from "react";
import OrderCard from "./OrderCard";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import OrderDetailsPage from "./OrderDetailsPage";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";


const orders = [
  {
    id: "12345",
    total: "150",
    image: "https://vape.hk/wp-content/uploads/2021/05/vopoo-drag-s-x-thumbnail-800x533-1.jpg", // vase/minimal
  },
  {
    id: "67890",
    total: "200",
    image: "https://i5.walmartimages.com/seo/Customuart-Cow-Print-Shoes-for-Women-Fashion-Sneakers-Black-Size-10-5_4ce0f83a-826e-417e-ad82-f317fc3571cc.202d09f4720a945b84c6f21ac1ae1f87.jpeg", // white sneakers
  },
  {
    id: "11223",
    total: "75",
    image: "https://th.bing.com/th/id/OIP.coyJ3RSs5TbIO60zo3a6xQHaE8?w=281&h=188&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", // hat
  },
  {
    id: "44556",
    total: "300",
    image: "https://tse4.mm.bing.net/th/id/OIP._y_TWGU_AkIEql7yF7VKhgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", // green shirt
  },
];


export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetails, setorderDetails] = useState(false);
const handleOrderDetails =(id)=>{

setorderDetails(true);

}
if(orderDetails){
  return (
    <OrderDetailsPage setorderDetails ={setorderDetails}/>
  )
}
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <SearchBoxInner className="mb-4" />
      <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} handleOrderDetails={()=>handleOrderDetails(order?.id)}/>
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={4}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
