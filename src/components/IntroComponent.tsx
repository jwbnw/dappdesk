import React, { useEffect } from 'react';
import logging from '../config/logging';
import '../css/app.css';
import { CollapseInfoComponent } from './CollapseInfoComponent';
import { Container, Row, Col } from 'shards-react';

export const IntroComponent: React.FC<any> = ({}) => {
    useEffect(() => {
        logging.info(`Loading IntroComponent`);
    }, []);

    return (
        <Container className="text-color-class">
            <Row>
                <Col>
                    <h3 className="text-color-class">Welcome!</h3>
                    <p>
                        Welcome to your Dapp Desk! Connect your wallet on the
                        right side of the page to see what applications you're
                        interacting with! Depending on the length and nature of
                        your interactions we may request you leave a review for
                        a certain Dapp and reward you for doing so! If you would
                        like to check out applications running on Solana
                        navigate over to the Dapp Explorer page and see what's
                        popular or scroll through! If you would like to look up
                        and explore a Solana Address navigate over to the
                        Address Tool page!
                    </p>
                    <p>
                        For more information about the project and Solana in
                        general check out the Icons below!
                    </p>
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col>
                    <CollapseInfoComponent
                        title="Getting Started With Solana"
                        info="Solana is a fast, secure, and censorship resistant blockchain! Don't worry if you're not too familiar with the conecpt ofblockchains or why they're used! You can check out the blockchain section below for more info on that. To get started with Solana you'll just need to create a wallet and fund it with a little Solana! Check out the Fiat Onboading section for more information on that! If you don't have a wallet you can click on the Connect Wallet link at the top and choose a recommended wallet. They should be able to guide you through the rest! (We like Phantom or Sollet). Once you have your wallet connected you may see you have no connected Dapps! So go checkout out the Dapp Explorer page and have fun! For more information on Solana Check out:  "
                        toggleName="Getting Started With Solana"
                        hyperLink="https://solana.com"
                        hyperLinkText="Solana"
                    />
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
                <Col>
                    <CollapseInfoComponent
                        title="Dapp Desk's Long Term Vision"
                        info="We want to become the one stop shop for you to track, monitor and review your crypto interactions. Futhermore, we look forward to creating an enviornment where new users can look around and see what services are offered along how other users have felt about their interactions. Given the opennature of blockchains we can ensure reviews are from verifed users. Our current focus is decentalized applications living on the Solana Blockchain. However, our end goal is to abstract this complexity away from the user and show them what they care about, the Dapp and their interaction. Granted, for the power-users out there, we'll provide the tools to explore and dive into the interactions as they wish. Expanding our servics to support other L1 solutions will be considerd."
                        toggleName="Dapp Desk's Long Term Vision"
                    />
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
                <Col>
                    <CollapseInfoComponent
                        title="Fiat OnBoarding"
                        info="Fiat OnBoarding is the idea of taking your native fiat currency (USD, GBP, EURO, etc.) and converting it to Digital Currency (Solana, Bitcoin, Etherum, etc.). Currently the best way to go about this is to use an Exchange or Trading App. One of our goals is to make this process easier for you so check back on this seciton soon! For now our recomendations are Blockfolio for Mobile Users, and for Desktop FTX Pay Via Sollet!"
                        toggleName="Fiat OnBoarding"
                    />
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
                <Col>
                    <CollapseInfoComponent
                        title="SolanaSzn Hackathon"
                        info="The Solana Season Hackathon is currently underway! We're taking part in this contest so we'll keep you up to date with any news! For more information checkout the "
                        toggleName="SolanaSzn Hackathon"
                        hyperLink="https://github.com/jwbnw/dappdesk"
                        hyperLinkText="Dapp Desk GitHub"
                    />
                </Col>
            </Row>
        </Container>
    );
};
