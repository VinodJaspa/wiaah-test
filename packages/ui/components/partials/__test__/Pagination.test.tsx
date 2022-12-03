import { mount, shallow } from "enzyme";
import { Pagination } from "../Pagination";
import React from "react";

describe("Pagination component", () => {
  it("should  render properly", () => {
    shallow(<Pagination maxPages={5} />);
  });
  it("should contain the right elements", () => {
    const component = mount(<Pagination maxPages={5} />);
    const nextBtn = component.find("#NextPageBtn");
    const prevBtn = component.find("#PrevPageBtn");
    const firstBtn = component.find("#FirstPageBtn");
    const lastBtn = component.find("#LastPageBtn");
    const currentPage = component.find("#CurrentPage");
    expect(nextBtn.length).toBe(1);
    expect(prevBtn.length).toBe(1);
    expect(firstBtn.length).toBe(1);
    expect(lastBtn.length).toBe(1);
    expect(currentPage.length).toBe(1);
  });
  it("should incresse current page on next page btn click ", () => {
    const component = mount(<Pagination maxPages={5} />);
    const nextBtn = component.find("#NextPageBtn");
    const currentPage = component.find("#CurrentPage");
    nextBtn.simulate("click");
    expect(currentPage.text()).toBe("2");
  });
  it("should decresse current page on prev page btn click and only if current page is > 1", () => {
    const component = mount(<Pagination maxPages={5} />);
    const prevBtn = component.find("#PrevPageBtn");
    const nextBtn = component.find("#NextPageBtn");
    const currentPage = component.find("#CurrentPage");
    prevBtn.simulate("click");
    expect(currentPage.text()).toBe("1");
    nextBtn.simulate("click");
    expect(currentPage.text()).toBe("2");
    prevBtn.simulate("click");
    expect(currentPage.text()).toBe("1");
  });
  it("should not pass the max pages provided or be less than 1 ", () => {
    const component = mount(<Pagination maxPages={5} />);
    const prevBtn = component.find("#PrevPageBtn");
    const nextBtn = component.find("#NextPageBtn");
    const currentPage = component.find("#CurrentPage");

    for (let i = 0; i < 10; i++) {
      nextBtn.simulate("click");
    }
    expect(currentPage.text()).toBe("5");
    for (let i = 0; i < 10; i++) {
      prevBtn.simulate("click");
    }
    expect(currentPage.text()).toBe("1");
  });
  it("should call the onPageChange callback on page change and with the right page number", () => {
    const fn = jest.fn();
    const component = mount(<Pagination maxPages={9} onPageChange={fn} />);
    const nextBtn = component.find("#NextPageBtn");
    const prevBtn = component.find("#PrevPageBtn");
    const firstBtn = component.find("#FirstPageBtn");
    const lastBtn = component.find("#LastPageBtn");

    nextBtn.simulate("click");
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(2);
    prevBtn.simulate("click");
    expect(fn).toBeCalledTimes(3);
    expect(fn).toBeCalledWith(1);
    lastBtn.simulate("click");
    expect(fn).toBeCalledTimes(4);
    expect(fn).toBeCalledWith(9);
    firstBtn.simulate("click");
    expect(fn).toBeCalledTimes(5);
    expect(fn).toBeCalledWith(1);
  });
});

describe("pagination component snapshot", () => {
  it("should match snapshot", () => {
    const component = mount(<Pagination maxPages={5} />);
    expect(component).toMatchSnapshot();
  });
});
