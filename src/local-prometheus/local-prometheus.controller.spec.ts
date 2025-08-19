import { Test, TestingModule } from '@nestjs/testing';
import { LocalPrometheusController } from './local-prometheus.controller';
import { LocalPrometheusService } from './local-prometheus.service';

describe('LocalPrometheusController', () => {
  let controller: LocalPrometheusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalPrometheusController],
      providers: [LocalPrometheusService],
    }).compile();

    controller = module.get<LocalPrometheusController>(LocalPrometheusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
