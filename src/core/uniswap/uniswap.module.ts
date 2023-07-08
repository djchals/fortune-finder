import { Module } from '@nestjs/common';
import { CheckLpPriceProvider } from './providers/check-lp-price.provider';
import { AlarmsModule } from '../alarms/alarms.module';

@Module({
  imports: [AlarmsModule],
  providers: [CheckLpPriceProvider],
  exports: [CheckLpPriceProvider]
})
export class UniswapModule {}
