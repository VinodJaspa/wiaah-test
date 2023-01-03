import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product, ProductPost } from '@product-post/entities';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { GetUserProductPostsQuery } from '@product-post/queries';
import { GetUserProductPostsInput } from './dto';
import { PrismaService } from 'prismaService';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetBulkUsersPaidProductsMessage,
  GetBulkUsersPaidProductsMessageReply,
  GetFilteredProductsMessage,
  GetFilteredProductsMessageReply,
  GetUserInterestsScoresMessage,
  GetUserInterestsScoresMessageReply,
  GetUserMostInteractionersMessage,
  GetUserMostInteractionersMessageReply,
  GetUserPaidProductsMessage,
  GetUserPaidProductsMessageReply,
} from 'nest-dto';
import { Inject, UseGuards } from '@nestjs/common';

@Resolver(() => ProductPost)
@UseGuards(new GqlAuthorizationGuard([]))
export class ProductPostResolver {
  rateWeight = 1;
  likeWeight = 1;
  commentWeight = 1;
  sharesWeight = 1;
  salesWeight = 1;
  distanceWeight = 1;
  keywordsWeight = 1;
  hadPurchasedWeight = 1;
  friendsPurchasedWeight = 1;

  constructor(
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Query(() => [ProductPost])
  getUserProductPosts(
    @Args('args') args: GetUserProductPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetUserProductPostsQuery(args.authorId, user?.id, args.pagination),
    );
  }

  @Query(() => [ProductPost])
  async getRecommendedProductPosts(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProductPost[]> {
    let productIds: string[] = [];

    const MostInteractionersPromise = KafkaMessageHandler<
      string,
      GetUserMostInteractionersMessage,
      GetUserMostInteractionersMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners(),
      new GetUserMostInteractionersMessage({
        pagination: { page: 1, take: 50 },
        userId: user.id,
      }),
    );

    const myPaidProductsPromise = KafkaMessageHandler<
      string,
      GetUserPaidProductsMessage,
      GetUserPaidProductsMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getUserPaidProducts,
      new GetUserPaidProductsMessage({
        userId: user.id,
      }),
    );

    const myKeywordsPromise = KafkaMessageHandler<
      string,
      GetUserInterestsScoresMessage,
      GetUserInterestsScoresMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getUserPaidProducts,
      new GetUserInterestsScoresMessage({
        userId: user.id,
        pagination: {
          page: 1,
          take: 50,
        },
      }),
    );

    const {
      results: { data, success },
    } = await MostInteractionersPromise;

    const {
      results: { data: myPaidProductsData, success: myPaidProductsSuccess },
    } = await myPaidProductsPromise;

    const {
      results: { data: keywordData, success: keywordsSuccess },
    } = await myKeywordsPromise;

    if (success) {
      const {
        results: { data: friendsPaidProductsData },
      } = await KafkaMessageHandler<
        string,
        GetBulkUsersPaidProductsMessage,
        GetBulkUsersPaidProductsMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.PRODUCTS_MESSAGES.getBulkUsersPaidProducts,
        new GetBulkUsersPaidProductsMessage({
          pagination: {
            page: 1,
            take: 10,
          },
          userIds: data.users.map((v) => v.id),
        }),
      );

      const filteredProducts = await KafkaMessageHandler<
        string,
        GetFilteredProductsMessage,
        GetFilteredProductsMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.PRODUCTS_MESSAGES.getFilteredProducts,
        new GetFilteredProductsMessage({
          keywords: keywordData.keywords.map((v) => v.value),
          city: user.city,
          country: user.country,
          lat: user.lat,
          lon: user.lon,
          pagination: { page: 0, take: 50 },
        }),
      );

      productIds.concat(
        filteredProducts?.results?.data?.products?.map((v) => v.productId) ||
          [],
      );

      const products = await this.prisma.productPost.findMany({
        where: {
          OR: [
            {
              productId: {
                in: productIds,
              },
            },
          ],
        },
        orderBy: {
          reactionNum: 'desc',
        },
      });

      const weightedProducts = products.reduce((acc, curr) => {
        let score = 0;
        const productDetails = filteredProducts.results.data.products.find(
          (v) => v.productId === curr.productId,
        );

        if (productDetails?.rate)
          score += productDetails.rate * this.rateWeight;

        if (productDetails?.sales)
          score += productDetails.sales * this.salesWeight;

        if (productDetails?.distence)
          score += productDetails.distence * this.distanceWeight;

        if (productDetails.keywords) {
          const metKeywords = keywordData.keywords.filter((v) =>
            productDetails.keywords.includes(v.value),
          );
          const metKeywordsScore = metKeywords.reduce(
            (acc, curr) => acc + curr.score,
            0,
          );

          score += metKeywordsScore * this.keywordsWeight;
        }

        if (myPaidProductsData.products) {
          const product = myPaidProductsData.products.find(
            (v) => v.productId === curr.productId,
          );
          if (product) score += this.hadPurchasedWeight * 1;
        }

        if (friendsPaidProductsData?.users) {
          const friend = friendsPaidProductsData.users.find((v) =>
            v.products.some((c) => c.productId === curr.productId),
          );
          const friendInteration = data.users.find((v) => v.id === friend.id);

          if (friend && friendInteration)
            score += this.friendsPurchasedWeight * friendInteration.score;
        }

        if (curr.reactionNum) score += curr.reactionNum * this.likeWeight;

        if (curr.comments) score += curr.comments * this.commentWeight;

        if (curr.shares) score += curr.shares * this.sharesWeight;

        return [...acc, { ...curr, score }];
      }, [] as (ProductPost & { score: number })[]);

      const sortedProducts: ProductPost[] = weightedProducts.sort(
        (first, next) => next.score - first.score,
      );

      return sortedProducts;
    }
    return [];
  }

  @ResolveField(() => Product)
  product(@Parent() post: ProductPost) {
    return { __typename: 'Product', id: post.productId };
  }
}
