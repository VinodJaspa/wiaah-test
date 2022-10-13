import { Test, TestingModule } from '@nestjs/testing';
import { ShippingSettingsResolver } from './shipping-settings.resolver';
import { ShippingSettingsService } from './shipping-settings.service';

describe('ShippingSettingsResolver', () => {
  let resolver: ShippingSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingSettingsResolver, ShippingSettingsService],
    }).compile();

    resolver = module.get<ShippingSettingsResolver>(ShippingSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
