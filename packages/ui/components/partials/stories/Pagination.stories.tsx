import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Pagination } from "../";

export default {
  title: "UI/partials/Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => {
    const [page, setPage] = React.useState<number>(1);
    return (
      <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
        <h1>Page: {page}</h1>
        <Story args={{ maxPages: 15, onPageChange: (page) => setPage(page) }} />
      </section>
    );
  },
];
