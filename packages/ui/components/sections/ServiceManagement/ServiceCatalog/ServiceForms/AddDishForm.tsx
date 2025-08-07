// File: AddRoomForm.tsx
import React from "react";
import { Form, Formik, Form as FormikField } from "formik";
import { HiPlus } from "react-icons/hi";
import { Switch } from "@headlessui/react";
import { Counter, Discount, InfoText, SeasonalRate, SectionLabel, SharedPrivateToggle, UploadPhotos, UploadVideo } from "@UI/components/shadcn-components";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import BackButton from "@UI/components/shadcn-components/Buttons/backtoListButton";
import SectionTitleAndButtonStack from "@UI/components/shadcn-components/SectionTitleButtonContainer";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import SelectField from "@UI/components/shadcn-components/Fields/SelectField";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import CheckBoxlist from "@UI/components/shadcn-components/Fields/CheckBox";
import TextareaField from "@UI/components/shadcn-components/Fields/TextAreaField";
import { SharedToggle } from "@UI/components/shadcn-components/Fields/ToogleField";
import { FaPlay } from "react-icons/fa";
import TwoMonthRangePicker from "@UI/components/shadcn-components/Fields/TwoMonthsDatePicker";
import AddonsAndRulesSection from "../AddOnAndRuleSection";
import BookingTermsSection from "../BookingTermSection";
import PhotoUploadSection from "../PhotoUploadSection";
import VideoUploadSection from "../VideoUploadSection";



const initialValues = {
    title: "",
    description: "",
    location: "",
    roomType: "private",
    bedType: 'private',
    numOfRooms: 1,
    numOfBathrooms: 1,
    numOfBeds: 1,
    surfaceArea: "",
    floor: '',
    numOfGuests: 1,
    checkIn: "",
    checkOut: "",
    basePrice: "",
    photos: [],
    videoUrl: "",
    terms: "",
    rules: "",
    damage: "",
    addOns: {
        breakfast: false,
        cleaning: false,
        airportPickup: false,
    },
    budgetFriendly: true,
};

