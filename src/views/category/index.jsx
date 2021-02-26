import React, { useEffect } from 'react';
import { Container, Box, Typography, Tooltip, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import { getCategoryProducts } from '../../redux/categories/actions';
import NotFound from '../notfound';

const availabilityIconState = (value) => {
    if (value == 'Out of stock') {
        return ', no';
    } else if (value == 'Less than 10') {
        return ', less';
    } else if (value == 'In stock') {
        return '';
    } else {
        return ', waiting';
    }
};

const columns = [
    {
        field: 'availability',
        headerName: 'Availability',
        width: 170,
        renderCell: (params) => (
            <div className='availability-wrapper'>
                <div className={`availability-icon ${availabilityIconState(params.value)}`} />
                {params.value}
            </div>
        ),
    },
    {
        field: 'id',
        headerName: 'ID',
        width: 240,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <span className='table-cell-truncate small'>{params.value}</span>
            </Tooltip>
        ),
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 210,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <span className='table-cell-truncate'>{params.value}</span>
            </Tooltip>
        ),
    },
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
    { field: 'price', headerName: 'Price', type: 'number', width: 130, renderCell: (params) => `${params.value}.00 €` },
];

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
    const categoryDefinition = useSelector((state) => state.categories.categories.find((e) => e.page == category));
    const rows = useSelector((state) => state.categories[category]);
    const dispatch = useDispatch();

    if (!categoryDefinition) {
        return <NotFound />;
    }
    const title = categoryDefinition.name;

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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    classes={{ row: classes.row }}
                    autoHeight={true}
                    loading={rows.length == 0}
                />
            </Box>
        </Container>
    );
};

export default Category;
