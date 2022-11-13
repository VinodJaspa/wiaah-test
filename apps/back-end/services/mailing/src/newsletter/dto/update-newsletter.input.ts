import { NewsletterInput } from './create-newsletter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNewsletterInput extends PartialType(NewsletterInput) {}
