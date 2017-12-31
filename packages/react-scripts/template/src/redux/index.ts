import { combineEpics } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import common from './common';
import ping, { pingEpic } from './ping-pong';
import github, { githubEpic } from './github';

const rootEpic = combineEpicsWithError(
    pingEpic,
    githubEpic
);

const rootReducer = combineReducers({
    common,
    ping,
    github
});

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(epicMiddleware)
        )
    );
    return store;
}

function combineEpicsWithError(...epics: any[]) {
    const combinedEpics = combineEpics(...epics);
    return function epicWithError(...args: any[]) {
        return combinedEpics(...args)
            .do({
                error: (e: any) => {
                    throw(e);
                },
            });
    };
}
