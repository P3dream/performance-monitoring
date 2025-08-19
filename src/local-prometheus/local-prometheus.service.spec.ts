import { Test, TestingModule } from '@nestjs/testing';
import { LocalPrometheusService } from './local-prometheus.service';

describe('LocalPrometheusService', () => {
  let service: LocalPrometheusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalPrometheusService],
    }).compile();

    service = module.get<LocalPrometheusService>(LocalPrometheusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
