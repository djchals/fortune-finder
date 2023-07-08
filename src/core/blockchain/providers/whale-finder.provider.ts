import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { AlarmProvider } from '../../alarms/providers/alarm.provider';

@Injectable()
export class WhaleFinderProvider {
    private readonly logger = new Logger('WhaleFindeProvider');
    private readonly minValueEth: number = parseInt(process.env.WHALE_MIN_ETH);
    private readonly provider: ethers.providers.JsonRpcProvider;

    constructor(
        private readonly alarmProvider: AlarmProvider
    ) {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.WHALE_FINDER_RPC);
    }
    
    private getDate(): string {
        const date = new Date();
        return (
            date.getMonth() + 1) 
            + '/' + 
            date.getDate() 
            + '/' +  
            date.getFullYear()
            + ' ' +
            date.getHours() 
            + ':' + 
            date.getMinutes() 
            + ':' + 
            date.getSeconds();
    }
        
    async execute (): Promise<void> {
        const { transactions: txs } = await this.provider.getBlockWithTransactions(undefined);
    
        txs.map((tx: any) => {
            const value: number = parseFloat(ethers.utils.formatEther(tx.value.toString()));
            const txHash: string = tx.hash;
            const from: string = tx.from;
            const blockNumber: number = tx.blockNumber;
            const timestamp: string = this.getDate();
    
            if(value >= this.minValueEth) {
                this.logger.debug("Whale transaction found: ");
                this.logger.debug({
                    timestamp,
                    blockNumber,
                    txHash,
                    from,
                    value
                });
                this.alarmProvider.emit(2);
            }
        });
    }
}
