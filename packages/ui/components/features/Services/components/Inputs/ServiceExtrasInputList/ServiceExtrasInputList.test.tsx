import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import {
  ServiceExtrasInputList,
  ServiceExtrasInputListProps,
} from "./ServiceExtrasInputList";

const selectors = {
  extraItem: "ExtraItem",
  deleteItemBtn: "DeleteItemBtn",
  extraServiceInput: "ExtraServiceInput",
};

describe("ServiceExtraInputList", () => {
  let wrapper: ShallowWrapper;
  const props: ServiceExtrasInputListProps = {
    onChange(list) {},
    value: [
      {
        cost: 4,
        name: "cost 4",
      },
      {
        cost: 8,
        name: "cost 8",
      },
      {
        cost: 15,
        name: "cost 15",
      },
    ],
  };
  let mockOnChange: jest.Mock;
  beforeEach(() => {
    mockOnChange = jest.fn();
    wrapper = shallow(
      <ServiceExtrasInputList {...props} onChange={mockOnChange} />
    );
  });

  function addItem(value = { name: "new extra", cost: 5 }) {
    const input = wrapper.find(getTestId(selectors.extraServiceInput));
    const inputOnAdd = input.prop("onAdd") as Function;
    inputOnAdd(value);
  }
  function removeItem(idx: number) {
    const item = wrapper.find(getTestId(selectors.extraItem)).at(idx);
    const itemDeleteIbtn = item.find(getTestId(selectors.deleteItemBtn));

    itemDeleteIbtn.simulate("click");
  }
  it("should trigger onChange with the new extra added to the original value", () => {
    addItem();
    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith([
      ...props.value,
      { name: "new extra", cost: 5 },
    ]);
  });
  it("should not trigger onChange if the added extra is already there", () => {
    addItem({ ...props.value[0] });
    expect(mockOnChange).toBeCalledTimes(0);
  });
  it("should trigger onChange with the value after deleting an item", () => {
    removeItem(2);
    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith(props.value.filter((_, i) => i !== 2));
  });
  it("should have the right amount of extra items", () => {
    expect(wrapper.find(getTestId(selectors.extraItem)).length).toBe(
      props.value.length
    );
  });

  it("should match snapshot with value", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with no value", () => {
    expect(shallow(<ServiceExtrasInputList {...props} value={[]} />));
  });
});
