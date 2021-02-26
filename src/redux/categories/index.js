import {
    GET_CATEGORY_PRODUCTS,
    GET_CATEGORY_PRODUCTS_SUCCESS,
    GET_AVAILABILITIES_SUCCESS,
    GET_AVAILABILITIES_ERROR,
    getCategoryProductsSuccess,
    getCategoryProductsError,
    getAvailabilitesSuccess,
    getAvailabilitesError,
} from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, from } from 'rxjs';
import _ from 'lodash';

import api from '../../utils/api';

const initialState = {
    categories: [
        {
            name: 'Gloves',
            page: 'gloves',
            img: 'gloves.jpg',
        },
        {
            name: 'Face masks',
            page: 'facemasks',
            img: 'face_mask.jpg',
        },
        {
            name: 'Beanies',
            page: 'beanies',
            img: 'beanie.jpg',
        },
    ],
    gloves: [],
    beanies: [],
    facemasks: [],
    manufacturers: [],
    availabilities: {},
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_PRODUCTS_SUCCESS:
            return _.assign({}, state, {
                // Save new products
                [action.payload.categoryName]: updateAvailabilities(action.payload.products, state.availabilities),
                // Save previously unseen manufacturers
                manufacturers: _.concat(
                    state.manufacturers,
                    _.difference(action.payload.manufacturers, state.manufacturers),
                ),
            });
        case GET_AVAILABILITIES_SUCCESS:
            return _.assign({}, state, {
                // Update availabilities for everything (in case page was changed in between)
                gloves: updateAvailabilities(state.gloves, action.payload.availabilities),
                beanies: updateAvailabilities(state.beanies, action.payload.availabilities),
                facemasks: updateAvailabilities(state.facemasks, action.payload.availabilities),
                // Store availabilities
                availabilities: _.assign({}, state.availabilities, action.payload.availabilities),
            });
        case GET_AVAILABILITIES_ERROR:
            return _.assign(
                {},
                state,
                // Update availabilities to "trying again"
                {
                    [action.payload.categoryName]: updateAvailabilitiesError(
                        state[action.payload.categoryName],
                        action.payload.manufacturers,
                    ),
                },
            );
        default:
            return state;
    }
};

export default categories;

export const getCategoryProductsEpic = (action$) =>
    action$.pipe(
        ofType(GET_CATEGORY_PRODUCTS),
        mergeMap((action) =>
            api.get(`/products/${action.payload.categoryName}`).pipe(
                map((res) => getCategoryProductsSuccess(res.response, action.payload.categoryName)),
                catchError((error) => of(getCategoryProductsError(error))),
            ),
        ),
    );

export const getAvailabilitiesEpic = (action$, state$) =>
    action$.pipe(
        // GET_AVAILABILITIES_ERROR is here to try again on manufacturers that threw an error
        ofType(GET_CATEGORY_PRODUCTS_SUCCESS, GET_AVAILABILITIES_ERROR),
        mergeMap((action) => {
            if (Object.keys(state$.value.categories.availabilities).length == 0 || action.payload.retry) {
                // Make a separate call for each manufacturer
                return from(action.payload.manufacturers).pipe(
                    mergeMap((m) =>
                        api.get(`/availability/${m}`).pipe(
                            map((res) => getAvailabilitesSuccess(res.response, action.payload.categoryName)),
                            catchError((error) => of(getAvailabilitesError(error, action.payload.categoryName, m))),
                        ),
                    ),
                );
            } else {
                return of({ type: 'ALREADY_FETCHED' });
            }
        }),
    );

// utils

const updateAvailabilities = (products, availabilities) => {
    const newProducts = _.cloneDeep(products);
    // Check if availability available for each of the products
    for (let i = 0; i < newProducts.length; i++) {
        let pid = newProducts[i].id;
        if (availabilities[pid]) {
            newProducts[i].availability = availabilities[pid];
        }
    }
    return newProducts;
};

const updateAvailabilitiesError = (products, manufacturers) => {
    const newProducts = _.cloneDeep(products);
    // // Add error text to availability of products of the failed manufacturer
    for (let i = 0; i < newProducts.length; i++) {
        if (
            newProducts[i].manufacturer == _.capitalize(manufacturers[0]) &&
            newProducts[i].availability == 'Waiting...'
        ) {
            newProducts[i].availability = 'Trying again...';
        }
    }
    return newProducts;
};
