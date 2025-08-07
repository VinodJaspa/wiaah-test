import {
  BusinessType,
  ServiceType
} from "@features/API";
import { ServiceTypeFields } from "@features/ServiceTypes";
import { MemberTypeCheckboxes } from "@UI/components/shadcn-components/CompanyMembers/Index";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import SelectField from "@UI/components/shadcn-components/Fields/SelectField";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import {
  Formik,
  Form,
  FormikProps,
  FormikErrors,
  useFormikContext
} from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

const initialValues = {
  businessType: "shop",
  accountType: "company",
  type: ServiceType.Hotel,
  category: "",
  subcategory: "",
  subSubcategory: "",
  accommodationType: "",
  starRating: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  companyName: "",
  phone: "",
  vatId: "",
  members: [
    {
      memberType: ["Owner"],
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      idNumber: "",
      idExpiration: "",
      phone: "",
      address: "",
      city: "",
      country: "United States",
      state: "",
      postalCode: ""
    }
  ]
};

export const accountTypeOptions = [
  { label: "Company", value: "company" },
  { label: "Individual", value: "individual" }
];

export const bussinessTypeOptions = [
  { label: "Shop", value: "shop" },
  { label: "Services", value: "services" }
];

const serviceTypeOptions = [
  { label: "Hotel", value: "hotel" },
  { label: "Health Center", value: "health_center" },
  { label: "Holiday Rentals", value: "holiday_rentals" },
  { label: "Beauty Center", value: "beauty_center" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Vehicle", value: "vehicle" }
];

export type AuthFormStepThreeRef = {
  submit: () => Promise<void>;
  getValues: () => any;
  validate: () => Promise<Record<string, string>>;
};

const LeftSection = () => {
  const { values } = useFormikContext<typeof initialValues>();

  return (
    <div className="space-y-4 md:shadow-lg p-4">
      <SelectField
        name="businessType"
        options={bussinessTypeOptions}
        label="Business Type"
      />

      {values.businessType !== "shop" ? (
        <>
          <SelectField
            name="type"
            options={serviceTypeOptions}
            label="Service Type"
          />
          <ServiceTypeFields />
        </>
      ) : (
        <>
          <SelectField
            name="category"
            options={serviceTypeOptions}
            label="Category"
          />
          <SelectField
            name="subcategory"
            options={serviceTypeOptions}
            label="Subcategory"
          />
          <SelectField
            name="subSubcategory"
            options={serviceTypeOptions}
            label="Sub-subcategory"
          />
        </>
      )}

      <Subtitle>Company location</Subtitle>
      <InputField label="Address" name="address" />
      <InputField label="City" name="city" />
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="w-full sm:w-2/3">
          <InputField label="State" name="state" />
        </div>
        <div className="w-full sm:w-2/3">
          <InputField label="Postal Code" name="postalCode" />
        </div>
      </div>
      <InputField label="Country" name="country" />

      <Subtitle>Company Details</Subtitle>
      <InputField label="Company Name" name="companyName" />
      <InputField label="Phone" name="phone" />
      <InputField label="Vat ID" name="vatId" />
    </div>
  );
};

export const AccountInforamtion = forwardRef<
  AuthFormStepThreeRef,
  { onSuccess: () => void }
>((_, ref) => {
  const formRef = useRef<FormikProps<typeof initialValues>>(null);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await formRef.current?.submitForm();
    },
    getValues: () => formRef.current?.values,
    validate: async (): Promise<FormikErrors<typeof initialValues>> => {
      return await formRef.current?.validateForm();
    }
  }));

  return (
    <div className="md:p-4 max-w-screen-xl mx-auto">
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <LeftSection />
            <RightSection />
          </div>
        </Form>
      </Formik>
    </div>
  );
});

const RightSection = () => {
  const { values } = useFormikContext<typeof initialValues>();
  return (
    <div className="space-y-4 md:shadow-lg p-4">
      <SelectField
        name="accountType"
        options={accountTypeOptions}
        label="Account Type"
      />

      {values.accountType === "company" && (
        <>
          <Subtitle>Company Members Details</Subtitle>
          <MemberTypeCheckboxes />

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full sm:w-2/3">
              <InputField label="First Name" name="members[0].firstName" />
            </div>
            <div className="w-full sm:w-2/3">
              <InputField label="Last Name" name="members[0].lastName" />
            </div>
          </div>

          <InputField label="Email" name="members[0].email" />
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full sm:w-2/3">
              <InputField label="Birth Date" name="members[0].birthDate" type="date" />
            </div>
            <div className="w-full sm:w-2/3">
              <InputField label="ID Number" name="members[0].idNumber" />
            </div>
          </div>

          <InputField label="ID Expiration" name="members[0].idExpiration" type="date" />
          <InputField label="Phone" name="members[0].phone" />
          <InputField label="Address" name="members[0].address" />
          <InputField label="City" name="members[0].city" />
          <InputField label="Country" name="members[0].country" />

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full sm:w-2/3">
              <InputField label="State" name="members[0].state" />
            </div>
            <div className="w-full sm:w-2/3">
              <InputField label="Postal Code" name="members[0].postalCode" />
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">
              Add New
            </button>
            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded">
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};
