import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType, TranslationTextType } from "types";
import {
  Divider,
  FormikRadio,
  HStack,
  Radio,
  SectionHeader,
  Stack,
  TranslationText,
  useGetUserNotificationsSettingsQuery,
  useResponsive,
  useUpdateUserNotificationSettingsMutation,
} from "@UI";
import { mapArray, useForm } from "@UI/../utils/src";
import { UserNotificationSettingsPlaceholder } from "ui/placeholder";

export interface NotificationsSettingsSectionProps {
  accountId: string;
}

export const NotificationsSettingsSection: React.FC<
  NotificationsSettingsSectionProps
> = ({ accountId }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { mutate } = useUpdateUserNotificationSettingsMutation();

  // const { radioInputProps } = useForm<Parameters<typeof mutate>[0]>({
  //   mentions: UserNotificationSettingsPlaceholder[0].mentions,
  //   commentLike: UserNotificationSettingsPlaceholder[0].commentLike,
  //   postComment: UserNotificationSettingsPlaceholder[0].postComment,
  //   postReaction: UserNotificationSettingsPlaceholder[0].postReaction,
  // });

  const notificationSections = [
    {
      heading: "Push Notifications",
      options: [
        { title: "Pause All", description: "Allow notifications from Connect" },
        { title: "Likes", description: "When someone likes or comments on your photos or videos" },
        { title: "Followers", description: "When someone starts following you" },
        { title: "Mentions", description: "When someone mentions you in a comment or caption" },
        { title: "Comments", description: "When someone comments your content" },
        { title: "Shares", description: "When someone shares a post with you" },
        { title: "Messages", description: "When someone sends you a message" },
        { title: "Video Updates", description: "When someone you follow posts a new video" },
        { title: "Story Updates", description: "When someone you follow posts a new story" },
        { title: "Action Updates", description: "When someone you follow posts a new action" },
        { title: "Product update", description: "When you have an update for your orders." },
        { title: "Booking update", description: "When you have an update for your booking." },
      ],
    },
    {
      heading: "Email Notifications",
      options: [
        { title: "Account Activity", description: "Receive emails about your account activity" },
        { title: "Product Updates", description: "Receive emails about new features and updates" },
      ],
    },
    {
      heading: "SMS Notifications",
      options: [
        { title: "Account Activity", description: "Receive SMS notifications about your account activity" },
        { title: "Product Updates", description: "Receive SMS notifications about new features and updates" },
      ],
    },
    {
      heading: "In-App Notifications",
      options: [
        { title: "Account Activity", description: "Receive in-app notifications about your account activity" },
        { title: "Product Updates", description: "Receive in-app notifications about new features and updates" },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t("Notifications")}</h2>
      {notificationSections.map((section) => (
        <div key={section.heading} className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">{t(section.heading)}</h3>
          <div className="space-y-4">
            {section.options.map((option) => (
              <div
                key={option.title}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                <div className="flex-1">
                  <p className="font-medium text-base sm:text-lg">{t(option.title)}</p>
                  {option.description && (
                    <p className="text-sm text-gray-500">{t(option.description)}</p>
                  )}
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  {/* Background track */}
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gray-800 transition-colors duration-300" />

                  {/* Toggle knob */}
                  <div
                    className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full border border-gray-300
               transition-all duration-300 shadow-md
               peer-checked:translate-x-5 peer-checked:bg-black peer-checked:border-white"
                  />
                </label>



              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
