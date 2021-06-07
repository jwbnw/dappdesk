import { PublicKey, AccountInfo } from '@solana/web3.js';
import { useState } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { AccountLayout, u64, MintInfo, MintLayout } from '@solana/spl-token';

import { TokenAccount } from '../interfaces/TokenAccount';
import { ParsedAccountBase } from '../interfaces/ParesdAccountBase';
import { TokenDisplay } from '../interfaces/TokenDisplayInfo';
import logger from '../config/logging';

const networks = {
    mainnet: {
        url: 'https://solana-api.projectserum.com',
        displayName: 'Mainnet Beta'
    },
    devnet: { url: clusterApiUrl('devnet'), displayName: 'Devnet' },
    testnet: { url: clusterApiUrl('testnet'), displayName: 'Testnet' }
};

const initalNullData: TokenDisplay = {
    ammount: 0,
    tokenAddress: ''
};

//TODO: Once I get this working put all solana client calls into a new api file.

// so this is pretty hacky.. to the point where this can't see prod..ever
// if we do this in the browser we need to cache but I think we just take this
// serverside from the get go and handle caching there so we don't have to be
// too concerned about the client side caching.. but it works for now
// and this is a hackathon so it can stay..

export default (): [(accountKey: string) => void, TokenDisplay[], string] => {
    const [errorMsg, setErrorMsg] = useState('');

    //NOTE: State is not being used for now.. this will end up changing.
    const [accountPubKey, setAccountKey] = useState('');
    const [userTokenAccounts, setUserTokenAccounts] = useState<TokenAccount[]>(
        []
    );
    const [mintInfo, setMintInfo] = useState<ParsedAccountBase[]>([]);
    const [userTokenInfo, setUserTokenInfo] = useState<TokenDisplay[]>([]);

    const finalUserTokenDataArr: TokenDisplay[] = [];

    const getTokenData = async (accountKey: string) => {
        let TempTokenArr: TokenAccount[] = [];
        let TempMintInfoArr: ParsedAccountBase[] = [];
        try {
            let publicKeyToLookup = new PublicKey(accountKey);

            const solanaNetwork = networks.devnet;
            const connection = new Connection(solanaNetwork.url, 'confirmed');

            const info = await connection.getTokenAccountsByOwner(
                publicKeyToLookup,
                {
                    programId: new PublicKey(
                        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
                    )
                }
            );

            info.value.map((x) => {
                let tokenAccouontBlah = TokenAccountParser(x.pubkey, x.account);
                TempTokenArr.push(tokenAccouontBlah);
            });

            logger.info(TempTokenArr, 'TempArr');

            for (var i = 0; i < TempTokenArr.length; i++) {
                let mintAccountInfo = await getMintInfo(
                    connection,
                    TempTokenArr[i].info.mint
                );
                TempMintInfoArr.push(mintAccountInfo);
            }
        } catch (e) {
            setErrorMsg(e);
        }

        let tokenMint;
        let ammount;
        let decimals;

        //this needs to be refactored but works for now.
        for (var i = 0; i < TempTokenArr.length; i++) {
            tokenMint = TempTokenArr[i].info.mint;
            ammount = TempTokenArr[i].info.amount;

            for (var j = 0; j < TempMintInfoArr.length; j++) {
                if (TempTokenArr[i].info.mint === TempMintInfoArr[j].pubkey) {
                    decimals = TempMintInfoArr[j].info.decimals;

                    finalUserTokenDataArr.push({
                        ammount: ammount.toNumber() / Math.pow(10, decimals),
                        tokenAddress: tokenMint.toBase58()
                    });
                }
            }
        }

        setUserTokenInfo(finalUserTokenDataArr);
    };
    return [getTokenData, finalUserTokenDataArr, errorMsg];
};

const getMintInfo = async (connection: Connection, pubKey: PublicKey) => {
    const info = await connection.getAccountInfo(pubKey);
    if (info === null) {
        throw new Error('Failed to find mint account');
    }
    let mintInfo = MintParser(pubKey, info);

    return mintInfo;
};

const MintParser = (pubKey: PublicKey, info: AccountInfo<Buffer>) => {
    const buffer = Buffer.from(info.data);

    const data = deserializeMint(buffer);

    const details = {
        pubkey: pubKey,
        account: {
            ...info
        },
        info: data
    } as ParsedAccountBase;

    return details;
};

const TokenAccountParser = (pubKey: PublicKey, info: AccountInfo<Buffer>) => {
    const buffer = Buffer.from(info.data);
    const data = deserializeAccount(buffer);

    const details = {
        pubkey: pubKey,
        account: {
            ...info
        },
        info: data
    } as TokenAccount;

    return details;
};

const deserializeAccount = (data: Buffer) => {
    const accountInfo = AccountLayout.decode(data);
    accountInfo.mint = new PublicKey(accountInfo.mint);
    accountInfo.owner = new PublicKey(accountInfo.owner);
    accountInfo.amount = u64.fromBuffer(accountInfo.amount);

    if (accountInfo.delegateOption === 0) {
        accountInfo.delegate = null;
        accountInfo.delegatedAmount = new u64(0);
    } else {
        accountInfo.delegate = new PublicKey(accountInfo.delegate);
        accountInfo.delegatedAmount = u64.fromBuffer(
            accountInfo.delegatedAmount
        );
    }

    accountInfo.isInitialized = accountInfo.state !== 0;
    accountInfo.isFrozen = accountInfo.state === 2;

    if (accountInfo.isNativeOption === 1) {
        accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
        accountInfo.isNative = true;
    } else {
        accountInfo.rentExemptReserve = null;
        accountInfo.isNative = false;
    }

    if (accountInfo.closeAuthorityOption === 0) {
        accountInfo.closeAuthority = null;
    } else {
        accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
    }

    return accountInfo;
};

const deserializeMint = (data: Buffer) => {
    if (data.length !== MintLayout.span) {
        throw new Error('Not a valid Mint');
    }

    const mintInfo = MintLayout.decode(data);

    if (mintInfo.mintAuthorityOption === 0) {
        mintInfo.mintAuthority = null;
    } else {
        mintInfo.mintAuthority = new PublicKey(mintInfo.mintAuthority);
    }

    mintInfo.supply = u64.fromBuffer(mintInfo.supply);
    mintInfo.isInitialized = mintInfo.isInitialized !== 0;

    if (mintInfo.freezeAuthorityOption === 0) {
        mintInfo.freezeAuthority = null;
    } else {
        mintInfo.freezeAuthority = new PublicKey(mintInfo.freezeAuthority);
    }

    return mintInfo as MintInfo;
};
