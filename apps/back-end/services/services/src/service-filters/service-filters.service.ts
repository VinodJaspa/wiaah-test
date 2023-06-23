import { Injectable } from '@nestjs/common';
import { CreateServiceFilterInput } from './dto/create-service-filter.input';
import { UpdateServiceFilterInput } from './dto/update-service-filter.input';

@Injectable()
export class ServiceFiltersService {
  create(createServiceFilterInput: CreateServiceFilterInput) {
    return 'This action adds a new serviceFilter';
  }

  findAll() {
    return `This action returns all serviceFilters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceFilter`;
  }

  update(id: number, updateServiceFilterInput: UpdateServiceFilterInput) {
    return `This action updates a #${id} serviceFilter`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceFilter`;
  }
}
