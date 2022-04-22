/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import PageSpinner from './pageSpinner';

let container: any = null;
describe('PageSpinner', () => {
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        jest.clearAllMocks();
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Should render correct text', async () => {
        render(<PageSpinner />, container);

        const text = screen.queryByTestId('loading-text');
        await waitFor(() => expect(text).toHaveTextContent('Ladataan...'));
    });

    test('Should render spinner', async () => {
        render(<PageSpinner />, container);

        const spinner = screen.queryByTestId('loading-spinner');
        await waitFor(() => expect(spinner).toHaveClass('animate-spin'));
    });
});
