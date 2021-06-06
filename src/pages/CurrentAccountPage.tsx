import React, { useState, useEffect } from 'react';
import { Button, FormInput, ListGroup, ListGroupItem } from 'shards-react';
import { TokenInfoComponent } from '../components/TokenInfoComponent';

import getAccountBalance from '../hooks/account-balance';
import getUsdValue from '../hooks/CoinPrice';
import getTokenData from '../hooks/account-token-balance';

import IPage from '../interfaces/page';
import { TokenDisplay } from '../interfaces/TokenDisplayInfo';
import logging from '../config/logging';

export const CurrentAccountPage: React.FC<IPage> = ({
    walletAddress,
    walletConnected,
    name
}) => {
    useEffect(() => {
        logging.info(`Loading ${name}`);
        logging.info(walletAddress, 'walletAddy');
        logging.info(walletConnected, 'walletConn');
    }, []);

    const [accountKey, setAccountKey] = React.useState('');
    const [shouldShowAcountIfo, setShouldShowAcountIfo] = useState(false);
    const [tokens, setTokens] = useState<TokenDisplay[]>([]);

    const [getSolPrice, usdValue, errorMessagePrice] = getUsdValue();
    const [getBalance, account, accountPubKey, errorMessage] =
        getAccountBalance();
    const [getTokens, tokenDisplay, errorMessage1] = getTokenData();

    const onEnteredWalletClick = () => {
        getSolPrice();
        getBalance(accountKey);
        getTokens(accountKey);
        logging.info(tokenDisplay, 'tokenDiplay in currentAccountPage');

        setTokens(tokenDisplay);
        setShouldShowAcountIfo(true);
    };

    const onConnectedWalletClick = () => {
        getSolPrice();
        getBalance(walletAddress);
        getTokens(walletAddress);
        logging.info(tokenDisplay, 'tokenDiplay in currentAccountPage');

        setTokens(tokenDisplay);
        setShouldShowAcountIfo(true);
    };

    function onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
        setAccountKey(e.currentTarget.value);
        logging.info(tokenDisplay, 'tokendisplay in curraccntpage');
    }

    const UseConnectedWalletBtn = () => {
        if (walletConnected) {
            return (
                <Button
                    block
                    outline
                    theme="light"
                    onClick={onConnectedWalletClick}
                >
                    Use Connected Wallet Address{' '}
                </Button>
            );
        } else {
            return (
                <Button
                    block
                    outline
                    disabled
                    theme="light"
                    onClick={onConnectedWalletClick}
                >
                    Use Connected Wallet Address{' '}
                </Button>
            );
        }
    };

    const AddressInfoComponent = () => {
        if (shouldShowAcountIfo) {
            return (
                <div>
                    <h4 className="text-color-class">
                        Here is your Account Info!
                    </h4>
                    <ListGroup>
                        <ListGroupItem theme="success">
                            Public Key: {accountPubKey}
                        </ListGroupItem>
                    </ListGroup>
                    <br />
                    <ListGroup>
                        <ListGroupItem theme="primary">
                            Name: Solana
                        </ListGroupItem>
                        <ListGroupItem theme="primary">
                            Symbol: SOL
                        </ListGroupItem>
                        <ListGroupItem theme="secondary">
                            Ammount: {account}{' '}
                        </ListGroupItem>
                        <ListGroupItem theme="secondary">
                            Balance: ${account * usdValue}
                        </ListGroupItem>
                    </ListGroup>
                    <br />

                    {tokens.map((tokens) => {
                        return (
                            <TokenInfoComponent
                                ammount={tokens.ammount}
                                tokenAddress={tokens.tokenAddress}
                            />
                        );
                    })}
                </div>
            );
        } else {
            return <div></div>;
        }
    };

    return (
        <div className="text-color-class">
            <h3 className="text-color-class">Adress Explorer:</h3>
            <br />
            <FormInput
                type="text"
                placeholder="Solana Address To Lookup"
                onChange={(e) => onChangeHandler(e)}
            />
            <br />
            <Button block outline theme="light" onClick={onEnteredWalletClick}>
                Get Info!
            </Button>
            <UseConnectedWalletBtn />
            <br />
            <br />
            <AddressInfoComponent />
        </div>
    );
};
