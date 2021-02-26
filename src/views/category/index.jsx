import React from 'react';
import { Container, Box, Typography, Tooltip, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useParams } from 'react-router-dom';

import './style.css';

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

const rows = [
    {
        availability: 'In stock',
        id: '123',
        name: 'Ganzo mittens',
        colors: 'green, brown, red, grey, blue, white',
        manufacturer: 'Adidas',
        price: 134,
    },
    {
        availability: 'yes',
        id: '345',
        name: 'Ganzo mittens',
        colors: 'green',
        manufacturer: 'Adidas',
        price: 134,
    },
    {
        availability: 'no',
        id: '234',
        name: 'Ganzo mittens',
        colors: 'green',
        manufacturer: 'Adidas',
        price: 134,
    },
    {
        availability: 'no',
        id: '1234',
        name: 'Ganzo mittens',
        colors: 'green',
        manufacturer: 'Adidas',
        price: 134,
    },
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

    return (
        <Container>
            <Box my={2}>
                <Typography variant='h1' component='h1' className={classes.title} gutterBottom>
                    {category}
                </Typography>
            </Box>
            <Box my={2}>
                <DataGrid rows={rows} columns={columns} classes={{ row: classes.row }} autoHeight={true} />
            </Box>
        </Container>
    );
};

export default Category;