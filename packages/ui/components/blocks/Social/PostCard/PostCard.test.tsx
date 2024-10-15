import { shallow } from "enzyme";
import React from "react";
import { PostCard } from "../PostCard";
import { PostCardInfo } from "types";
import { PostCardPlaceHolder } from "@UI/placeholder";

const postCardPlaceholder: PostCardInfo = {
  postInfo: {
    numberOfShares: 4,
    views: 159,
    createdAt: new Date(Date.UTC(2022, 3)).toString(),
    id: "1",
    numberOfComments: 2,
    numberOfLikes: 4,
    tags: ["mood", "fun", "gaming"],
    attachments: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
    ],
    comments: [],
    content: "test post content",
  },
  profileInfo: {
    public: true,
    accountType: "buyer",
    id: "2",
    name: "buyer name",
    thumbnail: "/shop-2.jpeg",
    verifed: true,
    profession: "Profession",
  },
};

describe("PostCard render tests", () => {
  it("should render properly", () => {
    shallow(<PostCard post={PostCardPlaceHolder} />);
  });
});

describe("PostCard Snapshot tests", () => {
  it("should match snapshot", () => {
    expect(shallow(<PostCard post={PostCardPlaceHolder} />)).toMatchSnapshot;
  });
});
