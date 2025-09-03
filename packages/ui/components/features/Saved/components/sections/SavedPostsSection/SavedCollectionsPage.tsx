"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { mockCollections } from "./SavedPostsSection";
import BackButton from "@UI/components/shadcn-components/Buttons/backtoListButton";
import { useRouter } from "next/router";
import HeaderTextWithNavigationOnSmallScreen from "@UI/components/shadcn-components/NavigationSectionHeader";
import { useResponsive } from "hooks";


const mockItems = [
    "https://picsum.photos/id/1018/400/300",
    "https://picsum.photos/id/1015/400/300",
    "https://picsum.photos/id/1016/400/300",
    "https://picsum.photos/id/1019/400/300",
    "https://picsum.photos/id/1020/400/300",
    "https://picsum.photos/id/1021/400/300",
    "https://picsum.photos/id/1022/400/300",
    "https://picsum.photos/id/1023/400/300",
];

export default function CollectionDetailPage() {
    const { collectionId } = useParams(); // e.g. "hotels"
    const collection = mockCollections.find((col) => col.id === collectionId);
    const name = collection?.name ?? "Unknown";
    const router = useRouter();
    const isMobile = useResponsive();
    return (
        <div className="">
            <div className="flex items-center justify-between mb-6">
                {isMobile ?
                    <HeaderTextWithNavigationOnSmallScreen title={name} /> :
                    <>
                        <h2 className="text-2xl font-semibold capitalize">{name}</h2>
                        <BackButton onClick={() => router.push("/saved")} />
                    </>
                }
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-5 gap-6">
                {mockItems.map((src, i) => (
                    <Image
                        key={i}
                        src={src}
                        alt={`item-${i}`}
                        width={400}
                        height={300}
                        className="rounded-xl object-cover w-full h-40"
                    />
                ))}
            </div>

            {/* Mobile stacked grid */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
                {mockItems.map((src, i) => (
                    <Image
                        key={i}
                        src={src}
                        alt={`item-${i}`}
                        width={200}
                        height={200}
                        className="rounded-xl object-cover w-full h-48"
                    />
                ))}
            </div>

            {/* Pagination (desktop only) */}
            <div className="hidden md:flex justify-center mt-12">
                <nav className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
                        >
                            {page}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
