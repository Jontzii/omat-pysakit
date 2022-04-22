/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import LandingScreen from './landingScreen';

jest.mock('../header', () => () => null);
jest.mock('./screenSelectionInformation', () => () => null);
jest.mock('./screenSelection', () => () => null);

let container: any = null;
describe('NotFound', () => {
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

    test('Should render with two columns if width is more than 768px', async () => {
        render(<LandingScreen />, container);

        const column = screen.queryByTestId('column-view');

        expect(column).toHaveClass('hidden');
        expect(column).toHaveClass('md:grid');
    });

    test('Should render with two rows if width is less than 768px', async () => {
        render(<LandingScreen />, container);

        const row = screen.queryByTestId('row-view');

        expect(row).toHaveClass('grid');
        expect(row).toHaveClass('md:hidden');
    });
});
