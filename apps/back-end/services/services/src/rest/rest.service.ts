import { Injectable } from '@nestjs/common';
import { CreateRestInput } from './dto/create-rest.input';
import { UpdateRestInput } from './dto/update-rest.input';

@Injectable()
export class RestService {
  create(createRestInput: CreateRestInput) {
    return 'This action adds a new rest';
  }

  findAll() {
    return `This action returns all rest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rest`;
  }

  update(id: number, updateRestInput: UpdateRestInput) {
    return `This action updates a #${id} rest`;
  }

  remove(id: number) {
    return `This action removes a #${id} rest`;
  }
}
