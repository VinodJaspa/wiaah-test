import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import {
  accountType,
  AuthorizationDecodedUser,
  mockedUser,
  requestGraphql,
  secendMockedUser,
  thirdMockedUser,
} from 'nest-utils';
import { PrismaClient } from '@prisma-client';
import { GetBookingsHistoryInput } from '@book-service/dto';
import { BookedService } from '@book-service/entities';
import { bookedServiceStatus } from '@book-service/const';

let mockSeller: AuthorizationDecodedUser = {
  ...mockedUser,
  accountType: accountType.SELLER,
};
let mockBuyer: AuthorizationDecodedUser = {
  ...secendMockedUser,
  accountType: accountType.BUYER,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma = new PrismaClient();

  beforeAll(async () => {
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
  const hotelInput = {
    serviceId: secendMockedUser.shopId,
    checkout: new Date(),
    cancelationPolicyId: thirdMockedUser.id,
    extrasIds: [secendMockedUser.id],
    guests: 1,
    roomId: thirdMockedUser.shopId,
  };
  describe('should get seller and buyer booked services ', () => {
    const getBookingHistory = `
      query getBookingHistory(
        $status:ServiceStatus
        $pagination:GqlPaginationInput!
      ) {
        getBookingHistory(
          args:{
            status:$status
            pagination:$pagination
          }
        ){
          id
        }
      }
    `;

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
        }
    `;

    let lastMonthServiceDate = new Date(2022, 9, 5);
    let currMonthServiceDate = new Date(2022, 10, 5);
    let nextMonthServiceDate = new Date(2022, 11, 5);
    let currDayServiceDate = new Date(2022, 10, 15);
    let currWeekServiceDate = new Date(2022, 10, 17);
    let currMonthSearchDate = new Date(2022, 10, 15);

    beforeEach(async () => {
      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.id,
          checkin: currMonthServiceDate,
          status: 'continuing',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.id,
          checkin: lastMonthServiceDate,
          status: 'continuing',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.id,
          checkin: nextMonthServiceDate,
          status: 'continuing',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.id,
          checkin: currDayServiceDate,
          status: 'continuing',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.id,
          checkin: currWeekServiceDate,
          status: 'continuing',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.shopId,
          checkin: currWeekServiceDate,
          status: 'completed',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.shopId,
          checkin: currWeekServiceDate,
          status: 'completed',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.shopId,
          checkin: currWeekServiceDate,
          status: 'restitute',
        },
      });

      await prisma.bookedService.create({
        data: {
          ...hotelInput,
          type: 'hotel',
          ownerId: mockBuyer.id,
          providerId: mockSeller.shopId,
          checkin: currWeekServiceDate,
          status: 'canceled',
        },
      });
    });

    it('within a week, a month, or within a day', async () => {
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

    it('by status', async () => {
      let res = await reqGql(
        getBookingHistory,
        {
          pagination: {
            page: 1,
            take: 10,
          },
        } as GetBookingsHistoryInput,
        mockBuyer,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(res.body.data.getBookingHistory).toHaveLength(9);

      res = await reqGql(
        getBookingHistory,
        {
          pagination: {
            page: 1,
            take: 10,
          },
          status: 'continuing',
        } as GetBookingsHistoryInput,
        mockBuyer,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(res.body.data.getBookingHistory).toHaveLength(5);

      res = await reqGql(
        getBookingHistory,
        {
          pagination: {
            page: 1,
            take: 10,
          },
          status: 'completed',
        } as GetBookingsHistoryInput,
        mockBuyer,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(res.body.data.getBookingHistory).toHaveLength(2);

      res = await reqGql(
        getBookingHistory,
        {
          pagination: {
            page: 1,
            take: 10,
          },
          status: 'canceled',
        } as GetBookingsHistoryInput,
        mockBuyer,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(res.body.data.getBookingHistory).toHaveLength(1);

      res = await reqGql(
        getBookingHistory,
        {
          pagination: {
            page: 1,
            take: 10,
          },
          status: 'restitute',
        } as GetBookingsHistoryInput,
        mockBuyer,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(res.body.data.getBookingHistory).toHaveLength(1);
    });
  });

  describe('should accept and decline appointment', () => {
    const acceptAppointmentMutation = `
      mutation accept(
        $id:ID!
      ){
        acceptAppointment(
          id:$id
        )
      }
    `;

    const declineAppointmentMutation = `
      mutation decline(
        $id:ID!
        $reason:String!
      ){
        declineAppointment(
          args:{
            id:$id
            reason:$reason
          }
        )
      }
    `;
    let appointment: BookedService;
    beforeEach(async () => {
      appointment = await prisma.bookedService.create({
        data: {
          ...hotelInput,
          checkin: new Date(),
          providerId: mockSeller.id,
          type: 'hotel',
          ownerId: mockBuyer.id,
        },
      });
    });

    it('should accept appointment', async () => {
      let res = await reqGql(
        acceptAppointmentMutation,
        { id: appointment.id },
        secendMockedUser,
      );

      expect(res.body.errors).toBeDefined();

      let app = await prisma.bookedService.findUnique({
        where: {
          id: appointment.id,
        },
      });

      expect(app.status).toBe(bookedServiceStatus.pending);

      res = await reqGql(
        acceptAppointmentMutation,
        { id: appointment.id },
        mockSeller,
      );

      expect(res.body.errors).not.toBeDefined();

      app = await prisma.bookedService.findUnique({
        where: {
          id: appointment.id,
        },
      });

      expect(app.status).toBe(bookedServiceStatus.continuing);
    });

    it('should decline appointment', async () => {
      let res = await reqGql(
        declineAppointmentMutation,
        { id: appointment.id, reason: 'test decline reason' },
        secendMockedUser,
      );

      expect(res.body.errors).toBeDefined();

      let app = await prisma.bookedService.findUnique({
        where: {
          id: appointment.id,
        },
      });

      expect(app.status).toBe(bookedServiceStatus.pending);
      expect(app.rejectReason).toBeNull();

      res = await reqGql(
        declineAppointmentMutation,
        { id: appointment.id, reason: 'test decline reason' },
        mockSeller,
      );

      expect(res.body.errors).not.toBeDefined();

      app = await prisma.bookedService.findUnique({
        where: {
          id: appointment.id,
        },
      });

      expect(app.status).toBe(bookedServiceStatus.canceled);
      expect(app.rejectReason).toBe('test decline reason');
    });
  });
});
