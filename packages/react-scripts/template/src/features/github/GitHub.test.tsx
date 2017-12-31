import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';

import { fetchGithubRepos, githubEpic } from '../../redux/github';
import { GitHub } from './GitHub';

const epicMiddleware = createEpicMiddleware(githubEpic);
const mockStore = configureMockStore([epicMiddleware]);

it('renders without crashing', () => {
    const div = document.createElement('div'),
        props = {
            fetchGithubRepos: fetchGithubRepos,
            repos: []
        };

    ReactDOM.render(
        <Provider store={ mockStore() }>
            <GitHub {...props} />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
