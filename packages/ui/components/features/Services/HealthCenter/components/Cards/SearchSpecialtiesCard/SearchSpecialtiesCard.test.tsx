import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  SearchHealthSpecialtyCard,
  SearchSpecialtiesCardProps,
} from "./SearchSpecialtiesCard";

describe("SearchSpecialtiesCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: SearchSpecialtiesCardProps;
  beforeEach(() => {
    props = {
      specialty: {
        id: "432",
        name: "Cardiology", // Example specialty name
        description: "Specializes in heart-related conditions.",
      },
      searchQuery: "ti",
    };
    wrapper = shallow(<SearchHealthSpecialtyCard {...props} />);
  });

  it("should have HighlightText component with the right props", () => {
    const highlight = wrapper.find("HighlightText");
    expect(highlight.length).toBe(1);
    expect(highlight.prop("text")).toBe(props.specialty.name);
    expect(highlight.prop("toHighlight")).toBe(props.searchQuery);
  });
});
