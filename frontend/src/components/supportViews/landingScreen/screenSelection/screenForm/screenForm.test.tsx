/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState as useStateMock } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { useNavigate as useNavigateMock } from 'react-router';
import { checkIfScreenExists } from '../../../../../services/screenService';

import ScreenForm from './screenForm';

jest.mock('react-router');
jest.mock('../../../../../services/screenService');
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));
jest.mock('../../../../uiElements/loadingSpinner', () => {
    const dummySpinner = () => <div data-testid="loadingSpinner"></div>;
    return dummySpinner;
});

let container: any = null;
describe('ScreenForm', () => {
    const setUuid = jest.fn();
    const setLoading = jest.fn();
    const navigate = jest.fn();

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        (useStateMock as jest.Mock).mockImplementation((uuid: string) => [
            uuid,
            setUuid
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

    test('Should render input field and button', async () => {
        render(<ScreenForm />, container);

        const input = await screen.findByTestId('screenForm-input');
        const button = await screen.findByTestId('screenForm-button');

        await waitFor(() => expect(input).toBeTruthy());
        await waitFor(() => expect(button).toBeTruthy());
    });

    test('Should call setUuid when input is typed', async () => {
        render(<ScreenForm />, container);

        const input = await screen.findByTestId('screenForm-input');
        userEvent.type(input, 'f');

        await waitFor(() => expect(setUuid).toBeCalled());
    });

    test('Should display LoadingSpinner if isLoading is true', async () => {
        (useStateMock as jest.Mock).mockImplementation((isLoading: boolean) => [
            true,
            setLoading
        ]);

        render(<ScreenForm />, container);
        const spinner = await screen.findByTestId('loadingSpinner');

        await waitFor(() => expect(spinner).toBeTruthy());
    });

    test('Should navigate to screen if found when button is clicked', async () => {
        (checkIfScreenExists as jest.Mock).mockResolvedValue(true);
        (useStateMock as jest.Mock).mockImplementationOnce((uuid: string) => [
            'foo',
            setUuid
        ]);

        render(<ScreenForm />, container);

        const button = await screen.findByTestId('screenForm-button');
        fireEvent.click(button);

        await waitFor(() => expect(navigate).toBeCalled());
    });
});
