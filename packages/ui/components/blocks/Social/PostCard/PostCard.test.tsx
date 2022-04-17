import { shallow } from "enzyme";
import React from "react";
import { PostCard } from "../PostCard";
import { PostCardInfo } from "types/market/Social";

const postCardPlaceholder: PostCardInfo = {
  postInfo: {
    createdAt: new Date(Date.UTC(2022, 3)).toString(),
    id: "1",
    numberOfComments: 2,
    numberOfLikes: 4,
    tags: ["mood", "fun", "gaming"],
    attachment: {
      src: "/shop.jpeg",
      type: "image",
    },
    comments: [],
    content: "test post content",
  },
  profileInfo: {
    accountType: "buyer",
    id: "2",
    name: "buyer name",
    thumbnail: "/shop-2.jpeg",
    verifed: true,
  },
};

describe("PostCard render tests", () => {
  it("should render properly", () => {
    shallow(<PostCard {...postCardPlaceholder} />);
  });
});

describe("PostCard Snapshot tests", () => {
  it("should match snapshot", () => {
    expect(shallow(<PostCard {...postCardPlaceholder} />)).toMatchSnapshot;
  });
});
