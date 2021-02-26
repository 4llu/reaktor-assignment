import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import categories, { getCategoryProductsEpic } from './categories';

const rootReducer = combineReducers({ categories });

export default rootReducer;

export const rootEpic = combineEpics(getCategoryProductsEpic);
