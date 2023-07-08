import { Logger, Module } from '@nestjs/common';
import { UniswapModule } from '../uniswap/uniswap.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { CheckLpPriceCron } from './crons/check-lp-price.cron';
import { WhaleFinderCron } from './crons/whale-finder.cron';

@Module({
    imports: [
        UniswapModule, 
        BlockchainModule
    ],
    providers: [
        CheckLpPriceCron, 
        WhaleFinderCron
    ],
})
export class JobsModule {
    private readonly logger = new Logger(JobsModule.name);

    constructor(
        private readonly checkLpPriceCron: CheckLpPriceCron,
        private readonly whaleFinderCron: WhaleFinderCron
        
    ) {}

    public async firstTimeInit(): Promise<void> {
        this.logger.debug('Starting one time init jobs...');
    
        // INIT SCRIPTS
        await this.checkLpPriceCron.execute();
        await this.whaleFinderCron.execute();
      }
}
