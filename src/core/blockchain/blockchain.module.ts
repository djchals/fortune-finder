import { Module } from '@nestjs/common';
import { WhaleFinderProvider } from './providers/whale-finder.provider';
import { AlarmsModule } from '../alarms/alarms.module';

@Module({
  imports: [AlarmsModule],
  providers: [WhaleFinderProvider],
  exports: [WhaleFinderProvider]
})
export class BlockchainModule {}
