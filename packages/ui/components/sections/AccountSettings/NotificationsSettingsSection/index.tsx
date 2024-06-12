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
import { UserNotificationSettingsPlaceholder } from "placeholder";

export interface NotificationsSettingsSectionProps {
  accountId: string;
}

export const NotificationsSettingsSection: React.FC<
  NotificationsSettingsSectionProps
> = ({ accountId }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  // use this graphql endpoint if the server is ready if not use Placeholder data
  // const { data: notificationSettings } = useGetUserNotificationsSettingsQuery(
  //   { userId: accountId },
  //   { enabled: !!accountId }
  // );
  const { mutate } = useUpdateUserNotificationSettingsMutation();
  const { radioInputProps } = useForm<Parameters<typeof mutate>[0]>({
    ...(UserNotificationSettingsPlaceholder || {}),
  });
  console.log("RadioInputProps" + radioInputProps);

  return isMobile ? (
    <div className="flex flex-col gap-4 p-2">
      <SectionHeader sectionTitle={t("Notifications")} />
      <Stack col divider={<Divider className="my-4" />}>
        {mapArray(notificationsOptions, (opt, i) => (
          <div className="flex flex-col gap-3">
            <TranslationText
              translationObject={opt.label}
              className="text-lg font-semibold border-b border-b-primary w-fit"
            />
            <div className="flex flex-col gap-4 w-full">
              {mapArray(opt.opts, (option, i) => (
                <HStack key={i} className="justify-between">
                  <TranslationText
                    className="text-[0.937rem]"
                    translationObject={option.name}
                  />
                  <Radio
                    {...radioInputProps}
                    name={opt.name}
                    value={option.value}
                    id="33"
                    colorScheme="primary"
                  />
                </HStack>
              ))}
            </div>
          </div>
        ))}
      </Stack>
    </div>
  ) : (
    <div className="w-full gap-8 flex flex-col">
      <SectionHeader sectionTitle={t("notifications", "Notifications")} />
      <Formik
        initialValues={{
          likes: "iFollow",
        }}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="w-full">
              <div className="w-full flex flex-col gap-8">
                {notificationsOptions.map(({ label, opts, name }, i) => (
                  <FormikRadio
                    defaultChecked
                    onChange={(v) => setFieldValue(name, v)}
                    name={name}
                    label={label}
                    options={opts}
                  />
                ))}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const fromPeopleIFollow: TranslationTextType = {
  translationKey: "from_people_i_follow",
  fallbackText: "From Peolple I Follow",
};
const fromPeopleIFollowValue = "iFollow";

const Off: TranslationTextType = "OFF";
const OffValue = "off";

const On: TranslationTextType = "On";
const OnValue = "on";

const fromEveryone: TranslationTextType = "From Everyone";
const fromEveryoneValue = "everyone";

const everyone: TranslationTextType = "Everyone";
const everyoneValue = "everyone";

const peopleYouFollow: TranslationTextType = "People You Follow";
const peopleYouFollowValue = "youFollow";

const noOne: TranslationTextType = "No One";
const noOneValue = "noOne";

const LikesNotificationsOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromPeopleIFollow,
    value: fromPeopleIFollowValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];

const CommentsNotificationsOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromPeopleIFollow,
    value: fromPeopleIFollowValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];

const CommentLikesNotificationOpts: FormOptionType[] = [
  {
    name: On,
    value: OnValue,
  },
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromPeopleIFollow,
    value: fromPeopleIFollowValue,
  },
];

const LikesAndCommentsOnPhotosOfYouNotificationOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromPeopleIFollow,
    value: fromPeopleIFollowValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];

const allowMentionsFromOpts: FormOptionType[] = [
  {
    name: everyone,
    value: everyoneValue,
  },
  {
    name: peopleYouFollow,
    value: peopleYouFollowValue,
  },
  {
    name: noOne,
    value: noOneValue,
  },
];
const allowTagsFrom: FormOptionType[] = [
  {
    name: everyone,
    value: everyoneValue,
  },
  {
    name: peopleYouFollow,
    value: peopleYouFollowValue,
  },
  {
    name: noOne,
    value: noOneValue,
  },
];

const firstPostsAndStoriesOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromPeopleIFollow,
    value: fromPeopleIFollowValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];

const videoViewCountsOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];
const supportRequestsOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: On,
    value: OnValue,
  },
];

const liveVideosOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: On,
    value: OnValue,
  },
];

const acceptedFollowRequests: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];
const instagramDirectRequests: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];
const instagramDirect: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];
const RemindersOpts: FormOptionType[] = [
  {
    name: Off,
    value: OffValue,
  },
  {
    name: fromEveryone,
    value: fromEveryoneValue,
  },
];

const notificationsOptions: {
  label: TranslationTextType;

  opts: FormOptionType[];
  name: string;
}[] = [
  {
    name: "likesNotifications",
    label: {
      translationKey: "likes",
      fallbackText: "Likes",
    },
    opts: LikesNotificationsOpts,
  },
  {
    name: "comments",
    label: {
      translationKey: "comments",
      fallbackText: "Comments",
    },
    opts: CommentsNotificationsOpts,
  },
  {
    name: "commentsLikesNotifiactions",
    label: {
      translationKey: "comment_likes",
      fallbackText: "Comment Likes",
    },
    opts: CommentLikesNotificationOpts,
  },
  {
    name: "LikesAndCommentsOnPhotosOfYou",
    label: {
      translationKey: "likes_and_comments_on_photos_of_you",
      fallbackText: "Likes and Comments on Photos of You",
    },
    opts: LikesAndCommentsOnPhotosOfYouNotificationOpts,
  },
  {
    name: "allowMentionsFrom",
    label: {
      translationKey: "allow_@mentions_from",
      fallbackText: "Allow @Mentions From",
    },
    opts: allowMentionsFromOpts,
  },
  {
    name: "allowTagsFrom",
    label: {
      translationKey: "allow_tags_from",
      fallbackText: "Allow Tags From",
    },
    opts: allowTagsFrom,
  },
  {
    name: "firstPostsAndStories",
    label: {
      translationKey: "first_posts_and_stories",
      fallbackText: "First Posts and Stories",
    },
    opts: firstPostsAndStoriesOpts,
  },
  {
    name: "videoViewCounts",
    label: {
      translationKey: "video_view_counts",
      fallbackText: "Video View Counts",
    },
    opts: videoViewCountsOpts,
  },
  {
    name: "supportRequests",
    label: {
      translationKey: "support_requests",
      fallbackText: "Support Requests",
    },
    opts: supportRequestsOpts,
  },
  {
    name: "acceptedFollowRequests",
    label: {
      translationKey: "accepted_follow_requests",
      fallbackText: "Accepted Follow Requests",
    },
    opts: acceptedFollowRequests,
  },
  {
    name: "wiaahDirectRequests",
    label: {
      translationKey: "wiaah_direct_requests",
      fallbackText: "Wiaah Direct Requests",
    },
    opts: instagramDirectRequests,
  },
  {
    name: "wiaahDirect",
    label: {
      translationKey: "wiaah_direct",
      fallbackText: "Wiaah Direct",
    },
    opts: instagramDirect,
  },
  {
    name: "reminders",
    label: {
      translationKey: "reminders",
      fallbackText: "Reminders",
    },
    opts: RemindersOpts,
  },
  {
    name: "liveVideos",
    label: {
      translationKey: "live_videos",
      fallbackText: "Live Videos",
    },
    opts: liveVideosOpts,
  },
];
