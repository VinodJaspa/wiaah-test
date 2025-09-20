import React, { useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

import Tesseract from "tesseract.js";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import { log } from "console";
import DateOfBirthDialog from "@UI/components/Account/Dialog/ DateOfBirthDialog";
import DateOfBirthSelector from "@UI/components/shadcn-components/DateOfBirthSelector/DateOfBirthSelector";

// Move initialValues outside so parseOCRText can access it


const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.string().required(""),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    idNumber: Yup.string(),
    idExpiry: Yup.string().required("Required"),
});



export default function AutoFillFromOCR({ formData, prevStep, nextStep, initialValues }) {

    const { setValues, setFieldValue } = useFormikContext();
    async function doOCRandFill(file) {
        if (!file) return;

        try {
            const { data: { text } } = await Tesseract.recognize(file, "eng", {
                logger: m => console.log(m),
            });
            console.log("OCR Text:", text);

            const parsedData = parseOCRText(text);

            setValues(parsedData);
        } catch (error) {
            console.error("OCR error:", error);
        }
    } function parseOCRText(text) {
        const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
        const data = {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            address: "",
            city: "",
            zip: "",
            state: "",
            idNumber: "",
            idExpiry: "",
        };

        // We'll scan lines looking for labels and then grab following lines or regex matches

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Last Name under "1. FAMILY NAME"
            if (line.includes("1. FAMILY NAME")) {
                data.lastName = lines[i + 1] || "";
            }

            // First Name under "2.GIVEN NAMES"
            if (line.includes("2.GIVEN NAMES")) {
                // sometimes first and middle name may be on multiple lines
                let firstNames = [];
                let j = i + 1;
                while (j < lines.length && lines[j] && !lines[j].match(/^\d+\./)) {
                    firstNames.push(lines[j]);
                    j++;
                }
                data.firstName = firstNames.join(" ");
            }

            // Address starts at "8.ADDRESS", grab next 2-3 lines for full address
            if (line.includes("8.ADDRESS")) {
                let addressLines = [];
                let j = i + 1;
                while (
                    j < lines.length &&
                    lines[j] &&
                    !lines[j].match(/^\d+\./) &&
                    addressLines.length < 3
                ) {
                    addressLines.push(lines[j]);
                    j++;
                }
                data.address = addressLines.join(", ");
            }

            // DOB: you have two dates, one is 02/21/1984 which looks like DOB, find that date
            const dobMatch = line.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
            if (dobMatch) {
                // We'll choose the date that looks like DOB (02/21/1984)
                // Skip the expiry dates
                const dateStr = dobMatch[0];
                if (!data.dateOfBirth && dateStr < "01/01/2000") { // simple heuristic, dates before 2000 are DOB likely
                    data.dateOfBirth = dateStr;
                }
            }

            // ID Expiry: Look for date near EXP or "4b.EXP"
            if (line.includes("4b.EXP")) {
                const nextLine = lines[i + 1] || "";
                const expMatch = nextLine.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
                if (expMatch) {
                    data.idExpiry = expMatch[0];
                }
            }

            // ID Number: Looks like "1 234567 ..." or the long number "12348757475974"
            if (line.match(/^1 \d+/)) {
                data.idNumber = line.split(" ")[1]; // get the number after "1"
            } else if (line.match(/^\d{10,}/)) {
                data.idNumber = line;
            }
        }

        return data;
    }

    useEffect(() => {
        console.log("AutoFillFromOCR mounted with formData:", formData);
        if (formData?.id_front) {
            console.log("Starting OCR for:", formData.id_front);
            doOCRandFill(formData.id_front);
        }
    }, [formData?.id_front]);

    return (
        <>
            {/* Group 1: First Name + Last Name */}
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:flex-1">
                    <InputField name="firstName" label="First Name" />
                </div>
                <div className="w-full md:flex-1">
                    <InputField name="lastName" label="Last Name" />
                </div>
            </div>

            {/* Group 2: DOB + Address */}
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:flex-1">
                    <DateOfBirthSelector
                        name="dateOfBirth"
                        onChange={(value) => setFieldValue("dateOfBirth", value)}
                    />
                    {/* <InputField name="dob" label="Date of Birth" /> */}
                </div>
                <div className="w-full md:flex-1 mt-3">
                    <InputField name="address" label="Address" />
                </div>
            </div>

            {/* Group 3: City + Zip */}
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:flex-1">
                    <InputField name="city" label="City" />
                </div>
                <div className="w-full md:flex-1">
                    <InputField name="zip" label="Zip Code" />
                </div>
            </div>

            {/* Group 4: State + Country */}
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:flex-1">
                    <InputField name="state" label="State" />
                </div>
                <div className="w-full md:flex-1">
                    <InputField name="country" label="Country" />
                </div>
            </div>

            {/* Single fields */}
            <InputField name="idNumber" label="ID Number (if applicable)" />
            <InputField name="idExpiry" label="ID Expiration Date" />

         ,
        </>
    );
}