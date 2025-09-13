"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User, Edit } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../shadcn-components/Fields/InputField";
import TextareaField from "../shadcn-components/Fields/TextAreaField";
import SelectField from "../shadcn-components/Fields/SelectField";
import EditProfile from "./Dialog/EditProfile";
import { Avatar } from "../shadcn-components/table";

// ✅ Yup validation schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .max(30, "Username must be 30 characters or less")
    .required("Username is required"),
  bio: Yup.string().max(150, "Bio must be 150 characters or less"),
  gender: Yup.string().required("Gender is required"),
});

export default function AccountOverview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header Row */}
      <div className="flex items-center justify-between py-2 border-b">
        <div className="flex items-center space-x-3">
          <Avatar src={"https://i.pravatar.cc/100"} alt="user"/>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Vinod Jaspa</span>
            <span className="text-xs text-gray-500">@vinodjaspa</span>
          </div>

      
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >

          Edit
        </button>
      </div>

      {open && <EditProfile setOpen={setOpen} open={open} />}
    </>
  );
}
