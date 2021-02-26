const initialState = [
    {
        name: 'Gloves',
        page: 'gloves',
        img: 'gloves.jpg',
        products: [],
    },
    {
        name: 'Face masks',
        page: 'face-masks',
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
