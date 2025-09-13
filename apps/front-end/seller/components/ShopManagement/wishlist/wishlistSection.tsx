import WishlistTable from "../wishlist-table";

const mockItems: WishlistItem[] = [
    {
      id: 1,
      image: "https://tse4.mm.bing.net/th/id/OIP.oAIeK5EOxaqJMPBER0naggHaIP?rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Elegant Red Dress",
      price: "$45",
      stock: "Available",
    },
    {
      id: 2,
      image: "https://tse2.mm.bing.net/th/id/OIP.w1QEyR3amT1EXecYNJAJDwHaNY?w=500&h=904&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Classic Blue Shirt",
      price: "$45",
      stock: "Available",
    },
    {
      id: 3,
      image: "https://www-commerce.witchery.com.au/productimages_display/MAGNIFY/1/27678_179391_200850.jpg",
      title: "Stylish Black Pants",
      price: "$45",
      stock: "Available",
    },
    {
      id: 4,
      image: "https://th.bing.com/th/id/OIP.mOaxc9uCU99WDhd9QFR_dgHaJ3?w=194&h=259&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
      title: "Cozy Gray Sweater",
      price: "$45",
      stock: "Available",
    },
    {
      id: 5,
      image: "https://th.bing.com/th/id/OIP.QO8QMz5lkug5QGupRq-XkQHaLH?w=194&h=291&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
      title: "Chic White Blouse",
      price: "$45",
      stock: "Available",
    },
  ];
  // In WishlistTable.tsx
type WishlistItem = {
    id: number;
    image: string;
    title: string;
    price: string;
    stock: string; // changed from specific literal types
  };
  

export default function MyWishlistPage() {
  const handleAddToCart = (id: number) => {
    console.log("Added to cart:", id);
  };

  const handleRemove = (id: number) => {
    console.log("Removed:", id);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <WishlistTable
        items={mockItems}
        onAddToCart={handleAddToCart}
        onRemove={handleRemove}
      />
    </div>
  );
}
