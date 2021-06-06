import React, { useEffect, useState } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import '../css/app.css';
import { IntroComponent } from '../components/IntroComponent';
import { Container, Row, Col } from 'shards-react';
import { UserDappComponent } from '../components/UserDappComponent';

export const UserDappsPage: React.FC<IPage> = ({
    walletConnected,
    walletAddress,
    name
}) => {
    const [userWalletConnected, setUserWalletConnected] = useState(false);
    const [userWalletAddress, setUserWalletAddress] = useState('');

    useEffect(() => {
        logging.info(`Loading ${name}`);
        logging.info(walletAddress);
        logging.info(walletConnected);
    }, []);

    useEffect(() => {
        setUserWalletAddress(walletAddress);
        setUserWalletConnected(walletConnected);
    }, [walletConnected]);

    return (
        <Container className="home-page-container">
            <Row>
                <Col>
                    <IntroComponent />
                </Col>
                <Col>
                    <UserDappComponent
                        walletConnected={userWalletConnected}
                        walletAddress={userWalletAddress}
                    />
                </Col>
            </Row>
        </Container>
    );
};
