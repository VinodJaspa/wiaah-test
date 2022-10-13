import { Test, TestingModule } from '@nestjs/testing';
import { ShippingSettingsController } from './shipping-settings.controller';

describe('ShippingSettingsController', () => {
  let controller: ShippingSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingSettingsController],
    }).compile();

    controller = module.get<ShippingSettingsController>(
      ShippingSettingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
