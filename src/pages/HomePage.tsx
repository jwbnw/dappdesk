import React, { useCallback, useEffect, useState } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import '../css/app.css';
import { IntroComponent } from '../components/IntroComponent';
import { Button, Container, Row, Col } from 'shards-react';
import { UserDappComponent } from '../components/UserDappComponent';
import { Link, useHistory } from 'react-router-dom';
const SolanaLogo = require('../images/Solana-horizontal.png');

export const HomePage: React.FC<IPage> = ({}) => {
    const history = useHistory();
    const goToApp = useCallback(
        () => history.push('/appaggregator'),
        [history]
    );

    useEffect(() => {}, []);

    return (
        <div className="home-page-div">
            <h1 className="text-color-class">Dapp Deskノ( º _ ºノ)</h1>
            <br />
            <div>
                <Button outline theme="light">
                    Read Lite Paper
                </Button>
                <span>&nbsp;</span>
                <Button outline theme="light" onClick={goToApp}>
                    Launch Early Hackathon Beta
                </Button>
            </div>
            <div style={{ position: 'absolute', bottom: 25 }}>
                <img src={SolanaLogo} alt="Solana Logo" />
            </div>
        </div>
    );
};
