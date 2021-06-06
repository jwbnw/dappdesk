import React, { useEffect, useMemo, useCallback } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalHeader
} from 'shards-react';
import { PublicKey } from '@solana/web3.js';
import logging from '../config/logging';
import { LedgerWalletAdapter } from '../wallet-adapters/ledger';
import { Transaction } from '@solana/web3.js';
import EventEmitter from 'eventemitter3';

//Need to add phantom
export const WALLET_PROVIDERS = [
    {
        name: 'Sollet',
        url: 'https://www.sollet.io',
        icon: `sollet.svg`
    },
    {
        name: 'Bonfida',
        url: 'https://bonfida.com/wallet/',
        icon: `solflare.svg`
    },
    {
        name: 'Ledger',
        url: 'https://www.ledger.com',
        icon: `ledger.svg`,
        adapter: LedgerWalletAdapter
    }
];

export interface WalletAdapter extends EventEmitter {
    publicKey: PublicKey | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    connect: () => any;
    disconnect: () => any;
}

const WalletContext = React.createContext<{
    wallet: WalletAdapter | undefined;
    connected: boolean;
    select: () => void;
    provider: typeof WALLET_PROVIDERS[number] | undefined;
}>({
    wallet: undefined,
    connected: false,
    select() {},
    provider: undefined
});

interface Props {
    updateWalletInfo: (arg: string, arg1: boolean) => void;
}

/**Thank you https://github.com/solana-labs/dapp-scaffold
 * (Note: This is another place redundancies exist, will
 * need to be cleand up quite a bit before goig live)
 */
export const ConnectWallet: React.FC<Props> = (props) => {
    useEffect(() => {
        logging.info(`Loading ConnectWallet`);
    }, []);

    const [modalOpen, setModalOpen] = React.useState(false);
    const [providerUrl, setProviderUrl] = React.useState('');
    const [connectionMsg, setConnectionMsg] = React.useState(
        'Connect Wallet (Devnet)'
    );

    const [autoConnect, setAutoConnect] = React.useState(false);
    const [walletConnected, setWalletConnected] = React.useState(false);

    const provider = useMemo(
        () => WALLET_PROVIDERS.find(({ url }) => url === providerUrl),
        [providerUrl]
    );

    const wallet = useMemo(
        function () {
            if (provider) {
                return new (provider.adapter || Wallet)(
                    providerUrl
                ) as WalletAdapter;
            }
        },
        [provider, providerUrl]
    );

    useEffect(() => {
        if (wallet) {
            wallet.on('connect', () => {
                if (wallet.publicKey) {
                    setWalletConnected(true);
                    setConnectionMsg('Connected (Devnet)');
                    props.updateWalletInfo(wallet.publicKey.toBase58(), true);
                }
            });

            wallet.on('disconnect', () => {
                setWalletConnected(false);
                setConnectionMsg('Connect Wallet! (Devnet)');
                props.updateWalletInfo('', walletConnected);
            });
        }

        return () => {
            setWalletConnected(false);
            setConnectionMsg('Connect Wallet! (Devnet)');
            props.updateWalletInfo('', walletConnected);
            if (wallet) {
                wallet.disconnect();
            }
        };
    }, [wallet]);

    useEffect(() => {
        if (wallet && autoConnect) {
            wallet.connect();
            setAutoConnect(false);
        }

        return () => {};
    }, [wallet, autoConnect]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const disconnectWallet = () => {
        if (wallet) {
            wallet.disconnect();
        } else {
            logging.error('Disconnect requested - no wallet connected');
        }
    };

    const ConnectBtn = () => {
        if (!walletConnected) {
            return (
                <Button theme="danger" onClick={toggleModal}>
                    {connectionMsg}
                </Button>
            );
        } else {
            return (
                <ButtonGroup>
                    <Button onClick={disconnectWallet} theme="danger">
                        Disconnect
                    </Button>
                    <Button theme="success" onClick={toggleModal}>
                        {connectionMsg}
                    </Button>
                </ButtonGroup>
            );
        }
    };

    const select = useCallback(() => setModalOpen(true), []);

    return (
        <div className="connect-wallet-div">
            <ConnectBtn />
            <WalletContext.Provider
                value={{
                    wallet,
                    connected: walletConnected,
                    select,
                    provider
                }}
            >
                <Modal open={modalOpen} toggle={toggleModal}>
                    <ModalHeader>
                        Select Your Prefered Wallet Provider!
                    </ModalHeader>
                    <ModalBody className="wallet-modal">
                        {WALLET_PROVIDERS.map((provider) => {
                            const onClick = function () {
                                setProviderUrl(provider.url);
                                setAutoConnect(true);
                                toggleModal();
                            };
                            return (
                                <div>
                                    <Button
                                        theme="info"
                                        outline
                                        squared
                                        block
                                        size="lg"
                                        onClick={onClick}
                                    >
                                        {provider.name}
                                    </Button>
                                </div>
                            );
                        })}
                    </ModalBody>
                </Modal>
            </WalletContext.Provider>
        </div>
    );
};
