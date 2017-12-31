import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';

import { DataAction } from '../DataAction';

// Constants
export const PING: string   = 'PING';
export const PONG: string   = 'PONG';

// Action Creators
export function ping() {
    return ({ type: PING, payload: null });
}

// Epic
export const pingEpic = (action$: ActionsObservable<DataAction>): Observable<DataAction> =>
    action$.ofType(PING)
        .debounceTime(1000)
        .mapTo({ type: PONG, payload: null });

// Reducer state interface
interface PingState {
    isPinging: boolean;
}

// Reducer
export default function(state: PingState = { isPinging: false }, action: DataAction) {
    switch (action.type) {
        case PING:
            return { isPinging: true };

        case PONG:
            return { isPinging: false };

        default:
            return state;
    }
}
