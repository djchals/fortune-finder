import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { AlarmProvider } from '../../alarms/providers/alarm.provider';

@Injectable()
export class CheckLpPriceProvider {
    private readonly logger = new Logger('CheckLpPriceProvider');
    private readonly subgraphURI: string = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one";
    private readonly poolAddress: string = "0xbb7e7b8c1e5d08286f45878a76667f016e2f8390";
    private readonly lowerTick: number = -72800;
    private readonly upperTick: number = -67800;  
    private client: any;
    private readonly queryPool = "query getTickUSD($poolAddress: String) {\
        pool(id: $poolAddress) {\
            tick\
        }\
    }";
    
    constructor(
        private readonly alarmProvider: AlarmProvider
    ) {
        this.client = new GraphQLClient(this.subgraphURI);
    }

    public async gettickUSD(): Promise<number> {
        const responsePool = await this.client.request(this.queryPool, {
            poolAddress: this.poolAddress
        })
        .then((data: any) => data)
        .catch((e: any) => {
            this.logger.error(e);
        });
        return parseFloat(responsePool?.pool?.tick || "0")
    } 
    
    public async execute(): Promise<void> {
        const tickUSD: number = (await this.gettickUSD().catch(e => console.log(e))) || 0;
        const dateTime: string = new Date().toLocaleString('es-ES');
    
        if(tickUSD === 0) {
            this.logger.error(dateTime + " No se pudo conectar a thegraph.com");
        }else if(tickUSD < this.lowerTick) {
            this.logger.warn(dateTime + " LÍMITE MÍNIMO " + this.lowerTick + " SUPERADO! Tick actual: " + tickUSD);
            this.alarmProvider.emit(1);
        }else if(tickUSD > this.upperTick) {
            this.logger.warn(dateTime + " LÍMITE MÁXIMO " + this.upperTick + " SUPERADO! Tick actual: " + tickUSD);
            this.alarmProvider.emit(1);
        }else{
            this.logger.debug(dateTime + " Tick actual: " + tickUSD + " / Rango permitido: " + this.lowerTick + " | " + this.upperTick);
        }
    }
}
