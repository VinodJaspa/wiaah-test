import BackButton from "@UI/components/shadcn-components/Buttons/backtoListButton";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";



interface ProductDetailProps {
  query: any;
  emptyProduct: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ query, emptyProduct }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-md shadow-sm">
      {/* Title and Back Button */}
      <div className="flex items-center justify-between mb-6">
      <SectionTitle title="My Digital Product Detail" />

        <BackButton label="Back to list" onClick={emptyProduct} />
      </div>

      {/* Image Preview */}
      <div className="bg-[#FDEADE] p-6 rounded-lg mb-6 flex justify-center">
        <img
          src={query.imageSrc}
          alt={query.title}
          className="max-h-[300px] object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Title + Description */}
      <Subtitle>{query.title}</Subtitle>
         
      <p className="text-gray-700 mb-4">
        {query.description || "No description available."}
      </p>

      {/* Author */}
      <div className="flex items-center gap-2 mb-6">
        {query.avatar && (
          <img src={query.avatar} className="w-8 h-8 rounded-full border" />
        )}
        {query.author && (
          <span className="text-sm text-gray-600">{query.author}</span>
        )}
      </div>

      {/* Purchase Details */}
      <div className="border-t border-b py-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Purchase Date</span>
          <span className="text-gray-900 font-medium">{query.date || "N/A"}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Cost</span>
          <span className="text-gray-900 font-medium">${query.price || "0.00"}</span>
        </div>
      </div>

      {/* Downloaded Status */}
      <div className="mt-6">
        <p className="text-sm font-semibold mb-2">Downloaded</p>
        <div className="h-1 bg-black w-full rounded-full" />
      </div>

      {/* Open File Button */}
      <div className="mt-4 flex justify-end">
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
          Open File
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
