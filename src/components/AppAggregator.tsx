import React, { useState } from 'react';
import { Container, Row, Col } from 'shards-react';
import { CardComponent } from './CardComponent';
import * as CardConstants from '../CardConstants';
import logger from '../config/logging';
import ICard from '../interfaces/card';

interface Props {
    aggregate: string;
}

export const AppAggregator: React.FC<Props> = ({ aggregate }) => {
    const [cardArray, setCardArray] = useState<Array<ICard>>([]);

    React.useEffect(() => {
        createCardConst();
    });

    function createCardConst() {
        if (aggregate === 'DeFi') {
            setCardArray(CardConstants.DeFiCards);
        } else {
            setCardArray(CardConstants.PopularCards);
        }
    }

    function checkCardAsset(assetUrl: string) {
        try {
            const src = require(`../logos/${assetUrl}`);
            return assetUrl;
        } catch (e) {
            logger.error('Image Load Failed in App Aggregator', e);
            return 'SolanaStockImage.png';
        }
    }

    return (
        <Container>
            <div>
                <h3 className="card-title-div">{aggregate}</h3>
            </div>
            <div className="card-div">
                <Col>
                    <Row>
                        {cardArray.map((card) => {
                            let test = checkCardAsset(card.assetUrl);
                            return (
                                <div>
                                    <div className="single-card-div">
                                        <CardComponent
                                            header={card.header}
                                            title={card.title}
                                            body={card.body}
                                            hyperlink={card.hyperlink}
                                            assetName={test}
                                            footer={card.footer}
                                        />
                                        <div className="card-side-div" />
                                    </div>
                                    <div className="card-bottom-div" />
                                </div>
                            );
                        })}
                    </Row>
                    <br />
                    <br />
                </Col>
            </div>
        </Container>
    );
};
