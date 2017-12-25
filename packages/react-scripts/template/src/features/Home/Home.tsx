import * as React from 'react';
import { Component } from 'react';

import * as styles from './Home.scss';

const logo = require('../../assets/logo.svg');

class Home extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <div className={ styles.Header }>
          <img src={logo} className={ styles.Logo } alt="logo" />
          <h2>Welcome to Built React Scripts</h2>
        </div>
        <p className={ styles.Intro }>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Home;
