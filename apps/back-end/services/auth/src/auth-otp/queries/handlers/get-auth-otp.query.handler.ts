import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAuthOtpQuery } from '@auth-otp/queries';
import { AuthOtpRepository } from '@auth-otp/repository';
import { AuthOtp } from '@auth-otp/entities';

@QueryHandler(GetAuthOtpQuery)
export class GetAuthOtpQueryHandler implements IQueryHandler<GetAuthOtpQuery> {
  constructor(private readonly repo: AuthOtpRepository) {}

  async execute({ email }: GetAuthOtpQuery): Promise<AuthOtp> {
    const res = await this.repo.getOne(email);
    return res;
  }
}
