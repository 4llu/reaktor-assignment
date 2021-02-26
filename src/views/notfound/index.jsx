import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';

const Home = () => {
    return (
        <Container>
            <Box my={2}>
                <Typography variant='h1' component='h1' gutterBottom>
                    404 Page Not Found
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
