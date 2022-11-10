import { Test, TestingModule } from '@nestjs/testing';
import { UserMembershipResolver } from './user-membership.resolver';
import { UserMembershipService } from './user-membership.service';

describe('UserMembershipResolver', () => {
  let resolver: UserMembershipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMembershipResolver, UserMembershipService],
    }).compile();

    resolver = module.get<UserMembershipResolver>(UserMembershipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
