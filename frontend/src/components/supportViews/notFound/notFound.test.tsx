/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { useNavigate as useNavigateMock } from 'react-router';

import NotFound from './notFound';

jest.mock('react-router');

let container: any = null;
describe('AppHeader', () => {
    const setShowModal = jest.fn();
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

    test('Should render correct text', async () => {
        render(<NotFound />, container);
        const code = screen.queryByTestId('404-text');
        const text = screen.queryByTestId('explainer-text');
        await waitFor(() => expect(code).toHaveTextContent('404'));
        await waitFor(() =>
            expect(text).toHaveTextContent('Sivua ei löytynyt')
        );
    });

    test('Should navigate user to "/" when button is clicked', async () => {
        render(<NotFound />, container);
        const button = await screen.findByTestId('navigate-button');

        fireEvent.click(button);
        expect(navigate).toBeCalledWith('/');
    });
});
