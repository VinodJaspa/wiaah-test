import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from '@utils';
import {
  ErrorHandlingService,
  LANG_ID,
  mockedUser,
  secendMockedUser,
  testTranslation,
} from 'nest-utils';
import {
  CreateBeautyCenterInput,
  BeautyCenter,
  UpdateBeautyCenterInput,
  TreatmentCategoryResolver,
  TreatmentCategoryService,
  BeautyCenterResolver,
  BeautyCenterService,
} from '@beauty-center';
import { PrismaService } from 'prismaService';
import { ObjectId } from 'mongodb';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ServiceOwnershipModule } from '@service-ownership';

describe('BeautyCenterResolver', () => {
  let resolver: BeautyCenterResolver;
  let service: BeautyCenterService;
  let prisma: PrismaService;
  let input: CreateBeautyCenterInput = {
    beauty_center_typeId: new ObjectId().toString(),
    cancelationPolicies: [{ cost: 4, duration: 5 }],
    payment_methods: ['cash', 'credit_card'],
    location: {
      address: 'address',
      city: 'city',
      country: 'country',
      lat: 13,
      lon: 32,
      postalCode: 2134,
      state: 'state',
    },
    policies: [
      {
        langId: 'en',
        value: [{ policyTitle: 'en title', terms: ['en'] }],
      },
      {
        langId: 'es',
        value: [{ policyTitle: 'es title', terms: ['es'] }],
      },
    ],
    presentations: [
      {
        src: 'test src',
        type: 'img',
      },
    ],
    title: [
      {
        langId: 'en',
        value: 'en t',
      },
    ],
    serviceMetaInfo: [
      {
        langId: 'en',
        value: {
          description: 'en desc',
          hashtags: ['en'],
          metaTagDescription: 'en meta desc',
          metaTagKeywords: ['en'],
          title: 'en t',
        },
      },
    ],
    treatments: [
      {
        price: 15,
        title: [{ langId: 'en', value: 'en treat title' }],
        discount: {
          units: 54,
          value: 13,
        },
        duration: [15, 30],
        treatmentCategoryId: new ObjectId().toString(),
      },
    ],
    type_of_seller: 'individual',
    vat: 15,
  };
  const treatmentCategoryInput = {
    title: [
      {
        langId: 'en',
        value: 'back pain',
      },
    ],
  };

  function createBeautyCenter(): Promise<BeautyCenter> {
    return resolver.createBeautyCenter(input, mockedUser, undefined);
  }

  function createTreatmentCategory() {
    return prisma.beautyCenterTreatmentCategory.create({
      data: {
        ...treatmentCategoryInput,
        createdById: mockedUser.id,
      },
    });
  }

  function updateTreatmentsCategoryId(id: string) {
    input = {
      ...input,
      treatments: input.treatments.map((v) => ({
        ...v,
        treatmentCategoryId: id,
      })),
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceOwnershipModule],
      providers: [
        BeautyCenterResolver,
        TreatmentCategoryResolver,
        TreatmentCategoryService,
        BeautyCenterService,
        PrismaService,
        {
          provide: ErrorHandlingService,
          useValue: {
            getError: (fn: (err: any) => any) => {
              fn(ErrorMessages);
            },
          },
        },
        {
          provide: LANG_ID,
          useValue: 'en',
        },
      ],
    }).compile();

    resolver = module.get(BeautyCenterResolver);
    service = module.get(BeautyCenterService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create beauty center service only if the input data is valid', async () => {
    let invalidTested = false;
    try {
      await createBeautyCenter();
    } catch (error) {
      expect(error instanceof BadRequestException).toBe(true);
      invalidTested = true;
    }

    expect(invalidTested).toBe(true);
    expect((await prisma.beautyCenterService.findMany()).length).toBe(0);

    // valid testing
    const treatment = await createTreatmentCategory();
    updateTreatmentsCategoryId(treatment.id);

    const created = await createBeautyCenter();

    const testTransaltionFn = async (key: keyof typeof created) => {
      await testTranslation(
        service,
        async () =>
          (
            await resolver.getBeautyCenterById(
              created.id,
              mockedUser,
              undefined,
            )
          )[key],
        input[key],
      );
    };

    await testTransaltionFn('policies');
    await testTransaltionFn('title');
    await testTransaltionFn('serviceMetaInfo');

    const center = await resolver.getBeautyCenterById(
      created.id,
      mockedUser,
      undefined,
    );
    for (let idx = 0; idx < center.treatments.length; idx++) {
      const treat = center.treatments[idx];
      const transaltionInput = input.treatments[idx];
      await testTranslation(
        service,
        async () =>
          (
            await resolver.getBeautyCenterById(
              created.id,
              mockedUser,
              undefined,
            )
          ).treatments[idx].title,
        transaltionInput.title,
      );
    }

    const services = await prisma.beautyCenterService.findMany();
    expect(services.length).toBe(1);

    expect(services[0]).toMatchObject({ ...input });
  });

  it('should update beauty center', async () => {
    const treatment = await createTreatmentCategory();
    updateTreatmentsCategoryId(treatment.id);

    const created = await createBeautyCenter();

    expect((await prisma.beautyCenterService.findMany()).length).toBe(1);

    const treatment2 = await createTreatmentCategory();

    const updateInput: UpdateBeautyCenterInput = {
      id: created.id,
      beauty_center_typeId: new ObjectId().toString(),
      cancelationPolicies: [{ cost: 3, duration: 4 }],
      payment_methods: ['cash', 'credit_card'],
      policies: [
        {
          langId: 'en',
          value: [{ policyTitle: 'en t', terms: ['en'] }],
        },
      ],
      presentations: [{ src: 'update src', type: 'vid' }],
      serviceMetaInfo: [
        {
          langId: 'en',
          value: {
            description: 'en desc',
            hashtags: ['en'],
            metaTagDescription: 'en meta desc',
            metaTagKeywords: ['en'],
            title: 'en title',
          },
        },
      ],
      title: [
        {
          langId: 'en',
          value: 'en title',
        },
      ],
      treatments: [
        {
          id: created.treatments.at(0).id,
          discount: {
            units: 5,
            value: 25,
          },
          duration: [15, 35],
          price: 14,
          title: [
            {
              langId: 'en',
              value: 'en title',
            },
          ],
          treatmentCategoryId: treatment2.id,
        },
      ],
    };

    const updated = await resolver.updateBeautyCenter(
      updateInput,
      mockedUser,
      undefined,
    );

    const testTranslationFn = async (key: keyof typeof updated) =>
      await testTranslation(
        service,
        async () => {
          const service = await resolver.getBeautyCenterById(
            created.id,
            mockedUser,
            undefined,
          );
          return service[key];
        },
        updateInput[key],
      );

    await testTranslationFn('serviceMetaInfo');
    await testTranslationFn('title');
    await testTranslationFn('policies');

    const center = await resolver.getBeautyCenterById(
      created.id,
      mockedUser,
      undefined,
    );
    for (let idx = 0; idx < center.treatments.length; idx++) {
      const transaltionInput = updateInput.treatments[idx];
      await testTranslation(
        service,
        async () =>
          (
            await resolver.getBeautyCenterById(
              created.id,
              mockedUser,
              undefined,
            )
          ).treatments[idx].title,
        transaltionInput.title,
      );
    }
  });

  it('should delete beauty center only by its owner', async () => {
    jest
      .spyOn(service as any, 'validateCreateInput')
      .mockImplementation(() => {});
    const center = await createBeautyCenter();
    expect(
      await prisma.beautyCenterService.findUnique({
        where: {
          id: center.id,
        },
      }),
    ).toBeDefined();

    let authTested = false;
    try {
      await resolver.deleteBeautyCenter(center.id, secendMockedUser, undefined);
    } catch (error) {
      expect(error instanceof ForbiddenException).toBe(true);
      authTested = true;
    }

    expect((await prisma.beautyCenterService.findMany()).length).toBe(1);
    expect(authTested).toBe(true);

    await resolver.deleteBeautyCenter(center.id, mockedUser, undefined);

    expect((await prisma.beautyCenterService.findMany()).length).toBe(0);
  });
});
