import { ObjectId } from "mongodb";
import { db } from "../db";
import { faker } from "@faker-js/faker";

export const socialProfileSeeder = async (accountsIds: string[] = []) => {
  await db.social.profileCollection.insertMany(
    accountsIds.map((id, i) => ({
      _id: new ObjectId(),
      ownerId: id,
      createdAt: new Date(),
      updatedAt: new Date(),
      username: "profile name" + i,
      lastActive: new Date(),
      activeStatus: "inActive",
      bio: "test bio",
      photo: "",
      status: "active",
      followers: 15321,
      following: 135,
      publications: 30,
      profession: "profession",
      verified: true,
      hashtags: [],
      visits: 1563,
      gender: "male",
      visibility: "public",
    }))
  );

  const profiles = await db.social.profileCollection.find().toArray();

  return profiles;
};

export const socialPostsSeeder = async (
  author: {
    accountId: string;
  },
  options: {
    isPublic: boolean;
    enableComments: boolean;
    mentionsIds: string[];
  } = {
    isPublic: false,
    enableComments: true,
    mentionsIds: [],
  },
  postsNum: number = 5
) => {
  await db.social.newsfeedCollection.insertMany(
    [...Array(postsNum)].map((_, i) => ({
      userId: author.accountId,
      title: faker.company.name(),
      content: faker.lorem.lines(),
      hashtags: [
        {
          tag: faker.word.sample(),
        },
      ],
      reactionNum: faker.number.int(100),
      comments: faker.number.int(100),
      shares: faker.number.int(100),
      views: faker.number.int(100),
      visibility: options?.isPublic ? true : "followers",
      commentsVisibility: options?.isPublic ? true : "public",
      enableComments: options.enableComments,
      mentions: options?.mentionsIds.map((v) => ({ userId: v })),
      tags: [faker.word.sample()],
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
      legend: faker.lorem.lines(),
      popularity: faker.number.int(100),
      type: "newsfeed_post",
      attachments: [
        "https://images.pexels.com/photos/16143144/pexels-photo-16143144/free-photo-of-foxiang-ge-tower-on-hill-above-lake-shore-in-beijing-china.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    }))
  );

  const newsfeedposts = await db.social.newsfeedCollection.find().toArray();
  return newsfeedposts.map((v) => v._id.toHexString());
};

export const SocialFollowSeeder = async (options: {
  followerId: string;
  userId: string;
}) => {
  await db.social.followCollection.insertMany([
    {
      followerUserId: options?.followerId,
      followerLastStorySeenAt: new Date(),
      followingUserId: options?.userId,
      followingLastStoryPostedAt: new Date(),
      followedAt: new Date(),
    },
  ]);
};
