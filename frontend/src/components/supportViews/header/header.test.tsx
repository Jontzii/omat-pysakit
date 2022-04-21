/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState as useStateMock } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { useNavigate as useNavigateMock } from 'react-router';

import AppHeader from './header';

jest.mock('react-router');

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

let container: any = null;
describe('AppHeader', () => {
    const setShowModal = jest.fn();
    const navigate = jest.fn();

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        (useStateMock as jest.Mock).mockImplementation((showModal: boolean) => [
            showModal,
            setShowModal
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

    test('Should render button with text "Omat Pysäkit"', async () => {
        render(<AppHeader />, container);
        const title = screen.queryByTestId('logo-button');
        await waitFor(() => expect(title).toHaveTextContent('Omat Pysäkit'));
    });

    test('Should navigate user to "/" when logo button is clicked', async () => {
        render(<AppHeader />, container);
        const title = await screen.findByTestId('logo-button');

        fireEvent.click(title);
        expect(navigate).toBeCalledWith('/');
    });

    test('Should render button that opens modal', async () => {
        render(<AppHeader />, container);
        const button = screen.queryByTestId('modal-button');
        await waitFor(() => expect(button).toBeTruthy());
    });

    test('Should change showModal state when menu button is clicked', async () => {
        render(<AppHeader />, container);
        const button = await screen.findByTestId('modal-button');

        fireEvent.click(button);
        expect(setShowModal).toBeCalledWith(true);
    });
});
