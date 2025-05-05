import { ItemsPagination, usePaginationControls } from "./index";
import { Meta, StoryFn } from "@storybook/react";
import { storybookNavigationTitle } from "utils";
import React from "react";

export default {
  title: "UI / Blocks /Navigation /ItemsPagination",
  component: ItemsPagination,
} as Meta<typeof ItemsPagination>;

const controlledTemplated: StoryFn<typeof ItemsPagination> = (args) => {
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

export const Default = {
  args: {},
};

export const controlled = {
  render: controlledTemplated,
};
