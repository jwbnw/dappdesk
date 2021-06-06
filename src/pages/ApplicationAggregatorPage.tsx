import React, { useEffect } from 'react';
import { AppAggregator } from '../components/AppAggregator';
import IPage from '../interfaces/page';
import logging from '../config/logging';

export const AppAggregatorPage: React.FC<IPage> = (props) => {
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, []);

    return (
        <div className="app-aggregator-div">
            <AppAggregator aggregate={'DeFi'} />
            <AppAggregator aggregate={'Other'} />
        </div>
    );
};
