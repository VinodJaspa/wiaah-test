import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartResolver } from './shopping-cart.resolver';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartResolver', () => {
  let resolver: ShoppingCartResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCartResolver, ShoppingCartService],
    }).compile();

    resolver = module.get<ShoppingCartResolver>(ShoppingCartResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
