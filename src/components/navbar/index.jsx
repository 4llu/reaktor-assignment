import React from 'react';
import { Grid, Box, Link, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.grey[100],
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    logo: {
        height: theme.spacing(2),
    },
    navLink: {
        paddingLeft: theme.spacing(1),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
        transitionDuration: theme.transitions.duration.shortest,
        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
        },
    },
}));

const categories = [
    {
        name: 'Gloves',
        page: 'gloves',
    },
    {
        name: 'Face masks',
        page: 'face-masks',
    },
    {
        name: 'Beanies',
        page: 'beanies',
    },
];

const Navbar = (props) => {
    const classes = useStyles(props);

    return (
        <Box px={4} py={1} className={classes.wrapper} component='header'>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                    <Link to='/' component={RouterLink}>
                        <img className={classes.logo} src='/images/logo.png' />
                    </Link>
                </Grid>
                <Grid item>
                    <nav>
                        {categories.map((category) => (
                            <Link
                                key={category.page}
                                to={`/category/${category.page}`}
                                component={RouterLink}
                                className={classes.navLink}>
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Navbar;
