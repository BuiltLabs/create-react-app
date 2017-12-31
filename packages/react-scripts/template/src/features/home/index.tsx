import * as React from 'react';
import Bundle from '../../components/routing/Bundle';

const load = () => import('./Home');

export default (props: any) => {
    return (
        <Bundle load={ load }>
            { (Component: any) => <Component {...props} /> }
        </Bundle>
    );
};
