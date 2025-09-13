import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetUserNotificationsSettingsQuery,

  useResponsive,

} from "@UI";

export interface NotificationsSettingsSectionProps {
  accountId: string;
}

export const NotificationsSettingsSection: React.FC<
  NotificationsSettingsSectionProps
> = ({ accountId }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  // Fetch existing settings for this user
  const { data, error, isLoading } = useGetUserNotificationsSettingsQuery(
    { userId:accountId },
   
  );

  if (isLoading) return <div>Loading notification settings...</div>;

  if (error)
    return <div>Error loading notification settings: {(error as Error).message}</div>;

  if (!data)
    return <div>No notification settings found for user</div>;

//   // Mutation to update settings
//   const { mutate, isLoading: isUpdating } = useUpdateU();
// console.log(data,"data");

  // Local state to hold toggle values, initialized as empty
  const [togglesState, setTogglesState] = useState<Record<string, boolean>>({});

  // When API data arrives, initialize toggles state
  // useEffect(() => {
  //   if (data?.userNotificationSettings) {
  //     // Map your API response keys here to your toggle keys
  //     setTogglesState({
  //       "Pause All": data.userNotificationSettings.pauseAll || false,
  //       Likes: data.userNotificationSettings.likes || false,
  //       Followers: data.userNotificationSettings.followers || false,
  //       Mentions: data.userNotificationSettings.mentions || false,
  //       Comments: data.userNotificationSettings.comments || false,
  //       Shares: data.userNotificationSettings.shares || false,
  //       "Follow Request": data.userNotificationSettings.followRequest || false,
  //       "Follow Request Response": data.userNotificationSettings.followRequestResponse || false,
  //       Messages: data.userNotificationSettings.messages || false,
  //       "Posts Updates": data.userNotificationSettings.postsUpdates || false,
  //       "Story Updates": data.userNotificationSettings.storyUpdates || false,
  //       Remix: data.userNotificationSettings.remix || false,
  //       "Orders & Perks Updates": data.userNotificationSettings.ordersPerksUpdates || false,
  //       "Account activities": data.userNotificationSettings.accountActivities || false,
  //       "Product Updates": data.userNotificationSettings.productUpdates || false,
  //       "Reservations Updates": data.userNotificationSettings.reservationsUpdates || false,
  //       "Business tips": data.userNotificationSettings.businessTips || false,
  //       News: data.userNotificationSettings.news || false,
  //       Reminder: data.userNotificationSettings.reminder || false,
  //       Support: data.userNotificationSettings.support || false,
  //     });
  //   }
  // }, [data]);

  // Handle toggle changes
  const onToggleChange = (title: string) => {
    const newValue = !togglesState[title];
    const newToggles = { ...togglesState, [title]: newValue };
    setTogglesState(newToggles);

    // Prepare payload matching your API expected format
    // Example: convert keys to camelCase or whatever your backend expects
    const payload = {
      accountId,
      settings: {
        pauseAll: newToggles["Pause All"],
        likes: newToggles.Likes,
        followers: newToggles.Followers,
        mentions: newToggles.Mentions,
        comments: newToggles.Comments,
        shares: newToggles.Shares,
        followRequest: newToggles["Follow Request"],
        followRequestResponse: newToggles["Follow Request Response"],
        messages: newToggles.Messages,
        postsUpdates: newToggles["Posts Updates"],
        storyUpdates: newToggles["Story Updates"],
        remix: newToggles.Remix,
        ordersPerksUpdates: newToggles["Orders & Perks Updates"],
        accountActivities: newToggles["Account activities"],
        productUpdates: newToggles["Product Updates"],
        reservationsUpdates: newToggles["Reservations Updates"],
        businessTips: newToggles["Business tips"],
        news: newToggles.News,
        reminder: newToggles.Reminder,
        support: newToggles.Support,
      },
    };

    // Call mutation to update backend
    // mutate(payload);
  };

  if (isLoading) return <p>{t("Loading notification settings...")}</p>;
  // if (isError) return <p>{t("Failed to load notification settings")}</p>;

  const notificationSections = [
    // ... your notificationSections array unchanged ...
  ];

  const getToggleColor = (title: string, checked: boolean) => {
    if (!checked) return "bg-gray-200 peer-checked:bg-gray-800";

    if (["Follow Request", "Follow Request Response"].includes(title)) {
      return "bg-green-500 peer-checked:bg-green-600";
    }
    if (
      [
        "Posts Updates",
        "Remix",
        "Orders & Perks Updates",
        "Account activities",
        "Product Updates",
        "Reservations Updates",
        "Business tips",
        "News",
        "Reminder",
        "Support",
      ].includes(title)
    ) {
      return "bg-red-500 peer-checked:bg-red-600";
    }

    return "bg-black peer-checked:bg-black";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">{t("Notifications")}</h2>

      {notificationSections.map((section) => (
        <section key={section.heading} className="mb-10">
          <h3 className="text-base sm:text-lg font-semibold mb-6">{t(section.heading)}</h3>

          <div className="space-y-6">
            {section.options.map(({ title, description }) => {
              const checked = togglesState[title] || false;
              const toggleColor = getToggleColor(title, checked);

              return (
                <div
                  key={title}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base leading-tight">{t(title)}</p>
                    {description && (
                      <p className="text-xs sm:text-xs text-gray-500 leading-snug">{t(description)}</p>
                    )}
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={checked}
                      onChange={() => onToggleChange(title)}
    
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors duration-300 ${toggleColor}`}
                    />
                    <div
                      className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full border border-gray-300
                      transition-all duration-300 shadow-md
                      peer-checked:translate-x-5 peer-checked:border-white"
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
