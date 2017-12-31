import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux';

import { Home, GitHub, PingPong } from './features';
import Layout from './components/layout';

import './index.scss';

ReactDOM.render(
  <Provider store={ configureStore() }>
    <Router>
        <Layout>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/pingpong" component={PingPong}/>
            <Route path="/github" component={GitHub}/>
        </Layout>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
