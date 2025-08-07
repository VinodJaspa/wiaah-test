// components/ConditionalFields.tsx
import { useFormikContext } from "formik";
import { ServiceType } from "@features/API";

import SelectField from "@UI/components/shadcn-components/Fields/SelectField";

export const ServiceTypeFields = () => {

   const accommodationTypeOptions = [
        { label: 'Hotel', value: 'hotel' },
        { label: 'Health', value: 'health_center' },
        { label: 'Health', value: 'holiday_rentals' },
        { label: 'Restaurnet', value: 'beauty_center' },
        { label: 'Resort', value: 'restaurant' },
        { label: 'Serviced Apartment', value: 'vehicle' },
    ];
    
  const starRatingOptions = [
        { label: '1 Star', value: '1' },
        { label: '2 Stars', value: '2' },
        { label: '3 Stars', value: '3' },
        { label: '4 Stars', value: '4' },
        { label: '5 Stars', value: '5' },
    ];
    
  const { values } = useFormikContext<any>(); 
  console.log(values ,"values");
  

  switch (values && values.type) {
    case ServiceType.Hotel:
      return (
        <>
          <SelectField name="accommodationType" options={accommodationTypeOptions} label="Accommodation Type" />
          <SelectField name="starRating" options={starRatingOptions} label="Star Rating" />
        </>
      );
    case ServiceType.Restaurant:
      return (
        <>
          <SelectField name="accommodationType" options={accommodationTypeOptions} label="Cuisine Type" />
          <SelectField name="starRating" options={starRatingOptions} label="Seating Capacity" />
        </>
      );
    case ServiceType.HolidayRentals:
      return (
        <>
          <SelectField name="accommodationType" options={accommodationTypeOptions} label="Property Type" />
          <SelectField name="starRating" options={starRatingOptions} label="Accommodation Type" />
        </>
      );
    case ServiceType.Vehicle:
      return (
        <>
          <SelectField name="accommodationType" options={accommodationTypeOptions} label="Vehicle Type" />
          <SelectField name="starRating" options={starRatingOptions} label="Activity Type" />
        </>
      );
    case ServiceType.BeautyCenter:
      return (
        <>
          <SelectField name="accommodationType" options={accommodationTypeOptions} label="Establishment Type" />
          <SelectField name="starRating" options={starRatingOptions} label="Treatment Type" />
        </>
      );
    case ServiceType.HealthCenter:
      return (
        <>
          <SelectField name="accommodationType" options={accommodationTypeOptions} label="Establishment Type" />
          <SelectField name="starRating" options={starRatingOptions} label="Specialties" />
          <SelectField name="someOtherField" options={accommodationTypeOptions} label="Number of healthcare professionals" />
        </>
      );
    default:
      return null;
  }
};
