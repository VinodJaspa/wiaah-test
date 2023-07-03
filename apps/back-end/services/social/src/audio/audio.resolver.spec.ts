import { Test, TestingModule } from '@nestjs/testing';
import { AudioResolver } from './audio.resolver';
import { AudioService } from './audio.service';

describe('AudioResolver', () => {
  let resolver: AudioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioResolver, AudioService],
    }).compile();

    resolver = module.get<AudioResolver>(AudioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
