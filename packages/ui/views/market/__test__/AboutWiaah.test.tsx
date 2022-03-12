import { mount, shallow } from "enzyme";
import { AboutWiaahView } from "../AboutWiaahView";

describe("About wiaah", () => {
  it("should render properly", () => {
    shallow(<AboutWiaahView />);
  });
  it("should contain a element with the text 'About Wiaah'", () => {
    const component = mount(<AboutWiaahView />);
    const aboutWiaahElement = component.find("#AboutWiaahText");

    expect(aboutWiaahElement.length).toBe(1);
    expect(aboutWiaahElement.text()).toBe("About Wiaah");
  });
});

describe("snapshots", () => {
  it("should match snapshot in its default state", () => {
    const component = mount(<AboutWiaahView />);
    expect(component).toMatchSnapshot();
  });
});
