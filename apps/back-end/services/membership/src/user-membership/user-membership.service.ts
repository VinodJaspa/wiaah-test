import { Injectable } from '@nestjs/common';
import { CreateUserMembershipInput } from './dto/create-user-membership.input';
import { UpdateUserMembershipInput } from './dto/update-user-membership.input';

@Injectable()
export class UserMembershipService {
  create(createUserMembershipInput: CreateUserMembershipInput) {
    return 'This action adds a new userMembership';
  }

  findAll() {
    return `This action returns all userMembership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMembership`;
  }

  update(id: number, updateUserMembershipInput: UpdateUserMembershipInput) {
    return `This action updates a #${id} userMembership`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMembership`;
  }
}
