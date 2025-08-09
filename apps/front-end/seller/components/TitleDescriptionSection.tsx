import React from "react";
import { getIn, useFormikContext } from "formik";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import { CreateProductInput } from "@features/API";

interface TitleDescription {
  langId: string;
  value: string;
}

interface ProductFormValues {
  title: TitleDescription;
  description: TitleDescription;
  metaTag?: string;
}

export default function TitleDescriptionSection() {
  const { values, errors, touched, setFieldValue } = useFormikContext<ProductFormValues>();

 // Safely get nested errors and touched for first element value
 const titleError = getIn(touched, "title[0].value") && getIn(errors, "title[0].value") ? getIn(errors, "title[0].value") : undefined;
 const descriptionError = getIn(touched, "description[0].value") && getIn(errors, "description[0].value") ? getIn(errors, "description[0].value") : undefined;

 // On change handler updates array with new value at index 0
 function handleChange(field: "title" | "description", text: string) {
   setFieldValue(field, [{ langId: "en", value: text }]);
 }
  console.log("errors:", errors);
  console.log("touched:", touched);
  return (
    <div className="space-y-2">
      <div>
        <Subtitle>Title & Description</Subtitle>

        <div className="space-y-4">
          <TextInput
            label="Product Name"
            placeholder="e.g., Handcrafted Leather Wallet"
            name="title.value"
            // value={values.title?.[0]?.value || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            error={titleError}
          />
          <TextArea
            label="Description"
            placeholder="Write product description..."
            name="description.value"
            // value={values.description?.[0].value || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            error={descriptionError}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Subtitle>SEO Meta Tag</Subtitle>
        <TextInput
          label="Meta Tag"
          className="mt-4"
          placeholder="e.g., Handcrafted Leather Wallet"
          name="metaTag"

          onChange={(e) => setFieldValue("metaTag", e.target.value)}

        />
      </div>
    </div>
  );
}
