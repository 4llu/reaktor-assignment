import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Page renders at all', () => {
    render(<App />);
});
