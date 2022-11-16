import { PrismaClient } from 'prismaClient';

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.blockedUser.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.contentReaction.deleteMany();
  await prisma.contentShare.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.newsfeedPost.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.story.deleteMany();
  await prisma.storyLike.deleteMany();
  await prisma.storyView.deleteMany();
  await prisma.userSavedPostsGroup.deleteMany();
  await prisma.privacySettings.deleteMany();
}

const prisma = new PrismaService();
beforeAll(async () => {
  await clearDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await clearDB();
  prisma.$disconnect();
});
