import DatePickerField from "@UI/components/shadcn-components/Fields/DatePicker";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import InnerTable from "@UI/components/shadcn-components/table/InnerTable";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import { Form, Formik } from "formik";
import React from "react";
import "react-day-picker/dist/style.css"; // if not globally included
import ResearvationDetailsPage from "./ResearvationAgendaDetailsPage";

type Appointment = {
    time: string;
    client: string;
    service: string;
    duration: string;
    status: string;
};

type ReservationAgendaProps = {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    appointments: Appointment[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const ReservationAgenda: React.FC<ReservationAgendaProps> = ({
    selectedDate,
    onDateChange,
    appointments,
    currentPage,
    totalPages,
    onPageChange,
}) => {

    const [isDeatailPage, setDetailPage] = React.useState(false);

    const headers = [
        { label: "Time", key: "time" },
        { label: "Client", key: "client" },
        { label: "Service", key: "service" },
        { label: "Duration", key: "duration" },
        { label: "Status", key: "status" },
    ];


    //Const show booking details page
    const handleBookingDetailpage = (row) => {
        //
        setDetailPage(true);

    }
    if (isDeatailPage) {
        return (
            <ResearvationDetailsPage setDetailPage={setDetailPage} />
        )
    }
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <SectionTitle title="Reservation Agenda" className="mb-4" />
            <p>
                Daily overview of booking appointments for all service providers.
            </p>

            {/* Date Picker */}
            <div className="flex justify-center mb-8">

                <Formik
                    initialValues={{ reservationDate: selectedDate }}
                    onSubmit={() => { }}
                >
                    {() => (
                        <Form>
                            <DatePickerField name="reservationDate" onChange={() => set} />
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Appointments Table */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Today’s Appointments</h3>
                <div className="overflow-x-auto">
                    <InnerTable
                        headers={headers}
                        data={appointments}
                        onActionClick={(row) => handleBookingDetailpage(row)}
                    />
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination
                        total={totalPages}
                        current={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReservationAgenda;
