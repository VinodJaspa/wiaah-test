import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  BeautyCenterTreatmentCard,
  BeautyCenterTreatmentCardProps,
} from "./BeautyCenterTreatmentCard";
import { RecoilRoot } from "recoil";
import BeautyCenterCheckoutCardStories from "@features/Services/components/Cards/ServicesCheckoutCards/BeautyCenterCheckoutCard/BeautyCenterCheckoutCard.stories";

describe("BeautyCenterTreatmentCard tests ", () => {
  let wrapper: ReactWrapper;
  let props: BeautyCenterTreatmentCardProps;
  let onSelectMock: jest.Mock;
  let onUnSelectMock: jest.Mock;
  beforeEach(() => {
    onUnSelectMock = jest.fn();
    onSelectMock = jest.fn();
    props = {
      treatment: {
        id: "123",
        beautyCenterServiceId: "4",
        thumbnail: "",
        treatmentCategoryId: "432",
        discount: {
          units: 10, // Number of units the discount applies to
          value: 15.5, //
        },
        duration: [50, 90],
        price: 156,
        title: "health treatment",
      },
      onSelect: onSelectMock,
      onUnSelect: onUnSelectMock,
    };
    wrapper = mount(
      <RecoilRoot>
        <BeautyCenterTreatmentCard {...props} />
      </RecoilRoot>,
    );
  });
  it("should have display the title and category as a single text seperated by a -", () => {
    expect(
      wrapper.findWhere(
        (node) =>
          node.text() ===
          `${props.treatment.category} - ${props.treatment.title}`,
      ).length,
    ).toBe(1);
  });
  it("should have timeRangeDisplay component with the right props", () => {
    const timeRange = wrapper.find("TimeRangeDisplay");
    expect(timeRange.length).toBe(1);
    expect(timeRange.prop("rangeInMinutes")).toBe(props.treatment.duration);
  });
  it("should have priceDisplay component with the right props", () => {
    const pricedisplay = wrapper.find("PriceDisplay");
    expect(pricedisplay.length).toBe(1);
    expect(pricedisplay.prop("priceObject")).toEqual({
      amount: props.treatment.price,
    });
  });
  it("should have UnDiscountedPriceDisplay component with the right props", () => {
    const undiscoutned = wrapper.find("UnDiscountedPriceDisplay");
    expect(undiscoutned.length).toBe(1);
    expect(undiscoutned.prop("amount")).toBe(props.treatment.price);
    expect(undiscoutned.prop("discount")).toBe(props.treatment.discount);
  });
  it("should have button with the text 'Select' if the card havent been selected yet and clicking it should trigger onSelect prop function", () => {
    const btn = wrapper.findWhere((node) => {
      return node.name() === "Button" && node.text() === "Select";
    });
    expect(btn.length).toBe(1);
    btn.simulate("click");
    expect(onSelectMock).toBeCalledTimes(1);
    expect(onSelectMock).toBeCalledWith(props.treatment.id);
  });
  it("should have button with the text 'Selected' if the card have been selected and clicking it should trigger onUnSelect prop function", () => {
    const newprops: BeautyCenterTreatmentCardProps = { ...props, selected: true };
    wrapper = mount(
      <RecoilRoot>
        <BeautyCenterTreatmentCard {...newprops} />
      </RecoilRoot>,
    );
    const btn = wrapper.findWhere((node) => {
      return node.name() === "Button" && node.text() === "Selected";
    });
    expect(btn.length).toBe(1);
    btn.simulate("click");
    expect(onUnSelectMock).toBeCalledTimes(1);
    expect(onUnSelectMock).toBeCalledWith(props.treatment.id);
  });
});
