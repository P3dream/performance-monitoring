import { Module } from '@nestjs/common';
import { LocalPrometheusService } from './local-prometheus.service';
import { LocalPrometheusController } from './local-prometheus.controller';

@Module({
  controllers: [LocalPrometheusController],
  providers: [LocalPrometheusService],
  exports: [LocalPrometheusService]
})
export class LocalPrometheusModule {}
