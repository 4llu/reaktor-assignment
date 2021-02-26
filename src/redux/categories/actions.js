// Action types
export const GET_CATEGORY_PRODUCTS = 'categories:GET_CATEGORY_PRODUCTS';
export const GET_CATEGORY_PRODUCTS_SUCCESS = 'categories:GET_CATEGORY_PRODUCTS_SUCCESS';
export const GET_CATEGORY_PRODUCTS_ERROR = 'categories:GET_CATEGORY_PRODUCTS_ERROR';

// Actions
export const getCategoryProducts = (categoryName) => {
    return {
        type: GET_CATEGORY_PRODUCTS,
        payload: {
            categoryName,
        },
    };
};

export const getCategoryProductsSuccess = (res, categoryName) => ({
    type: GET_CATEGORY_PRODUCTS_SUCCESS,
    payload: {
        res,
        categoryName,
    },
});

export const getCategoryProductsError = (error) => ({
    type: GET_CATEGORY_PRODUCTS_ERROR,
    payload: {
        error,
    },
});
