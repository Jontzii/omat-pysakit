/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import AppHeader from './header';

jest.mock('react-router');

let container: any = null;
describe('AppHeader', () => {
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

    test('Should render button with text "Omat Pysäkit"', async () => {
        render(<AppHeader />, container);
        const title = screen.queryByTestId('logo-button');
        await waitFor(() => expect(title).toHaveTextContent('Omat Pysäkit'));
    });

    test.todo('Should navigate user to "/" when logo button is clicked');
    test.todo('Should render button that opens menu');
    test.todo('Should change menuOpen state when menu button is clicked');
});
