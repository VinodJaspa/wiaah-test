"use client";
import React from "react";
import Image from "next/image";
import { useGetUserSavedCollections } from "@features/Social"; // your GraphQL hook
import { useGetMyAccountQuery } from "@features/Accounts";
import { Link } from "@partials";
import HeaderTextWithNavigationOnSmallScreen from "@UI/components/shadcn-components/NavigationSectionHeader";

// import { useGetUserSavedCollections } from "../mock"; // if mocking for dev

export default function SavedCollections() {
  const account = useGetMyAccountQuery()
  // Todo - call api to get real collectios
  // const { data: collections, isLoading } = useGetUserSavedCollections(User.id);

  // if (isLoading) {
  //   return <p className="text-center py-10">Loading...</p>;
  // }




  return (
    <div className="p-2">
      {/* Header */}
      <HeaderTextWithNavigationOnSmallScreen title="Saved" />
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {mockCollections?.map((collection) => {
          const thumbnail =
            collection.recentSaves?.[0]?.post?.thumbnail || "/placeholder.png";

          return (
            <Link key={collection.id} href={`/saved/${collection.id}`}>
              <div className="flex flex-col cursor-pointer">
                {/* Image wrapper full width on mobile */}
                <div className="w-full aspect-square rounded-lg overflow-hidden shadow">
                  <Image
                    src={thumbnail}
                    alt={collection.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-center">
                  {collection.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>


      {/* Pagination placeholder */}
      <div className="flex justify-center items-center mt-8 gap-2 text-sm text-gray-500">
        <button className="px-2">&lt;</button>
        <span className="px-2 py-1 rounded bg-gray-200">1</span>
        <button className="px-2">&gt;</button>
      </div>
    </div>
  );
}
export const mockCollections = [
  {
    id: "1",
    name: "Hotels",
    recentSaves: [{ post: { thumbnail: "https://picsum.photos/id/1018/400/300" } }],
  },
  {
    id: "2",
    name: "Restaurants",
    recentSaves: [{ post: { thumbnail: "https://picsum.photos/id/292/400/300" } }],
  },
  {
    id: "3",
    name: "Villas",
    recentSaves: [{ post: { thumbnail: "https://picsum.photos/id/1043/400/300" } }],
  },
  {
    id: "4",
    name: "Vehicles",
    recentSaves: [{ post: { thumbnail: "https://picsum.photos/id/111/400/300" } }],
  },
  {
    id: "5",
    name: "Clothing",
    recentSaves: [{ post: { thumbnail: "https://picsum.photos/id/237/400/300" } }],
  },
  {
    id: "6",
    name: "Memes",
    recentSaves: [{ post: { thumbnail: "https://picsum.photos/id/1025/400/300" } }],
  },
];