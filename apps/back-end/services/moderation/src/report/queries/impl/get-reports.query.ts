import { GetReportsInput } from '@report/dto';

export class GetReportsQuery {
  constructor(
    public readonly input: GetReportsInput,
    public readonly userId: string,
  ) {}
}
