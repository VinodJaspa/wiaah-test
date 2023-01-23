import { GetTopHashtagsInput } from '../../dto';

export class GetAllHashtagsQuery {
  constructor(public readonly input: GetTopHashtagsInput) {}
}
