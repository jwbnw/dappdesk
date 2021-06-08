import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import logger from '../config/logging';
const networks = {
    mainnet: {
        url: 'https://solana-api.projectserum.com',
        displayName: 'Mainnet Beta'
    },
    devnet: { url: clusterApiUrl('devnet'), displayName: 'Devnet' },
    testnet: { url: 'https://api.testnet.solana.com', displayName: 'Testnet' }
};

export default (): [(accountKey: string) => void, number, string, string] => {
    const [accountBalance, setAccount] = useState(0);
    const [accountPubKey, setAccountKey] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const getAccountBalance = async (accountKey: string) => {
        let lamports = 0;
        try {
            let publicKeyToLookup = new PublicKey(accountKey);

            const solanaNetwork = networks.testnet;
            const connection = new Connection(solanaNetwork.url, 'confirmed');

            const account = await connection.getAccountInfo(
                publicKeyToLookup,
                'confirmed'
            );
            if (account != null) {
                lamports = account.lamports;
                setErrorMsg('');
                let data = account.data;
                logger.info(data, 'Account Data');
            }
        } catch (e) {
            setErrorMsg(e);
            logger.error(e, 'error fetching account info');
        }

        let n = lamports;
        let k = 9;

        let v = n / Math.pow(10, k);

        setAccount(v);
        setAccountKey(accountKey);
    };
    return [getAccountBalance, accountBalance, accountPubKey, errorMsg];
};
