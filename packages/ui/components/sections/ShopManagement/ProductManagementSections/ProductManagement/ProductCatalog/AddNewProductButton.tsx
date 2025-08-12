export default function AddNewProductButton({handleClick}) {
    return (
      <button onClick={handleClick} className="bg-black text-white px-4 py-2 rounded">
        + Add New Product
      </button>
    );
  }
  