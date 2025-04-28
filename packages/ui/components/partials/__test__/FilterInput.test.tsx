import { mount, shallow } from "enzyme";
import React from "react";
import { FilterInput } from "../FilterInput";

describe("FilterInput component render tests", () => {
  it("should render properly", () => {
    shallow(<FilterInput />);
  });
  it("should have 1 input element", () => {
    const component = shallow(<FilterInput id="test" />);
    const input = component.find("#test");
    expect(input.length).toBe(1);
  });
  it("should not have label element if 'label' prop was not provided", () => {
    const component = shallow(<FilterInput id="test" />);
    const label = component.find("[data-test='FilterInputLabel']");
    expect(label.length).toBe(0);
  });
  it("should have 1 label element with the right given name in the label prop", () => {
    const component = shallow(<FilterInput label="test Label" id="test" />);
    const label = component.find("[data-test='FilterInputLabel']");
    expect(label.text()).toBe("test Label");
  });
  it("should render input with type of 'checkbox' if variant prop was missing", () => {
    const component = shallow(<FilterInput id="test" />);
    const input = component.find("#test");
    expect(input.props().type).toBe("checkbox");
  });
  it("should render input with type of 'radio' if variant prop was 'radio'", () => {
    const component = shallow(<FilterInput variant="radio" id="test" />);
    const input = component.find("#test");
    expect(input.props().type).toBe("radio");
  });
  it("should render 2 inputs (min and max inputs) with type of 'range' if variant prop was 'range'", () => {
    const component = shallow(<FilterInput variant="range" id="test" />);
    const inputs = component.find("#test");
    expect(inputs.length).toBe(2);
    inputs.forEach((input) => {
      expect(input.props().type).toBe("range");
    });
  });
  it("should render input with type of 'checkbox' if variant prop was 'box'", () => {
    const component = shallow(<FilterInput variant="box" id="test" />);
    const input = component.find("#test");
    expect(input.props().type).toBe("checkbox");
  });
  it("should contain the right elements (range vriant)", () => {
    const component = shallow(<FilterInput variant="range" />);
    const minRangeInput = component.find("[data-test='minRangeInput']");
    const maxRangeInput = component.find("[data-test='maxRangeInput']");
    expect(minRangeInput.length).toBe(1);
    expect(maxRangeInput.length).toBe(1);
  });
});

describe("FilterInput checkbox and radio actions tests", () => {
  it("should trigger onChange event with the right state (box variant)", () => {
    const mockOnChange = jest.fn();
    const component = shallow(
      <FilterInput onChange={mockOnChange} variant="box" id="test" />
    );
    const input = component.find("#test");

    input.simulate("change", { target: { checked: true } });

    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith({ target: { checked: true } });

    input.simulate("change", { target: { checked: false } });

    expect(mockOnChange).toBeCalledTimes(2);
  });

  it("should trigger onChange event with the right selected choice number (radio variant)", () => {
    const mockOnChange = jest.fn();
    const component = shallow(
      <section>
        <FilterInput onChange={mockOnChange} variant="radio" data-test="test" />
        <FilterInput onChange={mockOnChange} variant="radio" data-test="test" />
        <FilterInput onChange={mockOnChange} variant="radio" data-test="test" />
      </section>
    );
    const radio = component.find("[data-test='test']");
    expect(radio.length).toBe(3);
    radio.forEach((input, i) => {
      input.simulate("change", { target: { value: i + 1 } });

      expect(mockOnChange).toBeCalledTimes(i + 1);
      expect(mockOnChange).toBeCalledWith({ target: { value: i + 1 } });
    });
    expect(mockOnChange).toBeCalledTimes(3);
  });
});

describe("FilterInput range variant action tests", () => {
  it("should have intital min and max states match those provided", () => {
    const component = shallow(
      <FilterInput min={500} max={2000} variant="range" id="rangeinput" />
    );
    const inputs = component.find("rangeinput");
    inputs.forEach((input, i) => {
      expect(input.props().min).toBe(500);
      expect(input.props().max).toBe(2000);
    });
  });
  it("should change value and call onRangeChange callback correctly with the right data", async () => {
    const mockOnChange = jest.fn();
    const component = mount(
      <FilterInput
        onRangeChange={mockOnChange}
        min={500}
        max={2000}
        variant="range"
      />
    );
    let minInput = component.find("[data-test='minRangeInput']");
    let maxInput = component.find("[data-test='maxRangeInput']");

    minInput.simulate("change", { target: { value: 550 } });
    minInput = component.find("[data-test='minRangeInput']");
    expect(minInput.props().value).toBe(550);
    expect(mockOnChange).toBeCalledTimes(2);
    expect(mockOnChange).toBeCalledWith({ min: 550, max: 2000 });

    maxInput.simulate("change", { target: { value: 1000 } });
    maxInput = component.find("[data-test='maxRangeInput']");
    expect(maxInput.props().value).toBe(1000);
    expect(mockOnChange).toBeCalledTimes(3);
    expect(mockOnChange).toBeCalledWith({ min: 550, max: 1000 });
  });
  it("should not pass the given limits", () => {
    const component = shallow(
      <FilterInput min={500} max={2000} variant="range" />
    );
    let minInput = component.find("[data-test='minRangeInput']");
    let maxInput = component.find("[data-test='maxRangeInput']");

    minInput.simulate("change", { target: { value: 450 } });
    minInput = component.find("[data-test='minRangeInput']");
    expect(minInput.props().min).toBe(500);
    expect(minInput.props().value).toBe(500);

    maxInput.simulate("change", { target: { value: 2500 } });
    maxInput = component.find("[data-test='maxRangeInput']");
    expect(minInput.props().max).toBe(2000);
    expect(maxInput.props().value).toBe(2000);
  });
  it("min input value should not pass the max input value", () => {
    const component = shallow(
      <FilterInput min={500} max={2000} variant="range" />
    );
    let minInput = component.find("[data-test='minRangeInput']");
    const maxInput = component.find("[data-test='maxRangeInput']");

    minInput.simulate("change", { target: { value: 750 } });
    maxInput.simulate("change", { target: { value: 1000 } });

    minInput = component.find("[data-test='minRangeInput']");
    minInput.simulate("change", { target: { value: 1500 } });
    minInput = component.find("[data-test='minRangeInput']");
    expect(minInput.props().value).toBe(750);
  });
  it("max input value should not pass the min input value", () => {
    const component = shallow(
      <FilterInput min={500} max={2000} variant="range" />
    );
    const minInput = component.find("[data-test='minRangeInput']");
    let maxInput = component.find("[data-test='maxRangeInput']");

    minInput.simulate("change", { target: { value: 750 } });
    maxInput.simulate("change", { target: { value: 1000 } });

    maxInput = component.find("[data-test='maxRangeInput']");
    maxInput.simulate("change", { target: { value: 500 } });
    maxInput = component.find("[data-test='maxRangeInput']");
    expect(maxInput.props().value).toBe(1000);
  });
});

describe("FilterInput snapshot", () => {
  it("should match snapshot", () => {
    const component = shallow(<FilterInput />);
    expect(component).toMatchSnapshot();
  });
  it("should match snapshot with range variant", () => {
    const component = shallow(<FilterInput variant="range" />);
    expect(component).toMatchSnapshot();
  });
  it("should match snapshot with box variant", () => {
    const component = shallow(<FilterInput variant="box" />);
    expect(component).toMatchSnapshot();
  });
  it("should match snapshot with radio variant", () => {
    const component = shallow(<FilterInput variant="radio" />);
    expect(component).toMatchSnapshot();
  });
});
