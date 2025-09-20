// components/OrderDetails/ReturnedOrderDetail.tsx
import React from "react";

const order = {
    orderNumber: "9876543210",
    client: "Olivia Bassett",
    address: "456 Oak Avenue, Anytown, USA",
    date: "01/15/2025",
    items: [
        {
            name: "Handmade Leather Watch",
            image: "/watch.png",
            color: "Brown",
            size: "M",
            price: "$90.00",
            qty: 1,
        },
        {
            name: "Artisan Stone Grill",
            image: "/grill.png",
            color: "Black",
            size: "S",
            price: "$60.00",
            qty: 1,
        },
    ],
    summary: {
        subtotal: "$150.00",
        shipping: "$6.00",
        discount: "-$6.00",
        fees: "$5.00",
        total: "$155.00",
    },
    return: {
        reason: "Damaged",
        otherReason: "N/A",
    },
    payment: "Visa **** 4321",
    deliveryDate: "01/05/2025",
    tracking: "9876543210",
    status: "Delivered",
};

export default function ReturnedOrderDetail({ returnId, onBack, }) {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Returned Order Detail</h1>

                <button
                    className="bg-black text-white font-semibold px-5 py-2 rounded shadow-sm transition-all duration-200 hover:bg-white hover:text-black hover:border hover:border-black"
                    onClick={onBack}
                >
                    ← Back To Return List
                </button>
            </div>


            <section>
                <h2 className="font-semibold text-lg mb-2">Order Informations</h2>
                <div className="space-y-2 text-sm">
                    <p><strong>Order Number:</strong> {order.orderNumber}</p>
                    <p><strong>Client Information:</strong> {order.client}</p>
                    <p><strong>Shipping Address:</strong> {order.address}</p>
                    <p><strong>Order Date:</strong> {order.date}</p>
                </div>
            </section>

            <section>
                <h2 className="font-semibold text-lg mb-2">Items</h2>
                <table className="w-full text-sm border rounded-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Item</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Color</th>
                            <th className="p-2">Size</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">
                                    <img src={item.image} alt="product" className="w-10 h-10 rounded" />
                                </td>
                                <td className="p-2 text-center">{item.color}</td>
                                <td className="p-2 text-center">{item.size}</td>
                                <td className="p-2 text-center">{item.price}</td>
                                <td className="p-2 text-center">{item.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
                <div className="text-sm space-y-1">
                    <p>Subtotal: {order.summary.subtotal}</p>
                    <p>Shipping: {order.summary.shipping}</p>
                    <p className="text-red-500">Discount / Promo Code: {order.summary.discount}</p>
                    <p>Fees: {order.summary.fees}</p>
                    <p className="font-semibold">Total: {order.summary.total}</p>
                </div>
            </section>

            <section>
                <h2 className="font-semibold text-lg mb-2">Returned Information</h2>
                <p className="text-sm">Return Reason: {order.return.reason}</p>
                <p className="text-sm">Other Reason: {order.return.otherReason}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg mb-2">Payment Information</h2>
                <p className="text-sm">Payment Method: {order.payment}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg mb-2">Delivery Date</h2>
                <p className="text-sm">{order.deliveryDate}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg mb-2">Tracking Details</h2>
                <p className="text-sm">Tracking Number: {order.tracking}</p>
                <p className="text-sm">Status: {order.status}</p>
            </section>

            <div className="flex gap-4 pt-4">
                <button className="bg-black text-white px-4 py-2 rounded">Update Status</button>
                <button className="border border-gray-400 text-sm px-4 py-2 rounded">Download PDF</button>
            </div>
        </div>
    );
}
