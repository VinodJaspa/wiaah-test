import { ItemsPagination, usePaginationControls } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookNavigationTitle } from "utils";
import React from "react";

export default {
  title: storybookNavigationTitle + "ItemsPagination",
  component: ItemsPagination,
} as ComponentMeta<typeof ItemsPagination>;

const template: ComponentStory<typeof ItemsPagination> = (args) => (
  <ItemsPagination {...args} />
);

const controlledTemplated: ComponentStory<typeof ItemsPagination> = (args) => {
  const {
    changeTotalItems,
    controls,
    pagination: { page, take },
  } = usePaginationControls({
    itemsPerPage: 10,
  });
  const ph = [...Array(100)].map((_, i) => ({ num: i + 1 }));

  React.useEffect(() => {
    changeTotalItems(ph.length);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <ol>
        {ph.slice(page * take, page * take + take).map((item, i) => (
          <li className="my-2">item: {item.num}</li>
        ))}
      </ol>
      <ItemsPagination controls={controls} />
    </div>
  );
};

export const Default = template.bind({});
Default.args = {};

export const controlled = controlledTemplated.bind({});
