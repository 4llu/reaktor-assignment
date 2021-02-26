import { GET_CATEGORY_PRODUCTS, getCategoryProductsSuccess, getCategoryProductsError } from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';

import api from '../../utils/api';

const initialState = [
    {
        name: 'Gloves',
        page: 'gloves',
        img: 'gloves.jpg',
        products: [],
    },
    {
        name: 'Face masks',
        page: 'facemasks',
        img: 'face_mask.jpg',
        products: [],
    },
    {
        name: 'Beanies',
        page: 'beanies',
        img: 'beanie.jpg',
        products: [],
    },
];

const categories = (state = initialState, action) => {
    switch (action.type) {
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
                map((res) => getCategoryProductsSuccess(res.response)),
                catchError((error) => of(getCategoryProductsError(error))),
            ),
        ),
    );
