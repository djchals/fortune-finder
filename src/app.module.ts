import { Module } from '@nestjs/common';

import { UniswapModule } from './core/uniswap/uniswap.module';
import { BlockchainModule } from './core/blockchain/blockchain.module';
import { JobsModule } from './core/jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AlarmsModule } from './core/alarms/alarms.module';

@Module({
  imports: [
    BlockchainModule, 
    JobsModule,
    UniswapModule, 
    ScheduleModule.forRoot(), AlarmsModule,
  ]
})
export class AppModule {}
