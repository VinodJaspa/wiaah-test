import { TestingModule, Test } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import {
  KAFKA_EVENTS,
  mockedUser,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { ProfileVisibility } from 'prismaClient';
import { ProfileResolver } from './profile.resolver';
import { ProfileBlockEvent } from 'nest-dto';
import { BlockResolver } from '@block/block.resolver';
import { AppModule } from '../app.module';

describe('Block/unblock functionlaity', () => {
  let service: ProfileService;
  let profileResolver: ProfileResolver;
  let blockResolver: BlockResolver;
  let mockKafkaEmit: jest.Mock;

  const createProfileMockInput = {
    photo: 'test-photo',
    username: 'username',
    profession: 'test pro',
    bio: 'test bio',
    visibility: 'public' as ProfileVisibility,
  };

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.SOCIAL_SERVICE.token)
      .useValue(mockKafkaEmit)
      .compile();

    service = module.get<ProfileService>(ProfileService);
    profileResolver = module.get<ProfileResolver>(ProfileResolver);
  });

  it('should block profile and prevent interactions and fire profile blocked kafka event and unblock profile and fire profile unblocked kafka event', async () => {
    const firstProfile = await profileResolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );
    const secendProfile = await profileResolver.createProfile(
      createProfileMockInput,
      secendMockedUser,
    );

    // first profile blocks secend profile
    const res = await blockResolver.blockUser(
      {
        userId: secendProfile.id,
      },
      mockedUser,
    );

    expect(mockKafkaEmit).toBeCalledWith(
      KAFKA_EVENTS.PROFILE_EVENTS.profileBlocked,
      new ProfileBlockEvent({
        blockedProfileId: secendProfile.id,
        blockerProfileId: firstProfile.id,
      }),
    );
    expect(res).toBe(true);

    let canInteract = await service.canInteractWith(
      firstProfile.id,
      secendProfile.id,
    );

    expect(canInteract).toBe(false);

    const unblock = await blockResolver.unblockUser(
      { userId: secendProfile.id },
      mockedUser,
    );

    expect(unblock).toBe(true);

    canInteract = await service.canInteractWith(
      firstProfile.id,
      secendProfile.id,
    );

    expect(canInteract).toBe(true);
  });
});
