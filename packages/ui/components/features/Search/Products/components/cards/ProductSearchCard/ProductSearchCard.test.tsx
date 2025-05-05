import { shallow, ShallowWrapper } from "enzyme";
import { ProductSearchCard, ProductSearchCardProps } from "./ProductSearchCard";

describe("ProductSearcCard", () => {
  let wrapper: ShallowWrapper;
  const props: ProductSearchCardProps = {
    productInfo: {
      cashback: 5,
      colors: ["red", "green"],
      discount: 15,
      price: 35,
      rating: 4.5,
      reviewsCount: 1590,
      thumbnail: "/shop-2.jpeg",
      title: "title",
    },
    sellerInfo: {
      name: "seller name",
      profession: "profession",
      thumbnail: "/wiaah-logo.png",
      verified: true,
    },
  };

  beforeEach(() => {
    wrapper = shallow(<ProductSearchCard {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
