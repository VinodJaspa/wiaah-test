interface PaginationProps {
  total?: number;
  current?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  total = 5,
  current = 1,
  onPageChange = () => {},
}: PaginationProps) {
  const handlePrev = () => {
    if (current > 1) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (current < total) {
      onPageChange(current + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 pt-6">
      <button
        onClick={handlePrev}
        className={`text-sm px-2 py-1 rounded-full ${
          current === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
        }`}
        disabled={current === 1}
      >
        &lt;
      </button>

      {[...Array(total)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full text-sm transition ${
              current === page
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        className={`text-sm px-2 py-1 rounded-full ${
          current === total ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
        }`}
        disabled={current === total}
      >
        &gt;
      </button>
    </div>
  );
}
