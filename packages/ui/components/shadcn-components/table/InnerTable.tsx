import { useResponsive } from "hooks";
import React from "react";

type Header = {
    label: string;
    key: string;
};

type RowData = {
    [key: string]: React.ReactNode;
};

type InnerTableProps = {
    headers: Header[];
    data: RowData[];
    emptyText?: string;
    onActionClick?: (row: RowData) => void;
};

const InnerTable: React.FC<InnerTableProps> = ({
    headers,
    data,
    emptyText = "No data found.",
    onActionClick,
}) => {
    const StatusBadge = ({ status }: { status: string }) => {
        const base = "px-3 py-1 text-sm rounded-full font-medium inline-block";
        const variants: Record<string, string> = {
            Confirmed: "bg-green-100 text-green-800",
            Cancelled: "bg-red-100 text-red-800",
        };

        return <span className={`${base} ${variants[status] || "bg-gray-100 text-gray-800"}`}>{status}</span>;
    };




    function MobileAppointmentList() {
        return (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold">Today's Appointments</h2>
                {data.map((appt, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-xl shadow-sm flex items-start justify-between"
                    >
                        <div className="flex items-start space-x-4">
                            <img
                                src={appt.avatar}
                                alt={appt.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{appt.name}</p>
                                <p className="text-gray-500">{appt.time}</p>
                                <p className="text-gray-500">
                                    {appt.service} ({appt.duration})
                                </p>
                            </div>
                        </div>
                        <div>
                            <StatusBadge status={appt.status} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    const {isMobile} = useResponsive();
    if (isMobile) {
        return (
            <MobileAppointmentList />
        )
    }

    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.key}
                                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                            >
                                {header.label}
                            </th>
                        ))}
                        {onActionClick && (
                            <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={headers.length + (onActionClick ? 1 : 0)} className="text-center py-6 text-gray-500">
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr key={index}>
                                {headers.map((header) => (
                                    <td key={header.key} className="px-4 py-2">
                                        {header.key === "status" && typeof row[header.key] === "string" ? (
                                            <StatusBadge status={row[header.key] as string} />
                                        ) : (
                                            row[header.key]
                                        )}
                                    </td>

                                ))}
                                {onActionClick && (
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => onActionClick(row)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InnerTable;
