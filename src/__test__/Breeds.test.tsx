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
global.fetch = jest.fn(async () => await Promise.resolve({
    json: () => act(async () => await Promise.resolve(MOCK_BREEDS))
}));

afterEach((() => {
    cleanup();
}));

afterAll(async () => {
    (fetch as jest.Mock).mockReturnValue(await Promise.resolve({}));
});

describe('Breeds Component', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockReset();
    });

    it('renders without crashing', () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => act(() => Promise.resolve(MOCK_BREEDS))
        });
        act(() => {
            render(<Breeds />);
        })
    });

    it('displays breeds after successful API call', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => act(() => Promise.resolve(MOCK_BREEDS))
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
            expect(screen.getByText('No breeds available')).toBeInTheDocument();
        });
    });

    it('allows breed selection and reset', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => act(() => Promise.resolve(MOCK_BREEDS))
        });
        act(() => {
            render(<Breeds />);
        })

        await waitFor(() => {
            fireEvent.click(screen.getByText("labrador yellow"));
            expect(screen.getByTestId("breed")).toBeInTheDocument();
        });
    });
});