import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '../src/app/page'

// Mock global fetch
global.fetch = jest.fn((url) => {
    if (url === '/api/hello') {
        return Promise.resolve({
            json: () => Promise.resolve({ message: 'Mock Next.js' }),
        }) as Promise<Response>;
    }
    if (url === 'http://localhost:8000/') {
        return Promise.resolve({
            json: () => Promise.resolve({ message: 'Mock FastAPI' }),
        }) as Promise<Response>;
    }
    return Promise.reject(new Error('Unknown URL'));
});

describe('Home Page', () => {
    it('renders and fetches messages', async () => {
        render(<Home />)

        expect(screen.getByText('Backend Connectivity Test')).toBeInTheDocument();

        // Check initial loading state
        expect(screen.getAllByText('Loading...')).toHaveLength(2);

        // Wait for messages to load
        await waitFor(() => {
            expect(screen.getByTestId('next-msg')).toHaveTextContent('Mock Next.js');
            expect(screen.getByTestId('fastapi-msg')).toHaveTextContent('Mock FastAPI');
        });
    })
})
