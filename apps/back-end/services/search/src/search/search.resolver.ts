import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { Search } from './entities/search.entity';
import { SearchInput } from 'nest-dto';

@Resolver(() => Search)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => Search)
  searchWiaah(@Args('searchInputs') inputs: SearchInput): { filter: string } {
    const formatedInputs: Record<string, any>[] = Object.entries(inputs).map(
      ([key, value]) => ({ [key]: value }),
    );
    console.log('formatedInputs', formatedInputs);
    return { filter: JSON.stringify(formatedInputs) };
  }
}
