export default function ReviewStats() {
    return (
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="text-4xl font-bold">4.5</div>
        <div className="text-sm text-gray-500">120 reviews</div>
  
        {[5, 4, 3, 2, 1].map((star, idx) => {
          const width = [40, 30, 15, 10, 5][idx];
          return (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span>{star}</span>
              <div className="w-full bg-gray-200 rounded h-2 flex-1">
                <div className="bg-black h-full rounded" style={{ width: `${width}%` }} />
              </div>
              <span className="w-10 text-right text-xs text-gray-500">{width}%</span>
            </div>
          );
        })}
      </div>
    );
  }
  