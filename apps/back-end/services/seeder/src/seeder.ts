import { seeder } from 'nestjs-seeder';
import { AccountsSeeder } from 'src/seeders/account.seeder';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ReviewSeeder } from './seeders/reviews.seeder';

export const client = new MongoClient(
  "mongodb+srv://havilahgroup:Xfgamxu5leyStP8H@cluster0.w8ye9mk.mongodb.net/retryWrites=true&w=majority&appName=Cluster0",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  },
);

export enum DatabaseConnections {
  accounts = 'wiaah-accounts',
  products = 'wiaah-products',
  services = 'wiaah-services',
  chat = 'wiaah-chat',
  social = 'wiaah-social',
  orders = 'wiaah-orders',
  moderation = 'wiaah-moderation',
  auth = 'wiaah-auth',
  shopping_cart = 'wiaah-shopping-cart',
  reviews = 'wiaah-reviews',
}

seeder({
  providers: [
    {
      provide: DatabaseConnections.accounts,
      useValue: client.db(DatabaseConnections.accounts),
    },
    {
      provide: DatabaseConnections.auth,
      useValue: client.db(DatabaseConnections.auth),
    },
    {
      provide: DatabaseConnections.products,
      useValue: client.db(DatabaseConnections.products),
    },
    {
      provide: DatabaseConnections.services,
      useValue: client.db(DatabaseConnections.services),
    },
    {
      provide: DatabaseConnections.social,
      useValue: client.db(DatabaseConnections.social),
    },
    {
      provide: DatabaseConnections.shopping_cart,
      useValue: client.db(DatabaseConnections.shopping_cart),
    },
    {
      provide: DatabaseConnections.reviews,
      useValue: client.db(DatabaseConnections.reviews),
    },
  ],
}).run([AccountsSeeder, ReviewSeeder]);
