import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class LocalPrometheusService {
    private readonly register: client.Registry;
    private readonly requestCounter: client.Counter;
    private readonly requestDuration: client.Histogram;

    constructor(){
        this.register = new client.Registry();
        client.collectDefaultMetrics({ register: this.register });
 
        this.requestDuration = new client.Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests',
            labelNames: ['method', 'route', 'status_code'],
            registers: [this.register],
        });

        this.requestCounter = new client.Counter({
            name: 'http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'route', 'status_code'],
            registers: [this.register],
        });
    }
    
    incrementRequestCounter = (method: string, route: string, statusCode: string) => {
        this.requestCounter.labels(method, route, statusCode).inc();
    };

    observeRequestDuration = (method: string, route: string, statusCode: string, duration: number) => {
        this.requestDuration.labels(method, route, statusCode).observe(duration);
    };

    async getMetrics(): Promise<string>{
        return this.register.metrics();
    }

}
