import { ComponentMeta } from "@storybook/react";
import { ProductAttributeDisplay } from "./ProductAttributeDisplay";
import {
  getRandomContrastingColor,
  storybookDataDisplayBlocksTitle,
} from "utils";
import {
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
} from "@features/API";
import { useState } from "react";

export default {
  title: storybookDataDisplayBlocksTitle + "ProductAttributeDisplay",
} as ComponentMeta<typeof ProductAttributeDisplay>;

export const SingleTextDisplay = () => {
  const [state, setState] = useState();
  return (
    <ProductAttributeDisplay
      displayType={ProductAttributeDisplayType.Text}
      id=""
      name="single text attribute"
      onChange={(v) => setState(v as any)}
      value={state as any}
      selectionType={ProductAttributeSelectionType.Single}
      values={[...Array(5)].map((_, i) => ({
        id: i.toString(),
        name: "test" + i,
        value: i.toString(),
      }))}
    />
  );
};

export const MultiTextDisplay = () => {
  const [state, setState] = useState();
  return (
    <ProductAttributeDisplay
      onChange={(v) => setState(v as any)}
      value={state as any}
      displayType={ProductAttributeDisplayType.Text}
      id=""
      name="multi text attribute"
      selectionType={ProductAttributeSelectionType.Multiple}
      values={[...Array(5)].map((_, i) => ({
        id: i.toString(),
        name: "test" + i,
        value: i.toString(),
      }))}
    />
  );
};

export const SingleColorDisplay = () => {
  const [state, setState] = useState();
  return (
    <ProductAttributeDisplay
      onChange={(v) => setState(v as any)}
      value={state as any}
      displayType={ProductAttributeDisplayType.Color}
      id=""
      name="single color attribute"
      selectionType={ProductAttributeSelectionType.Single}
      values={[...Array(5)].map((_, i) => ({
        id: i.toString(),
        name: getRandomContrastingColor(),
        value: getRandomContrastingColor(),
      }))}
    />
  );
};

export const MultiColorDisplay = () => {
  const [state, setState] = useState();
  return (
    <ProductAttributeDisplay
      onChange={(v) => setState(v as any)}
      value={state as any}
      displayType={ProductAttributeDisplayType.Color}
      id=""
      name="multi color attribute"
      selectionType={ProductAttributeSelectionType.Multiple}
      values={[...Array(5)].map((_, i) => ({
        id: i.toString(),
        name: getRandomContrastingColor(),
        value: getRandomContrastingColor(),
      }))}
    />
  );
};
