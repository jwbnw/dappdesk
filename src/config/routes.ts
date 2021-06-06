import IRoute from '../interfaces/route';
import { AppAggregatorPage } from '../pages/ApplicationAggregatorPage';
import { CurrentAccountPage } from '../pages/CurrentAccountPage';
import { UserDappsPage } from '../pages/UserDappsPage';

const routes: IRoute[] = [
    {
        path: '/userdapps',
        name: 'My Dapps Page',
        component: UserDappsPage,
        exact: true,
        props: {
            walletConnected: false,
            walletAddress: ''
        }
    },
    {
        path: '/currentaccount',
        name: 'Current Account Page',
        component: CurrentAccountPage,
        exact: true,
        props: {
            walletConnected: false,
            walletAddress: ''
        }
    },
    {
        path: '/appaggregator',
        name: 'App Aggregator Account Page',
        component: AppAggregatorPage,
        exact: true,
        props: {
            walletConnected: false,
            walletAddress: ''
        }
    }
];

export default routes;
