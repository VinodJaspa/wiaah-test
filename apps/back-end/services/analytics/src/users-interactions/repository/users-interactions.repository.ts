import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

export enum NumInputTypeEnum {
  increment = 'inc',
  decrement = 'dec',
  set = 'set',
}

type IntInput = {
  value: number;
  type: NumInputTypeEnum;
};

function handleUpdateNumInput(
  input: IntInput,
): Prisma.IntFieldUpdateOperationsInput {
  if (!input) return undefined;
  const value = input.value;
  switch (input.type) {
    case NumInputTypeEnum.increment:
      return {
        increment: value,
      };
    case NumInputTypeEnum.decrement:
      return {
        decrement: value,
      };
    case NumInputTypeEnum.set:
      return {
        set: value,
      };
    default:
      undefined;
  }
}

type UpdateInput = Partial<{
  postLikes: IntInput;
  comments: IntInput;
  shares: IntInput;
  messages: IntInput;
  interactionScore: IntInput;
  commentsLikes: IntInput;
  mentions: IntInput;
  reviewedItems: IntInput;
  profileVisits: IntInput;
  postSaved: IntInput;
}>;

@Injectable()
export class UsersInteractionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  update(ownerId: string, userId: string, input: UpdateInput) {
    if (!ownerId || !userId) throw new BadRequestException();
    return this.prisma.usersInteractions.upsert({
      create: {
        userId,
        ownerId,
        commentsReply: input?.comments?.value,
        commentsLikes: input?.commentsLikes?.value,
        shares: input?.shares?.value,
        messages: input?.messages?.value,
        postLikes: input?.postLikes?.value,
        interactionScore: input?.interactionScore?.value,
        mentions: input?.mentions?.value,
        reviewedItems: input?.reviewedItems?.value,
        profileVisits: input?.profileVisits?.value,
        postSaved: input?.postSaved?.value,
      },
      update: {
        commentsReply: handleUpdateNumInput(input?.comments),
        commentsLikes: handleUpdateNumInput(input?.commentsLikes),
        interactionScore: handleUpdateNumInput(input?.interactionScore),
        messages: handleUpdateNumInput(input?.messages),
        postLikes: handleUpdateNumInput(input?.postLikes),
        shares: handleUpdateNumInput(input?.shares),
        mentions: handleUpdateNumInput(input?.mentions),
        reviewedItems: handleUpdateNumInput(input?.reviewedItems),
        postSaved: handleUpdateNumInput(input?.postSaved),
        profileVisits: handleUpdateNumInput(input?.profileVisits),
      },
      where: {
        ownerId_userId: {
          ownerId,
          userId,
        },
      },
    });
  }

  updateAll(input: UpdateInput) {
    return this.prisma.usersInteractions.updateMany({
      data: {
        commentsLikes: handleUpdateNumInput(input.commentsLikes),
        commentsReply: handleUpdateNumInput(input.comments),
        interactionScore: handleUpdateNumInput(input.interactionScore),
        mentions: handleUpdateNumInput(input.mentions),
        messages: handleUpdateNumInput(input.messages),
        postLikes: handleUpdateNumInput(input.postLikes),
        shares: handleUpdateNumInput(input.shares),
      },
    });
  }

  getOneByUserId(ownerId: string, userId: string) {
    return this.prisma.usersInteractions.findUnique({
      where: {
        ownerId_userId: {
          ownerId,
          userId,
        },
      },
    });
  }
}
