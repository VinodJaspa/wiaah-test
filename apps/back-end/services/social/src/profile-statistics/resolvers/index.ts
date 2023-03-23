import { ProfileActivityResolver } from './profile-activity.resolver';
import { ProfileEngagedResolver } from './profile-engaged.resolver';
import { ProfileReachedResolver } from './profile-reached.resolver';

export const ProfileStatisticsResolvers = [
  ProfileActivityResolver,
  ProfileEngagedResolver,
  ProfileReachedResolver,
];
