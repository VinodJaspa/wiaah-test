import { Injectable } from '@nestjs/common';
import { CreateRequiredActionInput } from './dto/create-required-action.input';
import { UpdateRequiredActionInput } from './dto/update-required-action.input';

@Injectable()
export class RequiredActionsService {
  create(createRequiredActionInput: CreateRequiredActionInput) {
    return 'This action adds a new requiredAction';
  }

  findAll() {
    return `This action returns all requiredActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requiredAction`;
  }

  update(id: number, updateRequiredActionInput: UpdateRequiredActionInput) {
    return `This action updates a #${id} requiredAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} requiredAction`;
  }
}
