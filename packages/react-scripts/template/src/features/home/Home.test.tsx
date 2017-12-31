import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';

import { ping, pingEpic } from '../../redux/ping-pong';
import { Home } from './Home';

const epicMiddleware = createEpicMiddleware(pingEpic);
const mockStore = configureMockStore([epicMiddleware]);

it('renders without crashing', () => {
    const div = document.createElement('div'),
        props = {
            isPinging: false,
            ping: ping
        };

    ReactDOM.render(
        <Provider store={ mockStore() }>
            <Home {...props} />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
