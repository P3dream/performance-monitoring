import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LocalPrometheusService } from 'src/local-prometheus/local-prometheus.service';
import { performance } from 'perf_hooks';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly prometheusService: LocalPrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = performance.now();

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const method = req.method;
    const route = req.route?.path;
    
    return next.handle().pipe(
      tap(() => {
        const statusCode = req.res?.statusCode?.toString() || 'unknown';
        const duration = (performance.now() - now) / 1000; // em segundos

        this.prometheusService.incrementRequestCounter(method, route, statusCode);
        this.prometheusService.observeRequestDuration(method, route, statusCode, duration);
      }),
    );
  }
}
