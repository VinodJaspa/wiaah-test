import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOwnershipModule } from '@service-ownership';
import {
  ErrorHandlingService,
  LANG_ID,
  mockedUser,
  secendMockedUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ErrorMessages } from '@utils';
import {
  CreateHealthCenterInput,
  CreateHealthCenterSpecialityInput,
} from '../../dto';
import { HealthCenterResolver } from '../../health-center.resolver';
import { HealthCenterService } from '../../health-center.service';

describe('HealthCenterResolver', () => {
  let resolver: HealthCenterResolver;
  let service: HealthCenterService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceOwnershipModule],
      providers: [
        HealthCenterResolver,
        HealthCenterService,
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

    resolver = module.get<HealthCenterResolver>(HealthCenterResolver);
    service = module.get<HealthCenterService>(HealthCenterService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // speciality system testing
  describe('Health Center Speciality system', () => {
    let input: CreateHealthCenterSpecialityInput = {
      description: [
        {
          langId: 'en',
          value: 'en spec',
        },
        {
          langId: 'es',
          value: 'es spec',
        },
        {
          langId: 'fr',
          value: 'fr spec',
        },
      ],
      name: [
        {
          langId: 'en',
          value: 'en name',
        },
        {
          langId: 'fr',
          value: 'fr name',
        },
        {
          langId: 'es',
          value: 'es name',
        },
      ],
    };

    it('should create speciality', async () => {
      let specs = await prisma.healthCenterSpecialty.findMany();
      expect(specs.length).toBe(0);

      const spec = await resolver.createHealthCenterSpeciality(
        input,
        mockedUser,
      );

      specs = await prisma.healthCenterSpecialty.findMany();

      expect(specs.length).toBe(1);
      expect(specs.at(0)).toEqual(expect.objectContaining(input));
    });
  });

  describe('health center service', () => {
    let input: CreateHealthCenterInput;

    beforeEach(async () => {
      const spec = await resolver.createHealthCenterSpeciality(
        {
          description: [
            { langId: 'en', value: 'en' },
            { langId: 'fr', value: 'fr' },
            { langId: 'es', value: 'es' },
          ],
          name: [
            { langId: 'en', value: 'en' },
            { langId: 'fr', value: 'fr' },
            { langId: 'es', value: 'es' },
          ],
        },
        mockedUser,
      );

      input = {
        vat: 5,
        payment_methods: ['cash', 'check'],
        cancelationPolicies: [
          {
            cost: 5,
            duration: 1,
          },
        ],
        doctors: [
          {
            name: 'doc 1',
            price: 15,
            description: [
              {
                langId: 'en',
                value: 'en',
              },
              {
                langId: 'es',
                value: 'es',
              },
              {
                langId: 'fr',
                value: 'fr',
              },
            ],
            availablityStatus: 'available',
            specialityId: spec.id,
            thumbnail: 'test',
          },
        ],
        policies: [
          {
            langId: 'en',
            value: [{ policyTitle: 'en', terms: ['en'] }],
          },
          {
            langId: 'es',
            value: [{ policyTitle: 'es', terms: ['es'] }],
          },
          {
            langId: 'fr',
            value: [{ policyTitle: 'fr', terms: ['fr'] }],
          },
        ],
        presentations: [
          { src: 'test', type: 'img' },
          { src: 't', type: 'vid' },
        ],
        serviceMetaInfo: [
          {
            langId: 'en',
            value: {
              title: 'en',
              description: 'en',
              hashtags: ['en'],
              metaTagDescription: 'en',
              metaTagKeywords: ['en'],
            },
          },
          {
            langId: 'fr',
            value: {
              title: 'fr',
              description: 'fr',
              hashtags: ['fr'],
              metaTagDescription: 'fr',
              metaTagKeywords: ['fr'],
            },
          },
          {
            langId: 'es',
            value: {
              title: 'es',
              description: 'es',
              hashtags: ['es'],
              metaTagDescription: 'es',
              metaTagKeywords: ['es'],
            },
          },
        ],
      };
    });

    it('should create health center service', async () => {
      const created = await resolver.createHealthCenter(input, mockedUser);

      const healthCenters = await prisma.healthCenterService.findMany({
        include: { doctors: true },
      });

      expect(healthCenters.length).toBe(1);
      expect(healthCenters.at(0).ownerId).toBe(mockedUser.id);

      let tested = false;

      try {
        await resolver.createHealthCenter(input, mockedUser);
      } catch (error) {
        expect(error instanceof ForbiddenException).toBe(true);
        tested = true;
      }

      expect(tested).toBe(true);

      expect(healthCenters.length).toBe(1);
    });

    it('should err if one or more of the given doctors specality ids is wrong', async () => {
      await prisma.healthCenterSpecialty.deleteMany();
      let tested = false;
      try {
        await resolver.createHealthCenter(input, mockedUser);
      } catch (error) {
        expect(error instanceof BadRequestException).toBe(true);
        tested = true;
      }

      expect(tested).toBe(true);
    });

    it('should only get health center if its status is active', async () => {
      const created = await resolver.createHealthCenter(input, mockedUser);

      let tested = false;
      try {
        await resolver.getHealthCenter(created.id, mockedUser);
      } catch (error) {
        expect(error instanceof ForbiddenException).toBe(true);
        tested = true;
      }

      expect(tested).toBe(true);

      await resolver.updateHealthCenter(
        { id: created.id, status: 'active' },
        mockedUser,
      );

      const res = await resolver.getHealthCenter(created.id, mockedUser);

      expect(res.id).toBe(created.id);
    });

    it('should get health center with doctors and their speciality in diff translations', async () => {
      const created = await resolver.createHealthCenter(input, mockedUser);
      await resolver.updateHealthCenter(
        { id: created.id, status: 'active' },
        mockedUser,
      );

      const langs = ['en', 'es', 'fr'];
      const testedLangs: boolean[] = [];

      for (const lang of langs) {
        jest.spyOn(service, 'getLangId').mockReturnValue(lang);
        const s = await resolver.getHealthCenter(created.id, secendMockedUser);
        expect(s.serviceMetaInfo.description).toBe(lang);
        expect(s.serviceMetaInfo.metaTagDescription).toBe(lang);
        expect(s.serviceMetaInfo.metaTagKeywords).toStrictEqual([lang]);
        expect(s.serviceMetaInfo.title).toBe(lang);
        testedLangs.push(true);
      }
      expect(testedLangs.length).toBe(langs.length);
    });
  });
});
