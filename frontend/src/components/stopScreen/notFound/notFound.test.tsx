/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { useNavigate as useNavigateMock } from 'react-router';

import NotFound from './notFound';

jest.mock('react-router');

let container: any = null;
describe('NotFound', () => {
    const navigate = jest.fn();

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        (useNavigateMock as jest.Mock).mockImplementation(() => navigate);
    });

    afterEach(() => {
        // cleanup on exiting
        jest.clearAllMocks();
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Should render code, text and button', async () => {
        render(<NotFound />, container);
        const code = await screen.findByTestId('notfound-code');
        const text = await screen.findByTestId('notfound-text');
        const button = await screen.findByTestId('notfound-button');

        await waitFor(() => expect(code).toHaveTextContent('404'));
        await waitFor(() =>
            expect(text).toHaveTextContent('Näyttöä ei löytynyt')
        );
        await waitFor(() => expect(button).toHaveTextContent('Etusivulle'));
    });

    test('Should navigate to "/" when button is clicked', async () => {
        render(<NotFound />, container);
        const button = await screen.findByTestId('notfound-button');

        fireEvent.click(button);
        await waitFor(() => expect(navigate).toBeCalledWith('/'));
    });
});
