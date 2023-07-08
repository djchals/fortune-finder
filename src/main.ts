import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobsModule } from './core/jobs/jobs.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starting init scripts and first time cron jobs
  await app.get(JobsModule).firstTimeInit();
}
bootstrap();
