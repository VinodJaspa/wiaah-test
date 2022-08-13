import { HealthCenterSearchSuggistionsData } from "api";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getMountedComponent, getTestId, randomNum } from "utils";
import { HealthCenterSearchBox } from "./HealthCenterSearchBox";

const testids = {
  searchQueryInput: "SearchQueryInput",
  searchLocationInput: "SearchLocationInput",
};
const mockSpecialties: string[] = [
  "Lorem Ipsum is simply dummy text of the printing and",
  "typesetting industry",
  "Lorem Ipsum has been the industry's",
  "standard dummy text ever since",
  "the 1500s, when an",
];
let mockRoutingVisit: jest.Mock;
let mockAddFilter: jest.Mock;
let mockGetHealthCenterSearchData: jest.Mock;
let mockSearchData: HealthCenterSearchSuggistionsData;
mockRoutingVisit = jest.fn();
mockAddFilter = jest.fn();
mockGetHealthCenterSearchData = jest.fn();
mockSearchData = {
  practitioners: [...Array(50)].map((_, i) => ({
    location: {
      address: "address",
      city: "city",
      cords: {
        lat: 15,
        lng: 15,
      },
      country: "france",
      countryCode: "FR",
      postalCode: 1322,
      state: "Geneve",
    },
    id: `${i}`,
    rate: randomNum(15),
    name: mockSpecialties[randomNum(mockSpecialties.length)],
    photo:
      "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
    specialty: "Dentist",
  })),
  specialties: [...Array(50)].map(() => ({
    title: mockSpecialties[randomNum(mockSpecialties.length)],
    photo: undefined,
  })),
};
jest.mock("api", () => ({
  getHealthCenterSearchData: (...props: any) => {
    console.log(props);
    mockGetHealthCenterSearchData(props);
    return {
      total: 159,
      data: mockSearchData,
      hasMore: false,
    };
  },
}));
jest.mock("routing", () => ({
  useRouting: () => ({
    visit: (fn: (routes: any) => any) => {
      fn({
        visitServiceLocationSearchResults: mockRoutingVisit,
      });
    },
  }),
}));
describe("HealthCenterSearchBox tests", () => {
  let wrapper: ReactWrapper;
  let searchQueryInput: ReactWrapper;
  let searchLocationInput: ReactWrapper;

  beforeAll(() => {});

  beforeEach(() => {
    wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <HealthCenterSearchBox />
      </QueryClientProvider>
    );
    searchQueryInput = getMountedComponent(
      wrapper,
      getTestId(testids.searchQueryInput)
    );
    searchLocationInput = getMountedComponent(
      wrapper,
      getTestId(testids.searchLocationInput)
    );
  });

  it("should trigger call the backend on query search input change to get updated search suggestions", () => {
    searchQueryInput.simulate("change", { target: { value: "test search" } });
    expect(mockGetHealthCenterSearchData).toBeCalledWith([
      { page: 0, take: 10 },
      {
        location: "",
        q: "test search",
      },
    ]);
    searchQueryInput.simulate("change", { target: { value: "search" } });
    expect(mockGetHealthCenterSearchData).toBeCalledWith([
      { page: 0, take: 10 },
      {
        location: "",
        q: "search",
      },
    ]);
  });
  it("should call the backend on location input change to get updated search suggestions", () => {
    searchLocationInput.simulate("change", {
      target: { value: "switzerland" },
    });
    expect(mockGetHealthCenterSearchData).toBeCalledWith([
      {
        page: 0,
        take: 10,
      },
      { location: "switzerland", q: "" },
    ]);
  });
  it("should render SearchHealthSpecialtiesCardsList component on wrapper focus ", async () => {
    let list = wrapper.find("SearchHealthSpecialtiesCardsList");

    expect(list.length).toBe(0);

    wrapper.simulate("focus");

    wrapper.update();
    list = wrapper.find("SearchHealthSpecialtiesCardsList");

    expect(list.length).toBe(1);
    expect(list.prop("specialites")).toBe(mockSearchData.specialties);
  });
  it("should render SearchHealthPractitionersCardsList component on wrapper focus", async () => {
    let list = wrapper.find("SearchHealthPractitionersCardsList");

    wrapper.simulate("focus");

    wrapper.update();
    list = wrapper.find("SearchHealthPractitionersCardsList");
    expect(list.length).toBe(1);
    expect(list.prop("practitioners")).toBe(mockSearchData.practitioners);
  });
});
