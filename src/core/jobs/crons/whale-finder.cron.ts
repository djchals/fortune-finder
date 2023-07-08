import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WhaleFinderProvider } from '../../blockchain/providers/whale-finder.provider';

@Injectable()
export class WhaleFinderCron {
    constructor(private readonly whaleFinderProvider: WhaleFinderProvider) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async execute() {
        await this.whaleFinderProvider.execute();
    }
}
