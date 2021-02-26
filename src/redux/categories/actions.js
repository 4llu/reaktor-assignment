import _ from 'lodash';

// Action types
export const GET_CATEGORY_PRODUCTS = 'categories:GET_CATEGORY_PRODUCTS';
export const GET_CATEGORY_PRODUCTS_SUCCESS = 'categories:GET_CATEGORY_PRODUCTS_SUCCESS';
export const GET_CATEGORY_PRODUCTS_ERROR = 'categories:GET_CATEGORY_PRODUCTS_ERROR';
export const GET_AVAILABILITIES_SUCCESS = 'categories:GET_AVAILABILITIES_SUCCESS';
export const GET_AVAILABILITIES_ERROR = 'categories:GET_AVAILABILITIES_ERROR';

// Actions
export const getCategoryProducts = (categoryName) => {
    return {
        type: GET_CATEGORY_PRODUCTS,
        payload: {
            categoryName,
        },
    };
};

export const getCategoryProductsSuccess = (res, categoryName) => {
    const products = [];
    const manufacturers = new Set();
    // Parse the response
    for (let i = 0; i < res.length; i++) {
        // Save unique manufacturers
        manufacturers.add(res[i].manufacturer);
        // New product
        let product = {
            id: res[i].id,
            availability: 'Waiting...',
            name: _.startCase(res[i].name.toLowerCase()),
            colors: res[i].color.join(', '),
            manufacturer: _.capitalize(res[i].manufacturer),
            price: res[i].price,
        };
        products.push(product);
    }

    return {
        type: GET_CATEGORY_PRODUCTS_SUCCESS,
        payload: {
            categoryName,
            products,
            manufacturers: Array.from(manufacturers),
        },
    };
};

export const getCategoryProductsError = (error) => ({
    type: GET_AVAILABILITIES_ERROR,
    payload: {
        error,
    },
});

export const getAvailabilitesSuccess = (res, categoryName) => {
    const availabilities = {};
    // Parse the response
    for (let i = 0; i < res.response.length; i++) {
        // Transform stock value
        let availability = res.response[i].DATAPAYLOAD.split('<INSTOCKVALUE>')[1].split('</INSTOCKVALUE>')[0];
        if (availability == 'INSTOCK') {
            availability = 'In stock';
        } else if (availability == 'LESSTHAN10') {
            availability = 'Less than 10';
        } else {
            availability = 'Out of stock';
        }
        // Save as object with id's as keys
        availabilities[res.response[i].id.toLowerCase()] = availability;
    }

    return {
        type: GET_AVAILABILITIES_SUCCESS,
        payload: {
            availabilities,
            categoryName,
        },
    };
};

export const getAvailabilitesError = (error, categoryName, manufacturer) => ({
    type: GET_AVAILABILITIES_ERROR,
    // Needs to match GET_CATEGORY_PRODUCTS_SUCCESS
    payload: {
        error,
        categoryName,
        manufacturers: [manufacturer],
    },
});
