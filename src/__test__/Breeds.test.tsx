import React from 'react';
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent, cleanup, screen, act } from '@testing-library/react';
import { Breeds } from '../Breeds';

const MOCK_BREEDS = {
    message: {
        labrador: ['yellow', 'black'],
        poodle: [],
    },
};

global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(MOCK_BREEDS))));

describe('Breeds Component', () => {
    it('displays breeds after successful API call', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(MOCK_BREEDS)
        });

        act(() => {
            render(<Breeds />);
        })
        await waitFor(() => {
            expect(screen.getByText('labrador yellow')).toBeInTheDocument();
            expect(screen.getByText('labrador black')).toBeInTheDocument();
            expect(screen.getByText('poodle')).toBeInTheDocument();
        });
    });

    it('handles API call failure gracefully', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.reject(new Error('API call failed'))
        })

        act(() => {
            render(<Breeds />);
        })

        await waitFor(() => {
            expect(screen.getByText('No items found')).toBeInTheDocument();
        });
    });

    it('allows breed selection', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(MOCK_BREEDS)
        });
        act(() => {
            render(<Breeds />);
        })

        await waitFor(() => {
            expect(screen.getByTestId("breed-items-container")).toBeInTheDocument();
            fireEvent.click(screen.getByText("labrador yellow"));
            expect(screen.getByTestId("breed")).toBeInTheDocument();
        });
    });
});