import * as React from 'react';
import Bundle from '../routing/Bundle';

const load = () => import('./Layout');

export default (props: any) => {
    return (
        <Bundle load={ load }>
            { (Component: any) => <Component {...props} /> }
        </Bundle>
    );
};
