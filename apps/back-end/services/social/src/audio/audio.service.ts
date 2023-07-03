import { Injectable } from '@nestjs/common';
import { CreateAudioInput } from './dto/create-audio.input';
import { UpdateAudioInput } from './dto/update-audio.input';

@Injectable()
export class AudioService {
  create(createAudioInput: CreateAudioInput) {
    return 'This action adds a new audio';
  }

  findAll() {
    return `This action returns all audio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audio`;
  }

  update(id: number, updateAudioInput: UpdateAudioInput) {
    return `This action updates a #${id} audio`;
  }

  remove(id: number) {
    return `This action removes a #${id} audio`;
  }
}
