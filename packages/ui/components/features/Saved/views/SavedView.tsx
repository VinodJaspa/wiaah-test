import { useResponsive } from "hooks";
import { useRouter } from "next/router";
import React from "react";
import { SettingsSectionType } from "types";
import { ImageIcon, SavedPostsSection, SectionsLayout } from "ui";

export const SavedView: React.FC = () => {
  const baseRoute = "saved";
  const router = useRouter();
  const { section } = router.query;
  const { isMobile } = useResponsive();
  const route = Array.isArray(section) ? section[0] : section;

  React.useEffect(() => {
    if (!route && !isMobile) {
      router.push(`/${baseRoute}/${SavedSections[0].panelUrl}`);
    }
  }, [router, route]);

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);
  }
  return (
    <SectionsLayout
      name={{
        translationKey: "Saved",
        fallbackText: "Saved",
      }}
      handleRetrun={() => {
        router.push(`/${baseRoute}`, undefined, { shallow: true });
      }}
      currentSectionName={route || ""}
      sections={SavedSections}
      handleSectionChange={handleSectionChange}
    />
  );
};

const SavedSections: SettingsSectionType[] = [
  {
    panelName: "Posts",
    panelIcon: ImageIcon,
    panelUrl: "/posts",
    panelComponent: <SavedPostsSection />,
  },
];
