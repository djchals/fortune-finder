import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobsModule } from './core/jobs/jobs.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port: number = 2500;

  const app = await NestFactory.create(AppModule);

  // Starting init scripts and first time cron jobs
  await app.get(JobsModule).firstTimeInit();

  const logger = new Logger('Main');
  logger.debug('Listening on port ' + port + '...');
  await app.listen(port);
}
bootstrap();
