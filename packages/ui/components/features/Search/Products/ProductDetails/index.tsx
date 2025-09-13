import ReviewsSection from "@UI/components/shadcn-components/RatingAndReview";
import ProductDetailAccordion, {
  MoreProducts,
  ProductDetailCard
} from "./components";

export default function ProductDetailPage() {
  const product = {
    brand: "Nike",
    name: "Midnight Elegance Buckle Detail Tie",
    stock: 500,
    price: 249.99,
    oldPrice: 669,
    discount: 20, // percentage
    rating: 4.5, // average rating
    reviewsCount: 100, // total reviews
    colors: ["#000000", "#FFFFFF", "#FF0000", "#00FF00"], // black, white, red, green
    sizes: ["S", "M", "L"],
    shippingRestricted: true, // "Sorry, this product can’t be ship to your country"
    isFavorite: false, // for heart icon toggle
    images: [
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/d4986321-7f42-4b4a-b217-53b8c66ceb76/W+NSW+NK+CHLL+KNT+MRIB+TNK+DRS.png",
      "https://tse1.mm.bing.net/th/id/OIP.jDguqu7fW9dklRk2etZtqwAAAA?pid=ImgDet&w=60&h=60&c=7&dpr=2&rs=1&o=7&rm=3",
      "https://tse4.mm.bing.net/th/id/OIP.e-8K-xX3u8k7Ryjwa2B6QQAAAA?pid=ImgDet&w=60&h=60&c=7&dpr=2&rs=1&o=7&rm=3",
    ],
  };
  

  const highlights = [
    "Textured fabric adds depth and visual interest",
    "Puff sleeves create a romantic silhouette",
    "Tie-front detail for adjustable fit and style",
    "Peplum hem for a flattering shape",
  ];

  const reviews = [
    { user: "Sophia Carter", date: "2 months ago", text: "Absolutely stunning dress!" },
    { user: "Isabella Rossi", date: "3 months ago", text: "Well-made but sizing runs small." },
    { user: "Ava Chen", date: "4 months ago", text: "Exceeded my expectations!" },
  ];

  const moreProducts = [
    { name: "Populaire Charmant", price: 13.25, image: "https://tse2.mm.bing.net/th/id/OIP.sd1-POL6KZevVk4JSdeQrQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Populaire Charmant", price: 13.25, image: "https://tse2.mm.bing.net/th/id/OIP.sd1-POL6KZevVk4JSdeQrQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4  lg:px-8 py-8">
    {/* Product Details */}
    <ProductDetailCard product={product} />
  
    {/* Other Sections */}
    <div className="md:col-span-2 mt-10">
      <ProductDetailAccordion />
      <ReviewsSection />
      <MoreProducts items={moreProducts} />
    </div>
  </div>
  
  );
}
