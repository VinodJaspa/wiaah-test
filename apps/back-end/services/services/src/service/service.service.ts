import { Injectable } from '@nestjs/common';
import { ServiceType } from 'prismaClient';
import { HotelService } from '../hotel';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor() {}
  async getServiceByIdAndType(id: string, type: ServiceType): Promise<Service> {
    return null;
  }
}
