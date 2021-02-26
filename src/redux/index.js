import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import categories, { getCategoryProductsEpic, getAvailabilitiesEpic } from './categories';

const rootReducer = combineReducers({ categories });

export default rootReducer;

export const rootEpic = combineEpics(getCategoryProductsEpic, getAvailabilitiesEpic);
