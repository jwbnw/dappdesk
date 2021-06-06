import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'shards-react';
import logger from '../config/logging';
import ICard from '../interfaces/card';

const UnderConstruction = require('../images/UnderConstruction.png');
const Connected = require('../images/Connected.png');
const NotConnected = require('../images/NotConnected.png');

interface Props {
    walletAddress: string;
    walletConnected: boolean;
}

export const UserDappComponent: React.FC<Props> = ({
    walletAddress,
    walletConnected
}) => {
    const [userConnectedDapps, setuserConnectedDapps] = useState<Array<ICard>>(
        []
    );
    const [showUserConnectedDapps, setShowUserConnectedDapps] = useState(false);

    React.useEffect(() => {
        setShowUserConnectedDapps(walletConnected);
    }, [walletConnected]);

    function createCardConst() {}

    /* will need this so going to comment it out for now *
    function checkCardAsset(assetUrl: string){
        try{
            const src = require(`../logos/${assetUrl}`);
            return assetUrl;
        }
        catch (e){
            logger.error("Image Load Failed in App Aggregator", e);
            return "SolanaStockImage.png";
        }
    } */

    if (walletConnected) {
        return (
            <Container>
                <div>
                    <h3 className="user-dapps-title-div">Your Dapps</h3>
                </div>
                <div className="dapp-card-div">
                    <Col className="text-color-class">
                        <Row>
                            <div>
                                Connected{' '}
                                <img src={Connected} alt="connected logo" />
                            </div>
                        </Row>
                        <Row>
                            <br />
                            <img
                                src={UnderConstruction}
                                alt="Comming Soon Img"
                            />
                        </Row>
                        <br />
                        <br />
                    </Col>
                </div>
            </Container>
        );
    } else {
        return (
            <div className="text-color-class">
                <h3 className="user-dapps-title-div">Your Dapps</h3>
                <div>
                    Not Connected{' '}
                    <img src={NotConnected} alt="not connected logo" />
                </div>
            </div>
        );
    }
};
