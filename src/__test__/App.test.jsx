import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from "../App"

afterEach(cleanup);

test('renders wtesthout crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
});
test('renders Header component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('header')).toBeInTheDocument();
});
test('renders Breeds component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('breeds')).toBeInTheDocument();
});
