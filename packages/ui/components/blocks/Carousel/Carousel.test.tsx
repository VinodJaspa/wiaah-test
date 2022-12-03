import { shallow } from "enzyme";
import { Carousel } from "../";

describe("Carousel", () => {
  it("should  render properly", () => {
    shallow(<Carousel />);
  });
});
