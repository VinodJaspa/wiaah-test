import { Form, Formik } from "formik";
import React from "react";
import { NewServiceSchemas } from "validation";

export const HotelIncludedServicesSection: React.FC<{
  onChange?: (props: Record<string, any>) => any;
}> = ({ onChange }) => {
  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{}}
      validationSchema={NewServiceSchemas.hotelIncludedServicesSchema}
    >
      {({ setFieldValue, values }) => {
        onChange && onChange(values);
        return <Form></Form>;
      }}
    </Formik>
  );
};
