

import { CreditCard, Plus } from "lucide-react"; // Adjust these icons as needed
import Image from "next/image";
import PayCard from "./PayCard";

import AddPaymentDialog from "components/modals/AddPaymentMethodModal";
import React from "react";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import VisaLogo from "@UI/components/shadcn-components/logos/VisaLogo";
import MasterCardLogo from "@UI/components/shadcn-components/logos/MasterCardLogo";
import EditButton from "@UI/components/shadcn-components/Buttons/editButton";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";

export default function PaymentMethodsSection() {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleEdit = () => {

    }
    return (
        <div className="p-6">
                <AddPaymentDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="flex items-center space-x-2 mb-2">
                <SectionTitle title="My Payment Methods"/>
    
                <VisaLogo />
                <MasterCardLogo />
            </div>
            <p className="text-gray-500 mb-6">Manage your payment methods for purchases.</p>

            <div className="space-y-6">
                {/* Available Payment Methods */}
                <div>
                    <Subtitle children="Available Payment Methods"/>

                    <div className="space-y-4">
                        <PayCard className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-3">
                <VisaLogo />
                        
                                <div>
                                    <p className="font-sm">Credit Card</p>
                                    <p className="text-sm text-gray-500">Visa ending in 1234</p>
                                </div>
                            </div>
                            <EditButton label="Edit" onClick={handleEdit}></EditButton>
                        </PayCard>

                        <PayCard className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-3">
                            <MasterCardLogo />
                                <div>
                                    <p className="font-medium">Debit Card</p>
                                    <p className="text-sm text-gray-500">MasterCard ending in 5678</p>
                                </div>
                            </div>
                            <EditButton label="Edit" onClick={handleEdit}></EditButton>
                        </PayCard>
                    </div>
                </div>

                {/* Add New Payment Method */}
                <div>
                    <Subtitle children ="Add New Payment Method"/>

                    <PayCard className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition">
                        <div className="bg-gray-100 p-2 rounded">
                            <CreditCard className="h-5 w-5 text-gray-700 font-sm" />
                        </div>
                        <p className="font-medium text-gray-700">Add Credit or Debit Card</p>
                        <div className="ml-auto">
                            <Plus className="h-4 w-4 text-gray-700"  onClick={() => setIsOpen(true)} />
                        </div>
                    </PayCard>
                </div>
            </div>
        </div>
    );
}
