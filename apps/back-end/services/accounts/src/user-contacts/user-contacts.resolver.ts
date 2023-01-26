import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserContact } from './entities/user-contact.entity';
import { AddContactInput } from './dto';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Resolver(() => UserContact)
export class UserContactsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Boolean)
  async updateMyContact(
    @Args('args') input: AddContactInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      await this.prisma.userContact.update({
        where: {
          accountId: user.id,
        },
        data: input,
      });
      return true;
    } catch {
      return false;
    }
  }

  @Query(() => UserContact)
  async getMyContacts(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.userContact.findUnique({
      where: {
        accountId: user.id,
      },
    });
  }
}
