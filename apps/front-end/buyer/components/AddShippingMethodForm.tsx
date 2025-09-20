import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { AiOutlinePlus } from 'react-icons/ai';
import InputField from '@UI/components/shadcn-components/Fields/InputField';
import SelectField from '@UI/components/shadcn-components/Fields/SelectField';
import DatePickerField from '@UI/components/shadcn-components/Fields/DatePicker';



const shippingSchema = Yup.object({
  shippingName: Yup.string().required('Shipping name is required'),
  shippingType: Yup.string().required('Select a shipping type'),
  companyName: Yup.string().required('Company name is required'),
  fixedPrice: Yup.number().typeError('Enter a valid price').required('Price is required'),
  shippingTime: Yup.string().required('Shipping time is required'),
});

export default function AddShippingMethodForm() {
  return (
    <Formik
      initialValues={{
        shippingName: '',
        shippingType: 'paid',
        companyName: '',
        fixedPrice: '',
        shippingTime: '',
      }}
      validationSchema={shippingSchema}
      onSubmit={(values) => {
        console.log(values);
        // Call API or pass to parent
      }}
    >
      {() => (
        <Form className="max-w-sm  w-full space-y-4">
          {/* <h2 className="text-2xl font-semibold text-black">Add Shipping Method</h2> */}

          <InputField name="shippingName" label="Shipping Name" placeholder="Enter shipping name" />
          <SelectField
            name="shippingType"
            label="Shipping Type"
            options={[
              { label: 'Paid', value: 'paid' },
              { label: 'Free', value: 'free' },
            ]}
          />
          <InputField name="companyName" label="Shipping Company Name" placeholder="Enter shipping company name" />
          <InputField name="fixedPrice" label="Shipping Fixed Price" placeholder="Enter shipping price" />
          {/* <InputField name="shippingTime" label="Shipping Time" placeholder="Delivered within 2 to 3 business days" /> */}
          <DatePickerField name="shippingTime" />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-full text-sm font-medium w-full"
          >
            <AiOutlinePlus className="text-lg" />
            Add shipping method
          </button>
        </Form>
      )}
    </Formik>
  );
}
