import { FaPlay } from "react-icons/fa";

export default function VideoUploadSection({ videos }) {
    return (
        <div className="space-y-6">
            {/* Title */}
            <h2 className="text-lg font-semibold">Video</h2>

            {/* Description */}
            <p className="text-gray-700">
                Add a video to give guests a virtual tour of your property. Videos should be under 5 minutes.
            </p>

            {/* Content Box */}
            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                {/* Video Thumbnail */}
                <div className="relative  overflow-hidden">
                    <img
                        src="/video-thumbnail.jpg" // Replace with your thumbnail source
                        alt="Video thumbnail"
                        className="w-72 h-44 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FaPlay className="text-white text-3xl bg-black/50 p-2 rounded-full" />
                    </div>
                </div>

                {/* Upload Text */}
                <div className="mt-4 text-center">
                    <p className="font-semibold">Upload Video</p>
                    <p className="text-sm text-gray-500">
                        Requires 3 to 6 photos (minimum and maximum)
                    </p>
                </div>

                {/* Upload Button */}
                <button className="mt-3 px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 transition">
                    Add a Video
                </button>
            </div>
        </div>
    );
}
