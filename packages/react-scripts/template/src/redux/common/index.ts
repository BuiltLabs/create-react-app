import { DataAction } from '../DataAction';

// Constants
export const DATA_FETCH_STARTED: string    = 'DATA_FETCH_STARTED';
export const DATA_FETCH_COMPLETE: string   = 'DATA_FETCH_COMPLETE';
export const DATA_FETCH_ERROR: string      = 'DATA_FETCH_ERROR';

// Action Creators
export function dataFetchStarted(): DataAction {
    return  ({ type: DATA_FETCH_STARTED, payload: null });
}

export function dataFetchComplete(): DataAction {
    return  ({ type: DATA_FETCH_COMPLETE, payload: null });
}

export function dataFetchError(error: any): DataAction {
    return  ({ type: DATA_FETCH_ERROR, payload: error });
}

// Reducer state interface
interface DataLoadingState {
    isFetchingData: boolean;
}

// Reducer
export default (state: DataLoadingState = { isFetchingData: false }, action: DataAction) => {
    switch (action.type) {
        case DATA_FETCH_STARTED:
            return {
                isFetchingData: true
            };

        case DATA_FETCH_COMPLETE:
            return {
                isFetchingData: false
            };

        default:
            return state;
    }
  };
