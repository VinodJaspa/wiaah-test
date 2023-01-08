export interface Subgraph {
  name: string;
  url: string;
}

export const subgraphs: Subgraph[] = [
  // { name: 'auth', url: 'http://localhost:3004/graphql' },
  { name: 'accounts', url: 'http://localhost:3005/graphql' },
  { name: 'products', url: 'http://localhost:3006/graphql' },
  // { name: 'wishlist', url: 'http://localhost:3009/graphql' },
  // { name: 'shop', url: 'http://localhost:3007/graphql' },
  // { name: 'search', url: 'http://localhost:3008/graphql' },
  // { name: 'reviews', url: 'http://localhost:3010/graphql' },
  // { name: 'cart', url: 'http://localhost:3011/graphql' },
  // { name: 'services', url: 'http://localhost:3020/graphql' },
  // { name: 'chat', url: 'http://localhost:3022/graphql' },
  // { name: 'notification', url: 'http://localhost:3025/graphql' },
  // { name: 'membership', url: 'http://localhost:3026/graphql' },
  // { name: 'billing', url: 'http://localhost:3015/graphql' },
];
