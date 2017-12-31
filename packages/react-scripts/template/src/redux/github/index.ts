import { ActionsObservable } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { dataFetchComplete, dataFetchError, dataFetchStarted } from '../common';
import { DataAction } from '../DataAction';

// Constants
export const FETCH_REPOS: string             = 'FETCH_REPOS';
export const FETCH_REPOS_FULFILLED: string   = 'FETCH_REPOS_FULFILLED';

// Action Creators
export function fetchGithubRepos(scope: string): DataAction {
    return  ({ type: FETCH_REPOS, payload: scope });
}

export function fetchGithubReposFulfilled(payload: any) {
    return ({ type: FETCH_REPOS_FULFILLED, payload: payload });
}

export function fetchGithubReposError(err: any) {
    return (err.status === 404)
        ? fetchGithubReposFulfilled([])
        : dataFetchError(err);
}

// Epic
export function githubEpic(action$: ActionsObservable<DataAction>, store: any ) {
    return action$.ofType(FETCH_REPOS)
        .debounceTime(500)
        .do(store.dispatch(dataFetchStarted()))
        .mergeMap(action => {
            return ajax(`https://api.github.com/users/${action.payload}/repos`)
                .map(ajaxResp => fetchGithubReposFulfilled(ajaxResp.response))
                .do(store.dispatch(dataFetchComplete()))
                .catch(err => Observable.of(
                    store.dispatch(fetchGithubReposError(err)))
                );
            });
}

// Reducer state interface
interface GithubState {
    repos: any[];
}

// Reducer
export default (state: GithubState = { repos: [] }, action: DataAction) => {
    switch (action.type) {
      case FETCH_REPOS_FULFILLED:
        return {
            repos: (!!action.payload) ? action.payload : []
        };

      default:
        return state;
    }
  };
