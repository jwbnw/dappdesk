import React from 'react';
import { ListGroup, ListGroupItem } from 'shards-react';
import logging from '../config/logging';

interface Props {
    tokenAddress: string;
    ammount: number;
}

export const TokenInfoComponent: React.FC<Props> = ({
    tokenAddress,
    ammount
}) => {
    logging.info(tokenAddress, 'token addy in TokenInfoComp');

    //TODO: Needs to check mint against known mints to get info
    if (tokenAddress != '') {
        return (
            <div className="token-info-div">
                <ListGroup>
                    <ListGroupItem theme="secondary">
                        Name: Unknown
                    </ListGroupItem>
                    <ListGroupItem theme="secondary">
                        Symbol: Unknown
                    </ListGroupItem>
                    <ListGroupItem theme="secondary">
                        {' '}
                        Token Address: {tokenAddress}
                    </ListGroupItem>
                    <ListGroupItem theme="secondary">
                        Ammount: {ammount}{' '}
                    </ListGroupItem>
                    <ListGroupItem theme="secondary">
                        Balance: $???
                    </ListGroupItem>
                </ListGroup>
                <br />
            </div>
        );
    }
    return <div>foobar</div>;
};
