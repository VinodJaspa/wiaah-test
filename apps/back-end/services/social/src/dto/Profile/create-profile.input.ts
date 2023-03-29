import { InputType, Field } from '@nestjs/graphql';
import { ProfileReachedGender, ProfileVisibility } from 'prismaClient';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function MaxWords(
  maxWords: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MaxWords',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxWords],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [maxWords] = args.constraints;
          const words = value.replace(/[-_]/g, ' ').split(' ');
          return words.length < maxWords;
        },
      },
    });
  };
}

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  photo: string;

  @MaxWords(100)
  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String)
  profession: string;

  @Field(() => ProfileVisibility, { nullable: true })
  visibility?: ProfileVisibility;

  @Field(() => String)
  username: string;

  @Field(() => ProfileReachedGender)
  gender: ProfileReachedGender;
}
