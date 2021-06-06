import { AccountInfo, PublicKey } from '@solana/web3.js';

export interface ParsedAccountBase {
    pubkey: PublicKey;
    account: AccountInfo<Buffer>;
    info: any;
}
