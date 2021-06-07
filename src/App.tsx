import React, { useEffect, useState } from 'react';
import { NavComponent } from './components/NavComponent';
import {
    BrowserRouter,
    Route,
    Switch,
    RouteComponentProps,
    HashRouter
} from 'react-router-dom';

import logging from './config/logging';
import routes from './config/routes';
import { ConnectWallet } from './components/ConnectWallet';
import 'shards-ui/dist/css/shards.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import { HomePage } from './pages/HomePage';

const App: React.FC<{}> = ({}) => {
    useEffect(() => {
        logging.info('Loading application.');
    }, []);

    const HomePageContainer = () => (
        <div className="welcome-page-container-div">
            <Route component={HomePage} />
        </div>
    );

    const MainAppContainer = () => {
        const [walletConnected, setWalletConnected] = useState(false);
        const [walletAddress, setWalletAddress] = useState('');

        const updateWalletInfo = (
            address: string,
            connected: boolean
        ): void => {
            setWalletConnected(connected);
            setWalletAddress(address);

            logging.info(walletConnected, 'wallet connected in App');
            logging.info(walletAddress, 'wallet addy in App');
        };

        return (
            <div className="welcome-class-div">
                <ConnectWallet updateWalletInfo={updateWalletInfo} />
                <br />
                <h1 className="welcome-class">Dapp Desk ┬─┬ノ( º _ ºノ)</h1>
                <h3 className="text-color-class">Early Hackathon Beta</h3>
                <NavComponent />
                <br />
                {routes.map((route, index) => {
                    route.props.walletConnected = walletConnected;
                    route.props.walletAddress = walletAddress;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props: RouteComponentProps<any>) => (
                                <route.component
                                    name={route.name}
                                    {...props}
                                    {...route.props}
                                />
                            )}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomePageContainer} />
                <Route component={MainAppContainer} />
            </Switch>
        </HashRouter>
    );
};

export default App;
