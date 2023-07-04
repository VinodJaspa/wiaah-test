import { Injectable } from '@nestjs/common';
import { CreateCameraFilterInput } from './dto/create-camera-filter.input';
import { UpdateCameraFilterInput } from './dto/update-camera-filter.input';

@Injectable()
export class CameraFilterService {
  create(createCameraFilterInput: CreateCameraFilterInput) {
    return 'This action adds a new cameraFilter';
  }

  findAll() {
    return `This action returns all cameraFilter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cameraFilter`;
  }

  update(id: number, updateCameraFilterInput: UpdateCameraFilterInput) {
    return `This action updates a #${id} cameraFilter`;
  }

  remove(id: number) {
    return `This action removes a #${id} cameraFilter`;
  }
}
