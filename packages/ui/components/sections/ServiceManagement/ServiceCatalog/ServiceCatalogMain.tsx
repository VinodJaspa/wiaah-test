import React from "react";


import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import { FilterDropdown } from "@UI/components/shadcn-components/DropDownMenu";
import { useResponsive } from "hooks";
import { Avatar } from "@UI/components/shadcn-components/table";

const services = [
    {
        id: "#SERV-1047",
        category: "Digital Marketing",
        price: "50 € per hour",
        availability: "Available",
        duration: "2 hours",
        updated: "June 21, 2025",
        icon: "🟤",
        image: "https://picsum.photos/seed/marketing/400/250",
    },
    {
        id: "#SERV-2058",
        category: "Home Repair",
        price: "Fixed price",
        availability: "Booked",
        duration: "3 days",
        updated: "June 15, 2025",
        icon: "🟠",
        image: "https://picsum.photos/seed/home/400/250",
    },
    {
        id: "#SERV-3069",
        category: "IT Services",
        price: "30 € per hour",
        availability: "Pending Approval",
        duration: "1 hour",
        updated: "June 10, 2025",
        icon: "🟢",
        image: "https://picsum.photos/seed/it/400/250",
    },
    {
        id: "#SERV-4070",
        category: "Fitness",
        price: "40 € per session",
        availability: "Available",
        duration: "1 hour",
        updated: "June 5, 2025",
        icon: "🧍‍♂️",
        image: "https://picsum.photos/seed/fitness/400/250",
    },
    {
        id: "#SERV-5081",
        category: "Event Management",
        price: "Fixed price",
        availability: "Available",
        duration: "5 days",
        updated: "May 30, 2025",
        icon: "🔘",
        image: "https://picsum.photos/seed/event/400/250",
    },
];


export default function ServiceCatalogSectionMain() {
    const { isMobile } = useResponsive();
    const handleSelect = (label: string, value: string) => {
        console.log(`${label} selected:`, value);
    };
    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <SectionTitle title="Service Catalog" />
                <PrimaryButton >+ Add New service</PrimaryButton>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-4">
                <SearchBoxInner placeholder="Search services" />


            </div>
            <div className="flex gap-2 mb-4">
                <FilterDropdown
                    title="Status"
                    options={["Available", "Booked", "Pending"]}
                    onSelect={(val) => handleSelect("Status", val)}
                />
                <FilterDropdown
                    title="Category"
                    options={["Finance", "Tech"]}
                    onSelect={(val) => handleSelect("Category", val)}
                />
                <FilterDropdown
                    title="Sort"
                    options={["Newest", "Oldest", "A-Z", "Z-A"]}
                    onSelect={(val) => handleSelect("Sort", val)}
                />

            </div>
            {isMobile ?
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-2 p-4 border rounded-xl shadow-sm bg-white"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">
                                    <Avatar src={s.image} alt={s.category} >

                                    </Avatar>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-black">{s.category}</h3>
                                    <p className="text-sm text-gray-600">Service ID: {s.id}</p>
                                    <p className="text-sm text-gray-500">Last Updated: {s.updated}</p>
                                    <p className="text-sm text-gray-800">
                                        {s.price} · {s.availability}
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex justify-center gap-2 mt-4">
                                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                                    View
                                </button>
                                <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200">
                                    Edit
                                </button>
                                <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="overflow-auto border rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-600 text-left">
                            <tr>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Availability</th>
                                <th className="px-4 py-3">Duration</th>
                                <th className="px-4 py-3">Last Updated</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {services.map((s, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-3">
                                        <Avatar src={s.image} alt={s.category} >
                                        </Avatar>
                                    </td>
                                    <td className="px-4 py-3 font-medium">{s.id}</td>
                                    <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">{s.category}</td>
                                    <td className="px-4 py-3">{s.price}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                                            {s.availability}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{s.duration}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">Updated on {s.updated}</td>
                                    <td className="px-4 py-3 text-blue-600 space-x-1">
                                        <button className="hover:underline">Edit</button>,
                                        <button className="hover:underline">Delete</button>,
                                        <button className="hover:underline">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

        </div>
    );
}
