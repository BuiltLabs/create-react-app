import * as React from 'react';

import * as styles from './Home.scss';

interface HomeProps {
    isPinging: boolean;
    ping: any;
}

export const Home = (props: HomeProps) => {
    return (
        <div className={ styles.Intro }>
            <p>To get started, click the links above to view the examples.</p>
            <p>View the <code>src/index.tsx</code> to see the application entry-point and configuration.</p>
        </div>
    );
};

export default Home;
