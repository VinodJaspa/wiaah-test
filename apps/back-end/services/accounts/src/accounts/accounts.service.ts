import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountInput, UpdateAccountInput } from './dto';
import { Account } from './entities';
import { PrismaService } from 'src/prisma.service';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { CreateShoppingCartEvent } from 'nest-dto';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    @Inject(SERVICES.WISHLIST_SERVICE.token)
    private readonly wishlistClient: ClientKafka,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly shoppingCartclient: ClientKafka,
  ) {}

  async createAccountRecord(createAccountInput: CreateAccountInput) {
    try {
      const { email, firstName, lastName, password } = createAccountInput;

      const createdUser = await this.prisma.account.create({
        data: {
          email,
          firstName,
          lastName,
          password,
          type: 'buyer',
        },
      });
      this.wishlistClient.emit(KAFKA_EVENTS.WISHLIST_EVENTS.createWishlist, {
        ownerId: createdUser.id,
      });
      this.shoppingCartclient.emit(
        KAFKA_EVENTS.SHOPPING_CART_EVENTS.createShoppingCart,
        new CreateShoppingCartEvent({ ownerId: createdUser.id }),
      );
      return createdUser;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      if (typeof email !== 'string')
        throw new BadRequestException('invalid email field');

      const account = await this.prisma.account.findUnique({
        where: {
          email,
        },
      });
      if (!account) return false;

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email: string) {
    try {
      if (typeof email !== 'string')
        throw new BadRequestException('invalid email type');

      const account = await this.prisma.account.findUnique({
        where: {
          email,
        },
      });

      return account;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  }

  async update(
    id: string,
    updateAccountInput: UpdateAccountInput,
  ): Promise<Partial<Account>> {
    try {
      const { id, ...rest } = updateAccountInput;
      const res = await this.prisma.account.update({
        where: {
          id,
        },
        data: rest,
      });
      return res;
    } catch (err) {
      throw new BadRequestException('account was not found');
    }
  }

  async deleteAll() {
    try {
      await this.prisma.account.deleteMany();

      return true;
    } catch (err) {
      return false;
    }
  }

  async isSellerAccount(accountId: string): Promise<boolean> {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
      rejectOnNotFound(error) {
        throw new NotFoundException('account with the given id was not found');
      },
    });

    return account.type === 'seller';
  }

  async switchToSeller(userId: string) {
    try {
      await this.prisma.account.update({
        data: {
          type: 'seller',
        },
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
