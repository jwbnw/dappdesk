import { useState } from 'react';
import * as api from '../api/api';

export default (): [() => void, number, string] => {
    const [usdValueSol, setValueSol] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    interface Solana {
        usd: number;
    }

    interface SolanaPrice {
        solana: Solana;
    }

    const getUsdValue = async () => {
        try {
            const data = await api.getSolanaPrice<SolanaPrice>();
            if (data != null) {
                setValueSol(data.solana.usd);
            }
        } catch (e) {
            setErrorMsg(e);
        }
    };

    return [getUsdValue, usdValueSol, errorMsg];
};
