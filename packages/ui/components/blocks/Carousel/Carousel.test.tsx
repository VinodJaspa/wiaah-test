import { shallow } from "enzyme";
import { Carousel } from "../";

describe("Carousel", () => {
  it("should render properly", () => {
    const children = [<div key="1">Item 1</div>, <div key="2">Item 2</div>]; // Mock children
    shallow(<Carousel children={children}></Carousel>); // Pass the mock children
  });
});
