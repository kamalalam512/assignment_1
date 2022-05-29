import { Test, TestingModule } from '@nestjs/testing';
import { ArtistProfileService } from './artist-profile.service';

describe('ArtistProfileService', () => {
  let service: ArtistProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistProfileService],
    }).compile();

    service = module.get<ArtistProfileService>(ArtistProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
