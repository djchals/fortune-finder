import { Module } from '@nestjs/common';
import { AlarmProvider } from './providers/alarm.provider';

@Module({
  providers: [AlarmProvider],
  exports: [AlarmProvider],
})
export class AlarmsModule {}
