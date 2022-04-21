/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState as useStateMock } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import InfoModal from './infoModal';

let container: any = null;
describe('InfoModal', () => {
    const setShowModal = jest.fn();

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

    test('Should not display modal when showModal is false', async () => {
        render(
            <InfoModal showModal={false} setShowModal={setShowModal} />,
            container
        );
        const modal = screen.queryByTestId('modal-info');
        await waitFor(() => expect(modal).toBeFalsy());
    });

    test('Should display modal when showModal is true', async () => {
        render(
            <InfoModal showModal={true} setShowModal={setShowModal} />,
            container
        );
        const modal = screen.queryAllByTestId('modal-info');
        await waitFor(() => expect(modal[0]).toHaveTextContent('Tietoja'));
    });

    test('Should close modal when close-button is clicked', async () => {
        render(
            <InfoModal showModal={true} setShowModal={setShowModal} />,
            container
        );
        const button = screen.queryAllByTestId('close-button');
        fireEvent.click(button[0]);

        expect(setShowModal).toHaveBeenCalledWith(false);
    });
});
