import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Contactus } from './entities/contactus.entity';
import { SendContactUsMessageInput } from './dto/sendContactUsMessage.input';

@Resolver(() => Contactus)
export class ContactusResolver {
  @Query(() => Boolean)
  sendContactUsMessage(@Args('args') args: SendContactUsMessageInput) {}
}
