import React from 'react';
import { render, cleanup, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from "../App"

afterEach(cleanup);
const MOCK_BREEDS = {
    message: {
        labrador: ['yellow', 'black'],
        poodle: [],
    },
};

global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(MOCK_BREEDS))));

beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(MOCK_BREEDS)
    });
});

describe('App', () => {
    it('renders without crashing', async () => {
        act(() => {
            render(<App />);
        })
        await waitFor(() => {
            expect(screen).toBeDefined();
        });
    });
    it('renders Header component', async () => {
        act(() => {
            render(<App />);
        })
        await waitFor(() => {
            expect(screen.getByTestId('header')).toBeInTheDocument();
        });
    });
    it('renders Breeds component', async () => {
        act(() => {
            render(<App />);
        })
        await waitFor(() => {
            expect(screen.getByTestId('breeds')).toBeInTheDocument();
        });
    });
})
