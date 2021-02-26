// Action types
export const GET_CATEGORY_PRODUCTS = 'categoreies:GET_CATEGORY_PRODUCTS';
export const GET_CATEGORY_PRODUCTS_SUCCESS = 'categoreies:GET_CATEGORY_PRODUCTS_SUCCESS';
export const GET_CATEGORY_PRODUCTS_ERROR = 'categoreies:GET_CATEGORY_PRODUCTS_ERROR';

// Actions
export const getCategoryProducts = (categoryName) => ({
    type: GET_CATEGORY_PRODUCTS,
    payload: {
        categoryName,
    },
});

export const getCategoryProductsSuccess = (res) => ({
    type: GET_CATEGORY_PRODUCTS_SUCCESS,
    payload: {
        res,
    },
});

export const getCategoryProductsError = (error) => ({
    type: GET_CATEGORY_PRODUCTS_ERROR,
    payload: {
        error,
    },
});