export default function AddNewDishForm({ setAddNewRoom }) {
    const allFeatures = [
        "Free Wi-Fi",
        "Swimming Pool",
        "Fitness Center",
        "Spa Services",
        "Restaurant",
        "Bar/Lounge",
        "Room Service",
        "Concierge",
        "Business Center",
        "Meeting Rooms"
    ];
    const [selected, setSelected] = React.useState<string[]>([]);
    const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null]);
    const [isAddOnDialogOpen, setAddOnDialogOpen] = React.useState(false);
    const [isSeasonalDialogOpen, setSeasonalDialogOpen] = React.useState(false);
    const [isExtraFeesDialogOpen, setExtraFeesDialogOpen] = React.useState(false);
    const [isDiscountDialogOpen, setDiscountDialogOpen] = React.useState(false);
    const handleChange = (feature: string, checked: boolean) => {
        setSelected((prev) =>
            checked ? [...prev, feature] : prev.filter((item) => item !== feature)
        );
    }
    return (
        <>
          <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-md shadow">
                        <SectionTitleAndButtonStack>
                            <SectionTitle title="Add New  DISH"></SectionTitle>
                            <BackButton onClick={() => setAddNewRoom(false)} />
                        </SectionTitleAndButtonStack>
                        <Subtitle children="General Information" />
                        <InputField name="title" label="Room Name" placeholder="e.g.,  Home Cleaning, Personal Training" />
                        <TextareaField
                            label="Room Description"
                            name="description"
                            placeholder="e.g., Home Cleaning, Personal Training"
                        />

                        <SelectField
                            name="roomType"
                            label="RoomType"
                            options={[
                                { label: 'Paid', value: 'paid' },
                                { label: 'Free', value: 'free' },
                            ]}
                        />

                        <SharedToggle
                            name="roomType"
                            label="Room Type"
                            options={[
                                { label: "Shared", value: "shared" },
                                { label: "Private", value: "private" },

                            ]}
                        />

                        <SharedToggle
                            name="bedType"
                            label="Type of Bedroom"
                            options={[
                                { label: "Shared", value: "shared" },
                                { label: "Private", value: "private" },

                            ]}
                        />


                        <Counter name="numOfRooms" label="Number of Rooms" />
                        <Counter name="numOfBathrooms" label="Number of Bathrooms" />
                        <Counter name="numOfBeds" label="Number of Beds" />
                        <Counter name="numOfGuests" label="Number of Guests" />


                        <InputField name="surfaceArea" label="Surface Area (m² or ft²)" placeholder="e.g.,  150" />
                        <InputField name="floor" label="Floor Number (Floor, if applicable)" placeholder="e.g.,  2" />

                        <InputField name="basePrice" label="Price Per Night" placeholder="₹" />
                        <PhotoUploadSection images={[]} />
                        <VideoUploadSection videos={[]} />
                        <InputField name="perNightPrice" label="Price per night" placeholder="e.g.,  20" />
                        <div className="space-y-2">
                            <RatesSection
                                setExtraFeesDialogOpen={setExtraFeesDialogOpen}
                                title="Extra fees"
                                addLabel="Add fee"

                                items={[
                                    {
                                        title: "Extra guest fee",
                                        subtitle: "$20 per guest",
                                        value: "$20",
                                    },
                                ]}
                            />

                            <RatesSection
                                setSeasonalDialogOpen={setSeasonalDialogOpen}
                                title="Seasonal rates"
                                addLabel="Add seasonal rate"
                                items={[
                                    {
                                        title: "Christmas",
                                        subtitle: "Dec 24, 2024 - Jan 2, 2025",
                                        value: "$200",
                                    },
                                    {
                                        title: "Summer",
                                        subtitle: "Jul 1 - Aug 31, 2024",
                                        value: "$180",
                                    },
                                ]}
                            />

                            <RatesSection
        setDiscountDialogOpen={setDiscountDialogOpen}
                                title="Discounts"
                                addLabel="Add discount"
                                items={[
                                    {
                                        title: "Early bird",
                                        subtitle: "End date : 25/12/2100",
                                        value: "10%",
                                    },
                                    {
                                        title: "Weekly",
                                        subtitle: "End date : 25/12/2100",
                                        value: "5%",
                                    },
                                ]}
                            />
                        </div>
                        <Subtitle children="Availability" />
                        <InfoText text="Select sessions you would like to make available for booking or unselect those you do not want." />
                        <div className="mx-auto justify-items-center">
                            <TwoMonthRangePicker range={dateRange} onRangeChange={setDateRange} />

                        </div>
                        <Subtitle children="Amenities" />
                        <CheckBoxlist
                            options={allFeatures}
                            selected={selected}
                            onChange={handleChange}
                        />
                        <AddonsAndRulesSection setAddOnDialogOpen={setAddOnDialogOpen} />
                        <BookingTermsSection />

                        <PrimaryButton
                            type="submit"
                        >
                            Publish
                        </PrimaryButton>
                    </Form>
                )}
            </Formik>
        </>

    );
}






interface RateItem {
    title: string;
    subtitle?: string;
    value: string;
}

interface RatesSectionProps {
    title: string;
    items: RateItem[];
    addLabel: string;
    onAdd?: () => void;
    setSeasonalDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setExtraFeesDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setDiscountDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}



function RatesSection({ title, items, addLabel, onAdd, setSeasonalDialogOpen, setExtraFeesDialogOpen,setDiscountDialogOpen }: RatesSectionProps) {
    const handleDialog = (label: string) => {

        if (label == "Add seasonal rate") {

            setSeasonalDialogOpen(true);
        }
        else if (label == "Add fee") {
            setExtraFeesDialogOpen(true);
        }
        else if(label =="Add discount"){
            setDiscountDialogOpen(true);
        }
    }
    return (
        <div className="space-y-4 pb-4">
            {/* Section Title */}
            <Subtitle>{title}</Subtitle>

            {/* Items List */}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-start border-b pb-2"
                    >
                        <div>
                            <p className="text-sm font-semibold">{item.title}</p>
                            {item.subtitle && (
                                <p className="text-xs text-gray-500">{item.subtitle}</p>
                            )}
                        </div>
                        <p className="text-sm text-right pt-1">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Add Label + Right-Aligned Icon */}
            <div className="flex justify-between items-center mt-2 group cursor-pointer">
                <span className="text-sm text-gray-600 group-hover:text-black">
                    {addLabel}
                </span>
                <button
                    onClick={onAdd}
                    className="p-1 rounded hover:bg-gray-100 transition"
                >
                    <HiPlus className="text-lg text-gray-600 group-hover:text-black" onClick={() => handleDialog(addLabel)} />
                </button>
            </div>
        </div>
    );
}
