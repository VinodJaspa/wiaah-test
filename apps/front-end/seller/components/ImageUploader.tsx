export default function ImageUploader({ type = "image" }) {
    return (
      <div className="w-full border border-dashed border-gray-400 p-6 text-center rounded-md">
        <p className="text-sm text-gray-500">Drag and drop {type}s here</p>
        <p className="text-xs text-gray-400">or click to upload</p>
        <button className="mt-4 px-4 py-2 text-sm border border-gray-300 rounded-md">Upload</button>
      </div>
    );
  }
  