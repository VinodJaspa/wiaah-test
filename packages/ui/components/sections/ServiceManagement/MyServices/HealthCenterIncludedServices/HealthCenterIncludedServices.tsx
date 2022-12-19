import { Form, Formik } from "formik";
import React from "react";
import { InferType, NewServiceSchemas } from "validation";
import { Avatar, HealthCenterAddDoctorForm, CloseIcon } from "@UI";

const schema = NewServiceSchemas.healthCenterIncludedServicesSchema;

type DataType = InferType<typeof schema>;

export interface HealthCenterIncludedServicesProps {
  onChange: (data: DataType) => any;
}

export const HealthCenterIncludedServices: React.FC<
  HealthCenterIncludedServicesProps
> = ({ onChange }) => {
  return (
    <Formik<DataType>
      validationSchema={schema}
      initialValues={{
        doctors: [],
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => {
        onChange && onChange(values);
        return (
          <Form className="flex flex-col gap-4">
            {Array.isArray(values.doctors)
              ? values.doctors.map((doc, i) => (
                  <div className="flex gap-2 items-center">
                    <CloseIcon
                      className="text-xl cursor-pointer"
                      onClick={() =>
                        setFieldValue(
                          "doctors",
                          values.doctors?.filter((_, idx) => idx !== i)
                        )
                      }
                    />
                    <Avatar src={doc.picture} />
                    <div>
                      <p className="font-bold text-lg">{doc.name}</p>
                      <p className="font-semibold">{doc.specialist}</p>
                    </div>
                  </div>
                ))
              : null}
            <HealthCenterAddDoctorForm
              onAdd={(doc) =>
                setFieldValue("doctors", [...(values.doctors || []), doc])
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
};
