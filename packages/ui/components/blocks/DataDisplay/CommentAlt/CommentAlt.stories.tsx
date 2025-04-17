import { storybookDataDisplayBlocksTitle, CommentAlt } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /CommentAlt",
  component: CommentAlt,
} as Meta<typeof CommentAlt>;

export const Default = () => (
  <CommentAlt
    content="test contnet"
    createdAt={new Date(Date.now()).toISOString()}
    user={{
      accountType: "buyer",
      id: "236",
      name: "wiaah",
      public: false,
      thumbnail: "/place-1.jpg",
      verifed: true,
    }}
  />
);
export const WithHashtags = () => (
  <CommentAlt
    content="test contnet"
    createdAt={new Date(Date.now()).toISOString()}
    user={{
      accountType: "buyer",
      id: "236",
      name: "wiaah",
      public: false,
      thumbnail: "/place-1.jpg",
      verifed: true,
    }}
    hashTags={["gaming", "fashion"]}
  />
);
export const WithDescription = () => (
  <CommentAlt
    content="test contnet"
    createdAt={new Date(Date.now()).toISOString()}
    user={{
      accountType: "buyer",
      id: "236",
      name: "wiaah",
      public: false,
      thumbnail: "/place-1.jpg",
      verifed: true,
    }}
    description="orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'"
  />
);
