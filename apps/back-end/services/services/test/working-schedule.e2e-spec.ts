import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UpdateWorkingScheduleInput } from '@working-schedule/dto';
import { ServiceWorkingSchedule } from '@working-schedule/entities';
import {
  accountType,
  AuthorizationDecodedUser,
  mockedUser,
  requestGraphql,
  secendMockedUser,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';

import { AppModule } from '../src/app.module';

const mockSeller = { ...mockedUser, accountType: accountType.SELLER };
const mockBuyer = { ...secendMockedUser, accountType: accountType.BUYER };

// jest.useFakeTimers().setSystemTime(new Date(2022, 8, 15, 13));

describe('first', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should get my working hours', async () => {
    const getWorkingHoursQuery = `
        query {
            getMyWorkingSchedule {
                id
                weekdays {
                  mo {
                    periods
                  }
                  tu {
                    periods
                  }
                  we {
                    periods
                  }
                  th {
                    periods
                  }
                  fr {
                    periods
                  }
                  sa {
                    periods
                  }
                  su {
                    periods
                  }
                }
            }
        }
        `;

    let res = await reqGql(getWorkingHoursQuery, {}, mockBuyer);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(getWorkingHoursQuery, {}, mockSeller);

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getMyWorkingSchedule).toStrictEqual({
      id: mockSeller.id,
      weekdays: {
        fr: null,
        mo: null,
        sa: null,
        su: null,
        th: null,
        tu: null,
        we: null,
      },
    } as ServiceWorkingSchedule);
  });

  it('should update working schedule', async () => {
    const created = await prisma.serviceWorkingSchedule.create({
      data: {
        id: mockSeller.id,
      },
    });

    const updateWorkingHoursMutation = `
      mutation update(
        $weekdays:UpdateWeekdaysWorkingHoursInput!
        $specialDays:[SpecialDayWorkingHoursInput!]!
      ){
        updateMyWorkingSchedule(
          args:{
            weekdays:$weekdays
            specialDays:$specialDays
          }
        ){
          id
          weekdays {
            mo {
              periods
            }
            tu {
              periods
            }
            we {
              periods
            }
            th {
              periods
            }
            fr {
              periods
            }
            sa {
              periods
            }
            su {
              periods
            }
          }
        }
      }
    `;

    const updateInput = {
      weekdays: {
        mo: {
          periods: [new Date().toISOString(), new Date().toISOString()],
        },
      },
      specialDays: [],
    } as UpdateWorkingScheduleInput;

    let res = await reqGql(updateWorkingHoursMutation, updateInput, mockBuyer);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(updateWorkingHoursMutation, updateInput, mockSeller);

    expect(res.body.errors).not.toBeDefined();
  });

  it('should reslove reference', async () => {
    const created = await prisma.serviceWorkingSchedule.create({
      data: {
        id: mockSeller.id,
      },
    });

    const mockScheduleId = created.id;
    const resloveRef = `
    query GetEntities($representations: [_Any!]!) {
      _entities(representations: $representations) {
        ... on WorkingSchedule {
          id
        }
      }
    }
    `;

    const res = await reqGql(
      resloveRef,
      {
        representations: [
          { __typename: 'WorkingSchedule', id: mockScheduleId },
        ],
      },
      mockedUser,
    );
    console.log(JSON.stringify(res, null, 2));
    expect(res.body.errors).not.toBeDefined();
  });
});
