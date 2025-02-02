import "@testing-library/jest-dom"
import { fireEvent, render } from '@testing-library/react';

import ComponentMessage from '@/frontend/components/layouts/messages/confirmation';

import { listMessages } from "@/frontend/__test__/mocks/messages";

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

describe('Componente <Messages/>', () => {
    const setOpen = jest.fn();

    describe('Renderizacion correcta de mensajes', () => {
        test(`Cerrar modal correctamente`, () => {
            const component = render(
                <ComponentMessage
                    open={true}
                    setOpen={setOpen}
                    response={{ status: 500, info: { message: '' } }}
                />
            )

            const button = component.getByTitle('Boton cerrar');

            fireEvent.click(button);
            expect(setOpen).toHaveBeenCalledWith(false);
        })

        listMessages.map(message => {
            test(`Con status ${message.status}`, () => {
                const component = render(
                    <ComponentMessage
                        open={true}
                        setOpen={setOpen}
                        response={{ status: message.status, info: { message: message.text } }}
                    />
                )

                const button = component.getByRole('button', { name: 'Aceptar' });

                expect(button).toBeInTheDocument();

                fireEvent.click(button);
                expect(setOpen).toHaveBeenCalledWith(false);

                const elementMessage = component.getByText(message.text);
                expect(elementMessage).toBeInTheDocument();
            })
        })
    })
});