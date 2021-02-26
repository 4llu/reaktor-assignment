import {
    GET_CATEGORY_PRODUCTS,
    GET_CATEGORY_PRODUCTS_SUCCESS,
    getCategoryProductsSuccess,
    getCategoryProductsError,
} from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
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
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_PRODUCTS_SUCCESS:
            return _.assign({}, state, { [action.payload.categoryName]: parseProductResponse(action.payload.res) });
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

// Utils
const parseProductResponse = (res) => {
    const products = [];
    for (let i = 0; i < res.length; i++) {
        let product = {
            id: res[i].id,
            availability: '-',
            name: res[i].name,
            colors: res[i].color.join(', '),
            manufacturer: res[i].manufacturer,
            price: res[i].price,
        };
        products.push(product);
    }
    return products;
};
