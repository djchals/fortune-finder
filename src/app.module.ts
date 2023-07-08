import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UniswapModule } from './core/uniswap/uniswap.module';
import { BlockchainModule } from './core/blockchain/blockchain.module';
import { JobsModule } from './core/jobs/jobs.module';
import { AlarmsModule } from './core/alarms/alarms.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BlockchainModule, 
    JobsModule,
    UniswapModule, 
    ScheduleModule.forRoot(), 
    AlarmsModule,
  ]
})
export class AppModule {}
