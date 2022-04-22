/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState as useStateMock } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { useNavigate as useNavigateMock } from 'react-router';

import ScreenSelection from './screenSelection';

jest.mock('react-router');
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));
jest.mock('./screenForm', () => {
    const dummyForm = () => <div data-testid="screenForm"></div>;
    return dummyForm;
});
jest.mock('../../../uiElements/loadingSpinner', () => {
    const dummySpinner = () => <div data-testid="loadingSpinner"></div>;
    return dummySpinner;
});

let container: any = null;
describe('AppHeader', () => {
    const setLoading = jest.fn();
    const navigate = jest.fn();

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        (useStateMock as jest.Mock).mockImplementation((isLoading: boolean) => [
            isLoading,
            setLoading
        ]);

        (useNavigateMock as jest.Mock).mockImplementation(() => navigate);
    });

    afterEach(() => {
        // cleanup on exiting
        jest.clearAllMocks();
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Should render text and ScreenForm', async () => {
        render(<ScreenSelection />, container);
        const title = await screen.findByTestId('screenForm-test');
        const form = await screen.findByTestId('screenForm');

        await waitFor(() =>
            expect(title).toHaveTextContent('Avaa olemassa oleva näyttö')
        );
        await waitFor(() => expect(form).toBeTruthy());
    });

    test('Should render text and button with text', async () => {
        render(<ScreenSelection />, container);
        const title = await screen.findByTestId('createScreen-text');
        const button = await screen.findByTestId('createScreen-button');

        await waitFor(() =>
            expect(title).toHaveTextContent('Luo uusi pysäkkinäyttö')
        );
        await waitFor(() =>
            expect(button).toHaveTextContent('Luo uusi näyttö')
        );
    });

    test('Should navigate to "/createScreen" when button is clicked', async () => {
        render(<ScreenSelection />, container);
        const button = await screen.findByTestId('createScreen-button');

        fireEvent.click(button);
        await waitFor(() => expect(navigate).toBeCalledWith('/createScreen'));
    });

    test('Should display LoadingSpinner when isLoading is true', async () => {
        (useStateMock as jest.Mock).mockImplementation((isLoading: boolean) => [
            true,
            setLoading
        ]);

        render(<ScreenSelection />, container);
        const spinner = await screen.findByTestId('loadingSpinner');
        await waitFor(() => expect(spinner).toBeTruthy());
    });
});
