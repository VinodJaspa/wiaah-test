import {
  TreatmentCategoryResolver,
  TreatmentCategoryService,
  CreateBeautyCenterTreatmentCategoryInput,
} from '@beauty-center';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prismaService';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { mockedUser, testTranslation } from 'nest-utils';
import { UpdateTreatmentCategoriesInput } from './dto/update-treatment-categories.input';
import { BeautyCenterTreatmentCategory } from 'prismaClient';

const moduleMocker = new ModuleMocker(global);

describe('Treatment Category tests', () => {
  let resolver: TreatmentCategoryResolver;
  let service: TreatmentCategoryService;
  let prisma: PrismaService;

  const createInput: CreateBeautyCenterTreatmentCategoryInput = {
    title: [
      {
        langId: 'en',
        value: 'en title',
      },
      {
        langId: 'es',
        value: 'es title',
      },
      {
        langId: 'fr',
        value: 'fr title',
      },
    ],
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TreatmentCategoryResolver,
        TreatmentCategoryService,
        PrismaService,
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
        if (token === `LANG_ID`) {
          return 'en';
        }
      })
      .compile();

    resolver = moduleRef.get(TreatmentCategoryResolver);
    service = moduleRef.get(TreatmentCategoryService);
    prisma = moduleRef.get(PrismaService);
  });

  it('should create treatmentCategory', async () => {
    const created = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );
    expect((await prisma.beautyCenterTreatmentCategory.findMany()).length).toBe(
      1,
    );
    expect(
      (await prisma.beautyCenterTreatmentCategory.findMany()).at(0).id,
    ).toBe(created.id);
    expect(
      (await prisma.beautyCenterTreatmentCategory.findMany()).at(0).createdById,
    ).toBe(mockedUser.id);

    await testTranslation(
      service,
      async () => {
        return (await resolver.getBeautyCenterTreatmentCategories(undefined))[0]
          .title;
      },
      createInput.title,
    );
  });

  it('should get only services with the given ids', async () => {
    const ids: string[] = [];
    const leng = [...Array(10)].map((_, i) => i);

    for (const idx of leng) {
      const service = await resolver.createBeautyCenterTreatmentCategory(
        createInput,
        mockedUser,
        undefined,
      );

      if (idx % 2 === 0) {
        ids.push(service.id);
      }
    }

    expect(ids.length).toBe(5);

    const services = await resolver.getBeautyCenterTreatmentCategoriesByIds(
      ids,
      undefined,
    );

    expect(services.every((v) => ids.includes(v.id))).toBe(true);
  });

  it('should get all services', async () => {
    const ids: string[] = [];
    const leng = [...Array(10)].map((_, i) => i);

    for (const idx of leng) {
      const service = await resolver.createBeautyCenterTreatmentCategory(
        createInput,
        mockedUser,
        undefined,
      );

      ids.push(service.id);
    }

    expect(ids.length).toBe(10);

    const services =
      await resolver.getBeautyCenterTreatmentCategories(undefined);

    expect(services.every((v) => ids.includes(v.id))).toBe(true);
  });

  it('should delete a single category', async () => {
    const service1 = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );
    const service2 = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );

    expect((await prisma.beautyCenterTreatmentCategory.findMany()).length).toBe(
      2,
    );

    await resolver.deleteBeautyCenter(
      { id: service1.id },
      mockedUser,
      undefined,
    );

    expect((await prisma.beautyCenterTreatmentCategory.findMany()).length).toBe(
      1,
    );
    expect(
      (await prisma.beautyCenterTreatmentCategory.findMany()).at(0).id,
    ).toBe(service2.id);
  });

  it('should delete many categories', async () => {
    const service1 = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );
    const service2 = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );
    const service3 = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );

    expect((await prisma.beautyCenterTreatmentCategory.findMany()).length).toBe(
      3,
    );

    await resolver.deleteBeautyCenterServices(
      { ids: [service1.id, service3.id] },
      mockedUser,
      undefined,
    );

    expect((await prisma.beautyCenterTreatmentCategory.findMany()).length).toBe(
      1,
    );
    expect(
      (await prisma.beautyCenterTreatmentCategory.findMany()).at(0).id,
    ).toBe(service2.id);
  });

  it('should update categories', async () => {
    const service1 = await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );
    await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );
    await resolver.createBeautyCenterTreatmentCategory(
      createInput,
      mockedUser,
      undefined,
    );

    const updateInput: UpdateTreatmentCategoriesInput = {
      ids: [service1.id],
      title: [
        {
          langId: 'en',
          value: 'en updated',
        },
      ],
    };

    await resolver.updateTreatmentCategories(updateInput, mockedUser);

    const updatedService =
      await prisma.beautyCenterTreatmentCategory.findUnique({
        where: {
          id: service1.id,
        },
      });

    expect(updatedService).toMatchObject<
      Partial<BeautyCenterTreatmentCategory>
    >({
      createdById: mockedUser.id,
      id: updateInput.ids[0],
      title: updateInput.title,
    });
  });
});
