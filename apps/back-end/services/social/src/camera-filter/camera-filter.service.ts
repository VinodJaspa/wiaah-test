import { Injectable } from '@nestjs/common';
import { CameraFilter } from './entities/camera-filter.entity';
import { CameraFilter as PrismaCameraFilter } from 'prismaClient';
import { UserPreferedLang, getTranslatedResource } from 'nest-utils';

@Injectable()
export class CameraFilterService {
  formatFilter(
    filter: PrismaCameraFilter,
    langId: UserPreferedLang,
  ): CameraFilter {
    return {
      ...filter,
      name: getTranslatedResource({ langId, resource: filter.name }),
    };
  }
}
