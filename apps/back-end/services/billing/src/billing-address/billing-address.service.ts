import { Injectable } from '@nestjs/common';
import { CreateBillingAddressInput, UpdateBillingAddressInput } from '@dto';
import { PrismaService } from 'src/prisma.service';
import { BillingAddress, BillingAddressCollection } from '@entities';
import {
  BillingAddressCollection as PrismaBillingAddressesCollection,
  BillingAddress as PrismaBillingAddress,
} from '@prisma-client';
import { v4 as uuid } from 'uuid';
import { BillingAddressNotFoundException } from '@exception';

@Injectable()
export class BillingAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getBillingCollectionByOwnerId(
    ownerId: string,
  ): Promise<BillingAddressCollection> {
    const collection = await this.billingAddressCollectionExists(ownerId);
    if (collection) return this.formatAddressCollection(collection, ownerId);
    const newCollection = await this.createBillingAdressCollection(ownerId);
    return newCollection;
  }

  async getBillingAddressById(
    ownerId: string,
    addressId: string,
  ): Promise<BillingAddress> {
    const collection = await this.getBillingCollectionByOwnerId(ownerId);
    if (!collection) throw new BillingAddressNotFoundException('ownerId');
    const { billingAddresses } = collection;
    return this.filterAndFormatBillingAddress(
      billingAddresses,
      addressId,
      ownerId,
    );
  }

  async createBillingAdressCollection(
    userId: string,
  ): Promise<BillingAddressCollection> {
    const exists = await this.billingAddressCollectionExists(userId);
    if (exists) {
      return exists;
    }
    const addressCollection = await this.prisma.billingAddressCollection.create(
      {
        data: {
          ownerId: userId,
        },
      },
    );
    return this.formatAddressCollection(addressCollection, userId);
  }

  async updateBillingAddress(
    userId: string,
    { id, ...rest }: UpdateBillingAddressInput,
  ): Promise<BillingAddress> {
    const addressesCollection = await this.billingAddressCollectionExists(
      userId,
    );
    if (!addressesCollection)
      throw new BillingAddressNotFoundException('userId');

    const { id: collectionId } = addressesCollection;

    const {
      billingAddresses,
      ownerId,
      id: addressId,
    } = await this.prisma.billingAddressCollection.update({
      where: {
        id: collectionId,
      },
      data: {
        billingAddresses: {
          updateMany: {
            where: {
              id,
            },
            data: rest,
          },
        },
      },
    });

    return this.filterAndFormatBillingAddress(
      billingAddresses,
      addressId,
      ownerId,
    );
  }

  async removeBillingAddress(
    userId: string,
    addressId: string,
  ): Promise<BillingAddress> {
    const addressesCollection = await this.billingAddressCollectionExists(
      userId,
    );
    if (!addressesCollection) throw new BillingAddressNotFoundException('id');
    const { billingAddresses } = addressesCollection;
    await this.prisma.billingAddressCollection.update({
      where: {
        ownerId: userId,
      },
      data: {
        billingAddresses: {
          deleteMany: {
            where: {
              id: addressId,
            },
          },
        },
      },
    });

    return this.filterAndFormatBillingAddress(
      billingAddresses,
      addressId,
      userId,
    );
  }

  filterAndFormatBillingAddress(
    addresses: PrismaBillingAddress[],
    addressId: string,
    ownerId: string,
  ): BillingAddress {
    const address = addresses.find((address) => address.id === addressId);
    return { ...address, ownerId };
  }

  async addNewBillingAddress(
    userId: string,
    input: CreateBillingAddressInput,
  ): Promise<BillingAddress> {
    const newId = uuid();
    const { ownerId, billingAddresses } =
      await this.prisma.billingAddressCollection.upsert({
        create: {
          ownerId: userId,
          billingAddresses: [{ ...input, id: newId }],
        },
        update: {
          billingAddresses: {
            push: { ...input, id: newId },
          },
        },
        where: {
          ownerId: userId,
        },
        select: {
          ownerId: true,
          billingAddresses: true,
        },
      });

    return this.filterAndFormatBillingAddress(billingAddresses, newId, ownerId);
  }

  async billingAddressCollectionExists(
    ownerId: string,
  ): Promise<BillingAddressCollection | null> {
    const exists = await this.prisma.billingAddressCollection.findUnique({
      where: {
        ownerId,
      },
    });
    if (exists) return this.formatAddressCollection(exists, ownerId);
    return null;
  }

  formatAddressCollection(
    collection: PrismaBillingAddressesCollection,
    ownerId: string,
  ): BillingAddressCollection {
    return {
      ...collection,
      billingAddresses: collection.billingAddresses.map((address) => ({
        ...address,
        ownerId,
      })),
    };
  }
}
