import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import {
  AuthorizationDecodedUser,
  mockedUser,
  requestGraphql,
  secendMockedUser,
  thirdMockedUser,
} from 'nest-utils';
import { PrismaClient } from '@prisma-client';
import { BookHotelRoomInput } from '@book-service/dto';

let mockSeller: AuthorizationDecodedUser = {
  ...mockedUser,
  accountType: 'seller',
};
let mockBuyer: AuthorizationDecodedUser = {
  ...secendMockedUser,
  accountType: 'buyer',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma = new PrismaClient();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  const reqGql = (q: string, v: any, user: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(user) });

  it('should get seller booked services within a week, a month, or within a day', async () => {
    const getBookedSericesQuery = `
    query getBookings(
      $d:String!
      $sp:String!
    ){
      getMyBookings(
        args:{
          date:$d
          searchPeriod:$sp
        }
      ){
        id
      }
    }`;

    let lastMonthServiceDate = new Date(2022, 9, 5);
    let currMonthServiceDate = new Date(2022, 10, 5);
    let nextMonthServiceDate = new Date(2022, 11, 5);
    let currDayServiceDate = new Date(2022, 10, 15);
    let currWeekServiceDate = new Date(2022, 10, 17);
    let currMonthSearchDate = new Date(2022, 10, 15);

    const hotelInput = {
      serviceId: secendMockedUser.shopId,
      checkout: new Date(),
      cancelationPolicyId: thirdMockedUser.id,
      extrasIds: [secendMockedUser.id],
      guests: 1,
      roomId: thirdMockedUser.shopId,
    };

    await prisma.bookedService.create({
      data: {
        ...hotelInput,
        type: 'hotel',
        ownerId: mockBuyer.id,
        providerId: mockSeller.id,
        checkin: currMonthServiceDate,
      },
    });

    await prisma.bookedService.create({
      data: {
        ...hotelInput,
        type: 'hotel',
        ownerId: mockBuyer.id,
        providerId: mockSeller.id,
        checkin: lastMonthServiceDate,
      },
    });

    await prisma.bookedService.create({
      data: {
        ...hotelInput,
        type: 'hotel',
        ownerId: mockBuyer.id,
        providerId: mockSeller.id,
        checkin: nextMonthServiceDate,
      },
    });

    await prisma.bookedService.create({
      data: {
        ...hotelInput,
        type: 'hotel',
        ownerId: mockBuyer.id,
        providerId: mockSeller.id,
        checkin: currDayServiceDate,
      },
    });

    await prisma.bookedService.create({
      data: {
        ...hotelInput,
        type: 'hotel',
        ownerId: mockBuyer.id,
        providerId: mockSeller.id,
        checkin: currWeekServiceDate,
      },
    });

    let res = await reqGql(
      getBookedSericesQuery,
      {
        d: currMonthSearchDate.toISOString(),
        sp: 'month',
      },
      mockSeller,
    );

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getMyBookings).toHaveLength(3);

    res = await reqGql(
      getBookedSericesQuery,
      {
        d: currMonthSearchDate.toISOString(),
        sp: 'week',
      },
      mockSeller,
    );

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getMyBookings).toHaveLength(2);

    res = await reqGql(
      getBookedSericesQuery,
      {
        d: currMonthSearchDate.toISOString(),
        sp: 'day',
      },
      mockSeller,
    );

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getMyBookings).toHaveLength(1);
  });
});
