import React from "react";
import { getTestId } from "utils";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { Input } from "ui/components/partials/Input";

describe("Input functionaly tests", () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;
  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = mount(<Input onChange={onChangeMock} />);
    input = wrapper.find("input");
  });
  //   it("should trigger on change with the right value", () => {
  //     input.simulate("change", { target: { value: "135", name: "input" } });
  //     wrapper.update();

  //     input = wrapper.find("input");
  //     console.log(input.props());
  //     expect(input.prop("value")).toBe("135");
  //     expect(onChangeMock).toBeCalledWith((e: any) => e.target.value === "135");
  //   });
});
