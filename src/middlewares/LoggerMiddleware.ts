import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Logger');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();
    const logger = this.logger;

    res.on('finish', () => {
      const { statusCode } = res;
      const delay = Date.now() - start;

      const baseMessage = `${method} ${originalUrl} - ${statusCode} - ${delay}ms`;

      if (statusCode >= 400) {
        logger.error(chalk.red(baseMessage));
      } else {
        logger.log(chalk.green(baseMessage));
      }
    });

    next();
  }
}
