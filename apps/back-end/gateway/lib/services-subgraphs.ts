export interface Subgraph {
  name: string;
  url: string;
}

export const subgraphs: Subgraph[] = [
  { name: 'auth', url: 'http://localhost:3004/graphql' },
  { name: 'accounts', url: 'http://localhost:3005/graphql' },
];
