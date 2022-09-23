import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileInput: CreateProfileInput, userId: string) {
    const {
      photo,
      profession,
      bio,
      visibility = 'private',
    } = createProfileInput;

    return this.prisma.profile.create({
      data: {
        bio,
        photo,
        profession,
        visibility,
        ownerId: userId,
      },
    });
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
