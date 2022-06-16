import { InputType } from '@nestjs/graphql';
import { CreateRegisterationDto } from './create-registartion.dto';

@InputType()
export class UpdateRegisterationDto extends CreateRegisterationDto {}
