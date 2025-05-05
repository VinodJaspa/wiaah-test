import { BeautyCenterStatus } from '@beauty-center/const';

export class UpdateBeautyCenterStatusCommand {
  constructor(
    public id: string,
    public status: BeautyCenterStatus,
  ) {}
}
