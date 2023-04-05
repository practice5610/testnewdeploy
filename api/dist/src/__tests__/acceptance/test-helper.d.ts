import { Client } from '@loopback/testlab';
import { BoomPlatformApiApplication } from '../..';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: BoomPlatformApiApplication;
    client: Client;
}
