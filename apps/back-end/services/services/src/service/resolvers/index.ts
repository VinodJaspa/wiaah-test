import { extendsResolvers } from './extends';
import { restaurantResolvers } from './restaurant';

export const resolvers = [...restaurantResolvers, ...extendsResolvers];
