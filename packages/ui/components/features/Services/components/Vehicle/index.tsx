
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import VehicleFilterBar from "./VehicleFilterBar";
import VehicleServiceGrid from "./VehicleServiceGrid";
import { useState } from "react";


export default function VehiclePage() {
    const [total, setTotal] = useState(1);
    const [current, setCurrent] = useState(1);
    const handleNext = () => {

    }
    return (
        <main className="p-6 bg-gray-50 min-h-screen">
            <VehicleFilterBar />
            <VehicleServiceGrid />
            <Pagination total={total} current={current} onPageChange={handleNext} />
        </main>
    );
}
