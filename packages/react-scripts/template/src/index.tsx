import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Home from './features/Home/Home';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

ReactDOM.render(
  <Home />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
