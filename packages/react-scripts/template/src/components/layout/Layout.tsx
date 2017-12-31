import * as React from 'react';
import * as styles from './Layout.scss';
import { Link } from 'react-router-dom';

const logo = require('../../assets/logo.svg');

export interface LayoutProps {
    children?: any;
}

export const Layout = (props: LayoutProps) => {
    return (
        <div className={ styles.Layout }>
            <div className={ styles.Header }>
                <img src={ logo } className={ styles.Logo } alt="logo" />
                <h2>Welcome to Built React Scripts</h2>
            </div>
            <nav className={ styles.Nav }>
                <Link to="/">Home</Link>
                <Link to="/pingpong">Ping Pong</Link>
                <Link to="/github">GitHub</Link>
            </nav>
            { props.children }
        </div>
    );
};

export default Layout;
