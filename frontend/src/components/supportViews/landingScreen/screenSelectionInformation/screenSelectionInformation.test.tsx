/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import ScreenSelectionInformation from './screenSelectionInformation';

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

    test('Should render correct text elements', async () => {
        render(<ScreenSelectionInformation />, container);

        const title = await screen.findByTestId('screenselection-title');
        const text1 = await screen.findByTestId('screenselection-text1');
        const text2 = await screen.findByTestId('screenselection-text2');

        await waitFor(() =>
            expect(title).toHaveTextContent('Luo itsellesi oma pysäkkinäyttö')
        );
        await waitFor(() => expect(text1).toBeTruthy());
        await waitFor(() => expect(text2).toBeTruthy());
    });
});
