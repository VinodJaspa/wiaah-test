import ReturnFormModal from "components/modals/ReturnFormModal";
import React from "react";
export default function OrderDetailsPage({ setorderDetails }) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-10 text-sm">
            <ReturnFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Order Details</h1>
                <button className="text-sm text-blue-600 hover:underline" onClick={() => setorderDetails(false)}>← Back to Orders</button>
            </div>


            {/* Order Info Section */}
            <section>
                <h2 className="font-medium mb-2">Order informations</h2>
                <div className="divide-y border rounded-lg">
                    <DetailRow label="Order Number" value="9876543210" />
                    <DetailRow label="Client Information" value="Olivia Bennett" />
                    <DetailRow label="Shipping Address" value="456 Oak Avenue, Anytown, USA" />
                    <DetailRow label="Order Date" value="01/15/2023" />
                </div>
            </section>

            {/* Items Table */}
            <section>
                <h2 className="font-medium mb-2">Items</h2>
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">Item</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Color</th>
                                <th className="p-3">Size</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <ItemRow

                                name="Handmade Leather Wallet"
                                color="Brown"
                                size="M"
                                price="$50.00"
                                quantity={1}
                                image="https://randomuser.me/api/portraits/men/32.jpg"
                            />
                            <ItemRow
                                name="Artisan Soap Set"
                                color="Black"
                                size="S"
                                price="$50.00"
                                quantity={2}
                                image="https://randomuser.me/api/portraits/women/42.jpg"
                            />
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Order Summary */}
            <section>
                <h2 className="font-medium mb-2">Order Summary</h2>
                <div className="divide-y border rounded-lg">
                    <DetailRow label="Subtotal" value="$60.00" />
                    <DetailRow label="Shipping" value="$5.00" />
                    <DetailRow label="Discount / Promo Code" value="- $5.00" valueClass="text-red-500" />
                    <DetailRow label="Fees" value="$5.00" />
                    <DetailRow label="Total" value="$65.00" bold />
                </div>
            </section>

            {/* Payment Info */}
            <section>
                <h2 className="font-medium mb-2">Payment Information</h2>
                <DetailRow label="Payment Method" value="Visa **** 4321" bordered />
            </section>

            {/* Delivery Estimate */}
            <section>
                <h2 className="font-medium mb-2">Delivery estimation</h2>
                <DetailRow label="Estimated Delivery Date" value="12/05/2026" bordered />
            </section>

            {/* Tracking Details */}
            <section>
                <h2 className="font-medium mb-2">Tracking Details</h2>
                <div className="divide-y border rounded-lg">
                    <DetailRow label="Tracking number" value="9876543210" />
                    <DetailRow label="Status" value="Shipped" />
                    <DetailRow label="Last updated" value="July 16, 2024" />
                </div>
            </section>

            {/* Action Buttons */}
            <section className="flex flex-wrap gap-3">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => setIsOpen(true)}>Ask for Return</button>
                <button className="bg-black text-white px-4 py-2 rounded-md">Download PDF</button>
                <button className="border px-4 py-2 rounded-md">Contact Shop</button>
            </section>
        </main>
    );
}

function DetailRow({
    label,
    value,
    bordered,
    bold,
    valueClass = "",
}: {
    label: string;
    value: string;
    bordered?: boolean;
    bold?: boolean;
    valueClass?: string;
}) {

    const base = `flex justify-between items-center px-4 py-3 ${bordered ? "border rounded-md" : ""}`;
    return (

        <div className={base}>

            <span className="text-gray-500">{label}</span>
            <span className={`${bold ? "font-semibold" : ""} ${valueClass}`}>{value}</span>
        </div>
    );
}

function ItemRow({
    name,
    image,
    color,
    size,
    price,
    quantity,
}: {
    name: string;
    image: string;
    color: string;
    size: string;
    price: string;
    quantity: number;
}) {
    return (
        <tr>
            <td className="p-3">{name}</td>
            <td className="p-3">
                <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
            </td>
            <td className="p-3">{color}</td>
            <td className="p-3">{size}</td>
            <td className="p-3">{price}</td>
            <td className="p-3">{quantity}</td>
        </tr>
    );
}
