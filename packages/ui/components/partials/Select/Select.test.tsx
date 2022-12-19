import React from "react";
import { shallow, ReactWrapper, ShallowWrapper, mount } from "enzyme";
import { getTestId, waitFor } from "utils";
import { Select, SelectOption } from "@UI/components/partials/Select";

const selectors = {
  selectOption: "SelectOption",
  selectBar: "SelectBar",
  optionsContainer: "SelectOptionsContainer",
  selectedOption: "SelectedOption",
};

describe("Select funtional tests", () => {
  let wrapper: ReactWrapper;
  let selectOptions: ReactWrapper;
  let selectBar: ReactWrapper;
  let optionsContainer: ReactWrapper;
  let selectedOption: ReactWrapper;
  let onOptionSelectMock: jest.Mock;
  beforeEach(() => {
    onOptionSelectMock = jest.fn();
    wrapper = mount(
      <Select
        placeholder="test placeholder"
        onOptionSelect={onOptionSelectMock}
      >
        {[...Array(15)].map((_, i) => (
          <SelectOption key={i} data-testid={selectors.selectOption} value={i}>
            option {i}
          </SelectOption>
        ))}
      </Select>
    );
    selectBar = wrapper.find(getTestId(selectors.selectBar));
    optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
    selectOptions = optionsContainer.find(getTestId(selectors.selectOption));
    selectedOption = wrapper.find(getTestId(selectors.selectedOption));
  });
  it("should not have any options intially", () => {
    expect(selectOptions.length).toBe(0);
  });
  it("should show and hidden options on click", async () => {
    expect(selectBar.length).toBe(1);
    expect(selectOptions.length).toBe(0);
    selectBar.simulate("click");
    wrapper.update();

    optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
    selectOptions = optionsContainer.find("SelectOption");

    expect(selectOptions.length).toBe(15);
    selectBar.simulate("click");
    await waitFor(() => {
      wrapper.update();
      optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
      selectOptions = optionsContainer.find("SelectOption");
      expect(selectOptions.length).toBe(0);
    });
  });
  it("should call on trigger onOptionSelect with the right value", () => {
    selectBar.simulate("click");
    wrapper.update();

    optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
    selectOptions = optionsContainer.find("SelectOption");
    wrapper.update();
    selectOptions.at(5).simulate("click");
    wrapper.update();
    expect(onOptionSelectMock).toBeCalledTimes(1);
    expect(onOptionSelectMock).toBeCalledWith(5);
  });

  it("should render the placeholder initialy", () => {
    expect(selectedOption.children().text()).toBe("test placeholder");
  });

  it("should set the selected option correctly", () => {
    selectBar.simulate("click");
    wrapper.update();

    optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
    selectOptions = optionsContainer.find("SelectOption");

    wrapper.update();
    selectOptions.at(5).simulate("click");

    wrapper.update();
    selectedOption = wrapper.find(getTestId(selectors.selectedOption));
    expect(selectedOption.children().text()).toBe("option 5");
  });

  it("should unmount other options on select", async () => {
    selectBar.simulate("click");
    wrapper.update();

    optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
    selectOptions = optionsContainer.find("SelectOption");
    wrapper.update();
    selectOptions.at(5).simulate("click");
    expect(onOptionSelectMock).toBeCalledTimes(1);
    expect(onOptionSelectMock).toBeCalledWith(5);

    waitFor(() => {
      wrapper.update();

      optionsContainer = wrapper.find(getTestId(selectors.optionsContainer));
      selectOptions = optionsContainer.find("SelectOption");
      expect(selectOptions.length).toBe(0);
    });
  });
});

describe("Select Snaptshot tests", () => {
  it("Should match snapshot", () => {
    expect(
      shallow(
        <Select>
          <SelectOption value={"1"}>option</SelectOption>
          <SelectOption value={"2"}>option</SelectOption>
          <SelectOption value={"3"}>option</SelectOption>
          <SelectOption value={"4"}>option</SelectOption>
        </Select>
      )
    ).toMatchSnapshot();
  });
});
