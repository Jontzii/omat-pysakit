/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import Header from './header';
import { act } from 'react-dom/test-utils';

let container: any = null;
describe('Header', () => {
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

    test('Should display stop name', async () => {
        const stops = ['stop1'];
        jest.useFakeTimers();

        render(<Header stops={stops} />, container);

        const stopName = await screen.findByTestId('header-stop');
        await waitFor(() => expect(stopName).toHaveTextContent('stop1'));
    });

    test('Should switch between stops when timer fires', async () => {
        const stops = ['stop1', 'stop2'];
        jest.useFakeTimers();

        render(<Header stops={stops} />, container);
        const stopName = await screen.findByTestId('header-stop');

        await waitFor(() => expect(stopName).toHaveTextContent('stop1'));

        act(() => {
            jest.runOnlyPendingTimers();
        });

        await waitFor(() => expect(stopName).toHaveTextContent('stop2'));
    });
});
