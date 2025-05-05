import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { getTestId } from "utils";
import {
  BeautyCenterMyServiceCard,
  BeautyCenterMyServiceCardProps,
} from "./BeautyCenterMyServiceCard";

const selectors = {
  editBtn: "EditServiceBtn",
  removeBtn: "RemoveServiceBtn",
};

describe("BeautyCenterMyServiceCard", () => {
  let wrapper: ShallowWrapper;
  let onRemoveMock: jest.Mock;
  let onEditMock: jest.Mock;
  const props: Omit<BeautyCenterMyServiceCardProps, "onEdit" | "onRemove"> = {
    id: "4",
    title: "beauty center service",
    description: "beauty center service description",
    type: "beauty_center",
    provider: "beauty center provider name",
    thumbnail: "/place-2.jpeg",
    name: "beauty center name",
    owners: ["owner 1", "owner 2"],
    rate: 4.8,
    reviews: 2655,
  };

  beforeEach(() => {
    onEditMock = jest.fn();
    onRemoveMock = jest.fn();
    wrapper = shallow(
      <BeautyCenterMyServiceCard
        {...props}
        onEdit={onEditMock}
        onRemove={onRemoveMock}
      />
    );
  });

  it("should trigger on edit when edit btn is clicked", () => {
    wrapper.find(getTestId(selectors.editBtn)).simulate("click");
    expect(onEditMock).toBeCalledTimes(1);
    expect(onEditMock).toBeCalledWith(props.id);
  });

  it("should trigger onRemove when remove btn is clicked", () => {
    wrapper.find(getTestId(selectors.removeBtn)).simulate("click");
    expect(onRemoveMock).toBeCalledTimes(1);
    expect(onRemoveMock).toBeCalledWith(props.id);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
