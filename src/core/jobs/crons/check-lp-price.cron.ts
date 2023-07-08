import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckLpPriceProvider } from '../../uniswap/providers/check-lp-price.provider';

@Injectable()
export class CheckLpPriceCron {
    constructor(private readonly checkLpPriceProvider: CheckLpPriceProvider) {}
  
    @Cron(CronExpression.EVERY_MINUTE)
    public async execute() {
        await this.checkLpPriceProvider.execute();
    }
}
