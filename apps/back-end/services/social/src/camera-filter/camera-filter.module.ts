import { Module } from '@nestjs/common';
import { CameraFilterService } from './camera-filter.service';
import { CameraFilterResolver } from './camera-filter.resolver';

@Module({
  providers: [CameraFilterResolver, CameraFilterService],
})
export class CameraFilterModule {}
