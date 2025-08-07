export default function PhotoUploadSection({ images }: { images: string[] }) {
    return (
        <div className="space-y-6">
            {/* Title */}
            <h2 className="text-lg font-semibold">Photos</h2>

            {/* Info Text */}
            <p className="text-gray-700">
                Showcase your property with high-quality photos. Add at least 3 photos to attract more guests.
            </p>

            {/* Image Grid Section */}
            <div className="border border-dashed border-gray-300 rounded-lg  p-4">
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                    {images?.map((src, idx) => (
                        <div key={idx} className="overflow-hidden rounded-lg">
                            <img
                                src={src}
                                alt={`Room ${idx + 1}`}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* Upload Text */}
                <div className="flex flex-col items-center mt-6">
                    <p className="font-semibold">Upload Photos</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Requires 3 to 6 photos (minimum and maximum)
                    </p>

                    {/* Centered Button */}
                    <button className="mt-3 px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 transition mx-auto">
                        Add a Photo
                    </button>
                </div>
            </div>
        </div>
    );
}