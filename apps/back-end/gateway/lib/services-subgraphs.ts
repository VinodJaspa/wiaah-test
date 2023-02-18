export interface Subgraph {
  name: string;
  url: string;
}

export const subgraphs: Subgraph[] = [
  { name: 'auth', url: 'http://localhost:3004/graphql' },
  { name: 'accounts', url: 'http://localhost:3005/graphql' },
  { name: 'products', url: 'http://localhost:3006/graphql' },
  { name: 'wishlist', url: 'http://localhost:3009/graphql' },
  // { name: 'shop', url: 'http://localhost:3007/graphql' },
  { name: 'reviews', url: 'http://localhost:3010/graphql' },
  { name: 'search', url: 'http://localhost:3008/graphql' },
  { name: 'services', url: 'http://localhost:3020/graphql' },
  { name: 'chat', url: 'http://localhost:3022/graphql' },
  // { name: 'notification', url: 'http://localhost:3025/graphql' },
  { name: 'membership', url: 'http://localhost:3026/graphql' },
  { name: 'billing', url: 'http://localhost:3015/graphql' },
  { name: 'shoppingCart', url: 'http://localhost:3011/graphql' },
  { name: 'affiliation', url: 'http://localhost:3029/graphql' },
  { name: 'social', url: 'http://localhost:3017/graphql' },
  { name: 'orders', url: 'http://localhost:3014/graphql' },
  { name: 'hashtag', url: 'http://localhost:3024/graphql' },
  { name: 'voucher', url: 'http://localhost:3016/graphql' },
  { name: 'currency_conversaion', url: 'http://localhost:3012/graphql' },
];
