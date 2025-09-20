const items = [
    {
      name: "Handmade Leather Wallet",
      color: "Brown",
      size: "M",
      price: "$50.00",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1616627454516-cf2f8da5a2b4?auto=format&fit=crop&w=80&q=80",
    },
    {
      name: "Artisan Soap Set",
      color: "Black",
      size: "S",
      price: "$10.00",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=80&q=80",
    },
  ];
  
  export default function ItemsTable() {
    return (
      <section>
        <h2 className="font-semibold mb-4">Items</h2>
        <div className="w-full overflow-x-auto border rounded-md">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Color</th>
                <th className="p-3">Size</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
                    {item.name}
                  </td>
                  <td className="p-3">{item.color}</td>
                  <td className="p-3">{item.size}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  