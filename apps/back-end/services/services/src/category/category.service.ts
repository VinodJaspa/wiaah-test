import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateCategoryInput, userId: string) {
    return this.prisma.serviceCategory.create({
      data: input,
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.serviceCategory.delete({
      where: {
        id,
      },
    });
  }

  update(input: UpdateCategoryInput, userId: string) {
    const { id, ...rest } = input;
    return this.prisma.serviceCategory.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  getCategoryById(id: string, userId: string) {
    return this.prisma.serviceCategory.findUnique({
      where: {
        id,
      },
    });
  }

  getAllCategories() {
    return this.prisma.serviceCategory.findMany();
  }
}
