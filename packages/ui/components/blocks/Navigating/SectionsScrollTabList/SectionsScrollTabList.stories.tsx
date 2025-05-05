import { Meta, StoryFn } from "@storybook/react";
import { SectionsScrollTabList } from "./SectionsScrollTabList";
import { storybookNavigationTitle } from "utils";
import { usePublishRef } from "state";

export default {
  title: "UI / Blocks /Navigation /SectionsScrollTabList",
  component: SectionsScrollTabList,
} as Meta<typeof SectionsScrollTabList>;

const template: StoryFn<typeof SectionsScrollTabList> = () => {
  const sections: { name: string; slug: string }[] = [
    { name: "section one", slug: "1" },
    { name: "section two", slug: "2" },
    { name: "section three", slug: "3" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <SectionsScrollTabList tabs={sections} />
      {sections.map(({ name, slug }, i) => {
        const ref = usePublishRef(slug);
        return (
          <div
            ref={ref}
            className="h-[calc(95vh)] w-full rounded-2xl bg-gray-200"
            key={slug}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export const Default = {
  render: template,
};
