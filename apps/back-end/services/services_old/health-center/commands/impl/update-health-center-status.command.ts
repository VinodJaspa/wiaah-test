import { HealthCenterStatus } from '@health-center/const';

export class UpdateHealthCenterCommand {
  constructor(
    public readonly id: string,
    public readonly status: HealthCenterStatus,
  ) {}
}
