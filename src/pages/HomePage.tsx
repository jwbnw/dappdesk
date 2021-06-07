import React, { useCallback, useEffect, useState } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import '../css/app.css';
import { IntroComponent } from '../components/IntroComponent';
import { Button, Container, Row, Col } from 'shards-react';
import { UserDappComponent } from '../components/UserDappComponent';
import { Link, useHistory } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'shards-react';

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
            <Nav tabs>
                <NavItem>
                    <NavLink>
                        <Link style={{ color: 'green' }} to="/appaggregator">
                            Launch Hackathon Beta
                        </Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <a
                            style={{ color: 'green' }}
                            href="https://github.com/jwbnw/dappdesk/blob/main/DappDeskLitepaper.pdf"
                        >
                            Read Litepaper
                        </a>
                    </NavLink>
                </NavItem>
            </Nav>
            <div style={{ position: 'absolute', bottom: 25 }}>
                <img src={SolanaLogo} alt="Solana Logo" />
            </div>
        </div>
    );
};
