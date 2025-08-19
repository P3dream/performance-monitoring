import { Controller, Get, Header } from '@nestjs/common';
import { LocalPrometheusService } from './local-prometheus.service';

@Controller('prometheus')
export class LocalPrometheusController {
  constructor(private readonly localPrometheusService: LocalPrometheusService) {}

  @Get()
  @Header('Content-type', 'text/plain')
  async getMetrics() : Promise<string>{
    return await this.localPrometheusService.getMetrics();
  }

  @Get('test')
  async test(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return 'Resposta após 5 segundos';
  }
  
}
