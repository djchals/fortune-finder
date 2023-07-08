import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { AlarmProvider } from '../../alarms/providers/alarm.provider';

@Injectable()
export class CheckLpPriceProvider {
    private readonly logger = new Logger('CheckLpPriceProvider');
    private client: any;
    private readonly queryPool = "query getTickUSD($poolAddress: String) {\
        pool(id: $poolAddress) {\
            tick\
        }\
    }";
    
    constructor(
        private readonly alarmProvider: AlarmProvider
    ) {
        this.client = new GraphQLClient(process.env.CHECK_LP_SUBGRAPH);
    }

    public async gettickUSD(): Promise<number> {
        const responsePool = await this.client.request(this.queryPool, {
            poolAddress: process.env.CHECK_LP_POOLADDRESS
        })
        .then((data: any) => data)
        .catch((e: any) => {
            this.logger.error(e);
        });
        return parseFloat(responsePool?.pool?.tick || "0")
    } 
    
    public async execute(): Promise<void> {
        const tickUpper: number = parseInt(process.env.CHECK_LP_TICK_UPPER);
        const tickLower: number = parseInt(process.env.CHECK_LP_TICK_LOWER);
        const tickUSD: number = (await this.gettickUSD().catch(e => console.log(e))) || 0;
        const dateTime: string = new Date().toLocaleString('es-ES');
    
        if(tickUSD === 0) {
            this.logger.error(dateTime + " Cannot connect to thegraph.com");
        }else if(tickUSD < tickLower) {
            this.logger.warn(dateTime + " MAX LIMIT OVERPASSED " + tickLower + "! Actual Tick: " + tickUSD);
            this.alarmProvider.emit(1);
        }else if(tickUSD > tickUpper) {
            this.logger.warn(dateTime + " MIN LIMIT OVERPASSED " + tickUpper + "! Actual Tick: " + tickUSD);
            this.alarmProvider.emit(1);
        }else{
            this.logger.debug(dateTime + " Actual Tick: " + tickUSD + " / Allower range: " + tickLower + " | " + tickUpper);
        }
    }
}
