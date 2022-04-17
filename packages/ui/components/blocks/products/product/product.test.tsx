import React from "react";
import { Product } from "../products/product";
import { shallow } from "enzyme";

it("renders as expected without parameters", () => {
  const wrapper = shallow(<Product />);
  expect(wrapper.find(".product-old-price").length).toEqual(0);
  expect(wrapper.find(".product-rating").length).toEqual(0);
  expect(wrapper.find(".product-off").length).toEqual(0);
  expect(wrapper.find(".product-cashback").length).toEqual(0);
  expect(wrapper).toMatchSnapshot();
});

it("Render correctly with all parameters", () => {
  const wrapper = shallow(
    <Product
      saved={true}
      cashback={10}
      off={20}
      name="Product Name"
      price={300}
      oldPrice={400}
      imgUrl="/image_url_here.jpg"
      rating={3}
    />
  );
  expect(wrapper.find(".product-old-price").first().text()).toEqual("$400");
  expect(wrapper.find(".product-name").first().text()).toEqual("Product Name");
  expect(wrapper.find(".product-price").first().text()).toEqual("$300");
  expect(wrapper.find(".product-old-price").first().text()).toEqual("$400");
  expect(wrapper.find("img").first().prop("src")).toEqual(
    "/image_url_here.jpg"
  );
  expect(wrapper.find("AiFillStar").length).toEqual(3);
  expect(wrapper.find("AiOutlineStar").length).toEqual(5 - 3);
});
