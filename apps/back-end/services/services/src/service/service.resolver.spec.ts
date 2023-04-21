import { Test, TestingModule } from '@nestjs/testing';
import { ServiceResolver } from './service.resolver';
import { ServiceModule } from './service.module';
import { kafkaModule } from '@kafka-module';
import { PrismaService } from 'prismaService';
import { ObjectId } from 'mongodb';
import { Service } from 'prismaClient';
import { BadRequestException } from '@nestjs/common';

describe('ServiceResolver', () => {
  let resolver: ServiceResolver;
  let prisma: PrismaService;
  let service1: Service;
  let service2: Service;
  let service3: Service;
  let service4: Service;
  const sellerId = new ObjectId().toHexString();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceModule, kafkaModule],
      providers: [PrismaService],
    }).compile();

    resolver = module.get<ServiceResolver>(ServiceResolver);
    prisma = module.get<PrismaService>(PrismaService);

    service1 = await prisma.service.create({
      data: {
        type: 'hotel',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 45,
        sellerId,
        thumbnail: '',
        vat: 13,
      },
    });

    service2 = await prisma.service.create({
      data: {
        type: 'hotel',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 54,
        sellerId,
        thumbnail: '',
        vat: 13,
      },
    });

    service3 = await prisma.service.create({
      data: {
        type: 'hotel',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 60,
        sellerId,
        thumbnail: '',
        vat: 13,
      },
    });

    service4 = await prisma.service.create({
      data: {
        type: 'hotel',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });
  });

  it('should return the right cost details if the services has daily prices', async () => {
    const res = await resolver.getBookingCost(
      {
        checkinDate: new Date().toString(),
        extrasIds: [],
        servicesIds: [service4.id],
        checkoutDate: new Date(
          new Date().setDate(new Date().getDate() + 7),
        ).toString(),
      },
      'en',
    );

    const expectedSubTotal = 80 * 6 + 150 - 30;
    const expectedVat = expectedSubTotal * 0.13;
    const expectedTotal = expectedSubTotal + expectedVat;

    expect(res.subTotal).toBe(expectedSubTotal);
    expect(res.vatAmount).toBe(expectedVat);
    expect(res.total).toBe(expectedTotal);
  });

  it('should throw an error if the requested services ids is more than 1 and has a non multiple services (eg, hotel, holiday rentals, doctors, vehicle)', async () => {
    const hotel = await prisma.service.create({
      data: {
        type: 'hotel',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const holiday = await prisma.service.create({
      data: {
        type: 'holiday_rentals',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const doctor = await prisma.service.create({
      data: {
        type: 'health_center',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const vehicle = await prisma.service.create({
      data: {
        type: 'vehicle',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    let testCount = 0;

    await Promise.all(
      [hotel, holiday, vehicle, doctor].map(async () => {
        let tested = false;
        try {
          const res = await resolver.getBookingCost(
            {
              checkinDate: new Date().toString(),
              extrasIds: [],
              servicesIds: [service4.id, service1.id],
              checkoutDate: new Date(
                new Date().setDate(new Date().getDate() + 7),
              ).toString(),
            },
            'en',
          );
        } catch (error) {
          expect(error instanceof BadRequestException).toBe(true);
          tested = true;
        }

        if (tested) {
          testCount += 1;
        }
        expect(tested).toBe(true);
      }),
    );

    expect(testCount).toBe(4);
  });

  it('should calcualte the cost details of multiple services (restaurant, treatments)', async () => {
    const dish1 = await prisma.service.create({
      data: {
        type: 'restaurant',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 15,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 20,
            th: 10,
          },
        },
      },
    });

    const dish2 = await prisma.service.create({
      data: {
        type: 'restaurant',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 25,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 30,
            th: 20,
          },
        },
      },
    });

    const treat1 = await prisma.service.create({
      data: {
        type: 'beauty_center',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const treat2 = await prisma.service.create({
      data: {
        type: 'beauty_center',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const checkinDate = new Date(2022, 9, 0).toString();

    const res = await resolver.getBookingCost(
      {
        checkinDate,
        extrasIds: [],
        servicesIds: [dish1.id, dish2.id],
        checkoutDate: new Date(
          new Date().setDate(new Date().getDate() + 7),
        ).toString(),
      },
      'en',
    );

    const expectedSubTotal = 20 + 30;
    const expectedVat = expectedSubTotal * 0.13;
    const expectedTotal = expectedSubTotal + expectedVat;

    expect(res.subTotal).toBe(expectedSubTotal);
    expect(res.vatAmount).toBe(expectedVat);
    expect(res.total).toBe(expectedTotal);
  });

  it('should omit any services that their services type or their sellerIds doesnt match with the first service', async () => {
    const dish1 = await prisma.service.create({
      data: {
        type: 'restaurant',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 15,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 20,
            th: 10,
          },
        },
      },
    });

    const dish2 = await prisma.service.create({
      data: {
        type: 'restaurant',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 25,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 30,
            th: 20,
          },
        },
      },
    });

    const treat1 = await prisma.service.create({
      data: {
        type: 'beauty_center',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const treat2 = await prisma.service.create({
      data: {
        type: 'beauty_center',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const checkinDate = new Date(2022, 9, 0).toString();

    const res = await resolver.getBookingCost(
      {
        checkinDate,
        extrasIds: [],
        servicesIds: [dish1.id, treat1.id],
        checkoutDate: new Date(
          new Date().setDate(new Date().getDate() + 7),
        ).toString(),
      },
      'en',
    );

    const expectedSubTotal = 20;
    const expectedVat = expectedSubTotal * 0.13;
    const expectedTotal = expectedSubTotal + expectedVat;

    expect(res.subTotal).toBe(expectedSubTotal);
    expect(res.vatAmount).toBe(expectedVat);
    expect(res.total).toBe(expectedTotal);
  });

  it('should return the services cost with the services data and the quantity', async () => {
    const dish1 = await prisma.service.create({
      data: {
        type: 'restaurant',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 15,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 20,
            th: 10,
          },
        },
      },
    });

    const treat1 = await prisma.service.create({
      data: {
        type: 'beauty_center',
        cancelable: true,
        cancelationPolicy: 'strict',
        price: 80,
        sellerId,
        thumbnail: '',
        vat: 13,
        dailyPrice: true,
        dailyPrices: {
          set: {
            sa: 150,
            th: 50,
          },
        },
      },
    });

    const checkinDate = new Date(2022, 9, 0).toString();

    const res = await resolver.getBookingCost(
      {
        checkinDate,
        extrasIds: [],
        servicesIds: [dish1.id, dish1.id],
        checkoutDate: new Date(
          new Date().setDate(new Date().getDate() + 7),
        ).toString(),
      },
      'en',
    );

    const expectedSubTotal = 40;
    const expectedVat = expectedSubTotal * 0.13;
    const expectedTotal = expectedSubTotal + expectedVat;

    expect(res.subTotal).toBe(expectedSubTotal);
    expect(res.vatAmount).toBe(expectedVat);
    expect(res.total).toBe(expectedTotal);
    expect(res.services).toHaveLength(1);
    expect(res.services.at(0).qty).toBe(2);
    expect(res.services.at(0).service.id).toBe(dish1.id);
  });
});
