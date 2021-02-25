import React from 'react';
import { Container, Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    links: {
        margin: 'auto',
    },
    linkWrapper: {
        position: 'relative',
        textDecoration: 'none',
    },
    linkImage: {
        maxWidth: '100%',
        transitionDuration: theme.transitions.duration.shorter,
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
    linkTitle: {
        position: 'absolute',
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        right: theme.spacing(1),
        backgroundColor: 'rgba(0,0,0,0.95)',
        color: '#fff',
        textDecoration: 'none',
        padding: theme.spacing(1),
    },
}));

const Home = () => {
    const classes = useStyles();

    const categories = [
        {
            name: 'Gloves',
            page: 'gloves',
            img: 'gloves.jpg',
        },
        {
            name: 'Face masks',
            page: 'face-masks',
            img: 'face_mask.jpg',
        },
        {
            name: 'Beanies',
            page: 'beanies',
            img: 'beanie.jpg',
        },
    ];

    return (
        <Container>
            <Box my={2}>
                <Typography variant='h1' component='h1' gutterBottom>
                    ImagiClothes Warehouse
                </Typography>
            </Box>
            <Box my={2}>
                <Typography variant='h2' gutterBottom>
                    Available categories
                </Typography>
                <Grid container spacing={2} className={classes.links}>
                    {categories.map((category) => (
                        <Grid
                            item
                            key={category.img}
                            xs={6}
                            md={4}
                            className={classes.linkWrapper}
                            component={Link}
                            to={`/${category.page}`}>
                            <Box overflow='hidden'>
                                <img
                                    src={`/images/${category.img}`}
                                    alt={category.name}
                                    className={classes.linkImage}
                                />
                                <div className={classes.linkTitle}>{category.name}</div>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;
