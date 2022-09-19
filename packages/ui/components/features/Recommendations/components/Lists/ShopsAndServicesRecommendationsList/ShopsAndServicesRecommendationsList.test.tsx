import { shallow, ShallowWrapper } from "enzyme";
import { ShopsAndServicesRecommendationsList } from "./ShopsAndServicesRecommendationsList";
let mockquery = jest.fn();
jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useGetRecommendedShopsQuery: (...props: any) => {
    mockquery(...props);
    const shopTypes: string[] = [
      "hotel",
      "restaurant",
      "health_center",
      "vehicle",
      "holidays_rentals",
      "beauty_center",
    ];

    const shopLabels = [
      "Hotel",
      "Restaurant",
      "Health Center",
      "Vehicle",
      "Holidays Rentals",
      "Beauty Center",
      "Ready to wear",
      "Video Game",
    ];

    return {
      data: {
        hasMore: false,
        total: 135,
        data: [...Array(5)].map((_, i) => ({
          id: `${i}`,
          name: "shop name",
          thumbnail: "/shop-2.jpeg",
          label: shopLabels[4],
          type: shopTypes[2],
        })),
      },
      isLoading: false,
      isError: false,
    };
  },
}));

describe("ShopsAndServicesRecommendedationsList tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ShopsAndServicesRecommendationsList />);
  });

  it("should trigger mockquery", () => {
    expect(mockquery).toBeCalled();
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
