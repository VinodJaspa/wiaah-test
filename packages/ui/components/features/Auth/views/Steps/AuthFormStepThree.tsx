import {
  ServiceType
} from "@features/API";
import { useGetServiceCategoriesQuery } from "@features/Services";
import { ServiceTypeFields } from "@features/ServiceTypes";
import { useCreateShopMutation } from "@features/Shop";
import { MemberTypeCheckboxes } from "@UI/components/shadcn-components/CompanyMembers/Index";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import SelectField from "@UI/components/shadcn-components/Fields/SelectField";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import {
  FieldArray,
  Form,
  Formik,
  FormikProps,
  useFormikContext
} from "formik";
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { shopValidationSchema } from "./shopValidation";

import PhoneField from "@UI/components/shadcn-components/Fields/PhoneField";
import { errorToast, showGraphQLError, successToast } from "utils";
import CheckboxGroup, { StoreFor, TargetGenders } from "../storeType";
import { createShopPayload } from "./helpers/createShopPayload";

const initialValues = {
  businessType: "shop",
  collaborationType: "individual",
  type: ServiceType.Hotel,
  category: "",
  subcategory: "",
  subSubcategory: "",
  storeType: '',
  targetGenders: [],
  storeFor: [],
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

export const collaborationTypeOptions = [
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
const storeTypeOptions = [
  { label: "Product", value: "product" },
  { label: "Service", value: "service" },
]
type Values = typeof initialValues;
export type AuthFormStepThreeRef = {
  submit: () => Promise<boolean>;

  setTouched: () => any;

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
      <PhoneField label="Phone" name="phone" />
      <InputField label="Vat ID" name="vatId" />
      <SelectField
        name="storeType"
        options={storeTypeOptions}
        label="Store Type"
      />
      <div>
        <CheckboxGroup
          enumObj={StoreFor}
          name="storeFor"
          label="Store For"
        />

        <CheckboxGroup
          enumObj={TargetGenders}
          name="targetGenders"
          label="Target Genders"
        />
      </div>
    </div>
  );
};

export const AccountInforamtion = forwardRef<
  AuthFormStepThreeRef,
  { onSuccess: () => void }
>((_, ref) => {

  function setNestedTouched(errors: any): any {
    if (Array.isArray(errors)) {
      return errors.map((item) => setNestedTouched(item));
    } else if (typeof errors === "object" && errors !== null) {
      const touched: Record<string, any> = {};
      for (const key in errors) {
        touched[key] = setNestedTouched(errors[key]);
      }
      return touched;
    } else {
      return true;
    }
  }


  // const { data: categories } = useGetServiceCategoriesQuery();

  const formRef = useRef<FormikProps<Values>>(null);
  const { mutateAsync } = useCreateShopMutation();
  useImperativeHandle(ref, () => ({
    submit: async (): Promise<boolean> => {
      if (!formRef.current) return false;
  
      const errors = await formRef.current.validateForm();
      const isValid = Object.keys(errors).length === 0;
      console.log(errors, "errors");
  
      if (!isValid) {
        const touched = setNestedTouched(errors);
        formRef.current.setTouched(touched);
        errorToast("Please fix the errors before submitting");
        return false;
      }
  
      const values = formRef.current.values;
      const payload = createShopPayload(values);
  
      try {
        await mutateAsync(payload); // using mutateAsync instead of mutate
        successToast("Shop created successfully!");
        return true;
      } catch (err: any) {
        console.error("❌ API Error:", err);
        showGraphQLError(err);
        return false;
      }
    },
  
    setTouched: () => {
      formRef.current?.setTouched(
        Object.keys(formRef.current?.values || {}).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      );
    },
  }));
  
  return (
    <div className="md:p-4 max-w-screen-xl mx-auto">
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={shopValidationSchema}
        onSubmit={() => { }}
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
  const { values, setFieldValue, setFieldError } =
    useFormikContext<typeof initialValues>();

  const handlecollaborationTypeChange = (value: string) => {
    setFieldValue("collaborationType", value);

    if (value === "individual") {
      // Clear members array
      setFieldValue("members", []);

      // Clear any validation errors on members
      setFieldError("members", undefined);
    }
  };
  return (
    <div className="space-y-4 md:shadow-lg p-4">
      <SelectField
        name="collaborationType"
        options={collaborationTypeOptions}
        label="Account Type"
        onChange={(value) => handlecollaborationTypeChange(value)}
      />

      {values.collaborationType === "company" && (
        <>
          <CompanyMembersForm />
        </>
      )}
    </div>
  );
};


export function CompanyMembersForm() {
  const { values, errors } = useFormikContext<typeof initialValues>();
  return (
    <div>
      <Subtitle>Company Members Details</Subtitle>
      <FieldArray name="members">
        {({ push, remove }) => (
          <>
            {values.members.map((member, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <MemberTypeCheckboxes name={`members[${index}].memberType`} />

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <InputField label="First Name" name={`members[${index}].firstName`} />
                  <InputField label="Last Name" name={`members[${index}].lastName`} />
                </div>

                <InputField label="Email" name={`members[${index}].email`} />
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <InputField label="Birth Date" type="date" name={`members[${index}].birthDate`} />
                  <InputField label="ID Number" name={`members[${index}].idNumber`} />
                </div>

                <InputField label="ID Expiration" type="date" name={`members[${index}].idExpiration`} />
                <PhoneField label="Phone" name={`members[${index}].phone`} />

                <InputField label="Address" name={`members[${index}].address`} />
                <InputField label="City" name={`members[${index}].city`} />
                <InputField label="Country" name={`members[${index}].country`} />
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <InputField label="State" name={`members[${index}].state`} />
                  <InputField label="Postal Code" name={`members[${index}].postalCode`} />
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => remove(index)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() =>
                push({
                  memberType: [],
                  firstName: "",
                  lastName: "",
                  email: "",
                  birthDate: "",
                  idNumber: "",
                  idExpiration: "",
                  phone: "",
                  address: "",
                  city: "",
                  country: "",
                  state: "",
                  postalCode: "",
                })
              }
            >
              Add New
            </button>
          </>
        )}
      </FieldArray>
    </div>
  );
}

