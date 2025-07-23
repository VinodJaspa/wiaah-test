import TextInput from "./TextInput";
import TextArea from "./TextArea";

export default function TitleDescriptionSection() {
  return (
    <div className="space-y-2 ">
      <div>
        <h2 className="font-bold text-md text-black mb-2">Title & Description</h2>
        <div className="space-y-4">
          <TextInput label="Product Name" placeholder="e.g., Handcrafted Leather Wallet" />
          <TextArea label="Description" placeholder="Write product description..." />
        </div>

      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-md text-black mb-2">SEO Meta Tag</h2>
        <div className="space-y-4">
          <TextInput label="Meta Tag" placeholder="e.g., Handcrafted Leather Wallet" />
        </div>
      </div>
    </div>
  );
}
