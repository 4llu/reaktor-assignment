import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

const rootReducer = combineReducers({});

export default rootReducer;

export const rootEpic = combineEpics();
