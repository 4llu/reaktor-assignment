import React, { useEffect } from 'react';
import { Container, Box, Typography, Tooltip, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import { getCategoryProducts } from '../../redux/categories/actions';

const columns = [
    {
        field: 'availability',
        headerName: 'Availability',
        width: 180,
        renderCell: (params) => (
            <div className='availability-wrapper'>
                <div className={`availability-icon ${params.value == 'no' ? ', no' : ''}`} />
                {params.value}
            </div>
        ),
    },
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
        field: 'colors',
        headerName: 'Colors',
        width: 200,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <span className='table-cell-truncate'>{params.value}</span>
            </Tooltip>
        ),
    },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 200 },
    { field: 'price', headerName: 'Price', type: 'number', width: 150, renderCell: (params) => `${params.value} €` },
];

// const rows = [
//     {
//         availability: 'In stock',
//         id: '123',
//         name: 'Ganzo mittens',
//         colors: 'green, brown, red, grey, blue, white',
//         manufacturer: 'Adidas',
//         price: 134,
//     },
// ];

const useStyles = makeStyles(() => ({
    title: {
        textTransform: 'capitalize',
    },
    row: {
        backgroundColor: '#123',
    },
}));

const Category = () => {
    const classes = useStyles();
    const { category } = useParams();
    const title = useSelector((state) => state.categories.categories.find((e) => e.page == category).name);
    const rows = useSelector((state) => state.categories[category]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (rows.length == 0) {
            dispatch(getCategoryProducts(category));
        }
    });

    return (
        <Container>
            <Box my={2}>
                <Typography variant='h1' component='h1' className={classes.title} gutterBottom>
                    {title}
                </Typography>
            </Box>
            <Box my={2}>
                <DataGrid rows={rows} columns={columns} classes={{ row: classes.row }} autoHeight={true} />
            </Box>
        </Container>
    );
};

export default Category;
