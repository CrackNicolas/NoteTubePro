import { act } from 'react-dom/test-utils';

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import es from "@/shared/i18n/es/global.json";

import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { note } from '@/frontend/__test__/mocks/notes';
import { categorys } from '@/frontend/__test__/mocks/categorys';
import { PropsResponse } from '@/shared/types/response';

import ComponentNotes from '@/frontend/components/layouts/notes/container';

const mock = new MockAdapter(axios);

mock.onGet('/api/categorys/true').reply<PropsResponse>(200, {
    status: 200,
    details: categorys
});

mock.onPost('/api/notes').reply<PropsResponse>(201, {
    status: 201,
    info: {
        message: 'Nota creada'
    }
});

mock.onPut('/api/notes').reply(200, {
    status: 200,
    info: {
        message: 'Nota editada'
    }
});

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe('Notes component', () => {

    beforeEach(async () => {
        await act(async () => {
            render(
                <I18nextProvider i18n={i18next}>
                    <ComponentNotes />
                </I18nextProvider>
            );
        });
    });

    test('header component renders correctly', async () => {
        expect(await screen.findByText(es.notes.title)).toBeInTheDocument();
        expect(await screen.findByText(es.notes.subtitle)).toBeInTheDocument();
    });

    describe('Correct flow', () => {
        test('category component renders correctly', async () => {
            await waitFor(async () => {
                fireEvent.click(await screen.findByTitle(`${es.categories.default} ${es.categories.items.plane}`));

                const buttonGoBack = await screen.findByTitle(es.dashboard.button);

                expect(buttonGoBack).toBeInTheDocument();
                fireEvent.click(buttonGoBack);
            });
        });

        test('form component renders correctly', async () => {
            const category = await screen.findByTitle(`${es.categories.default} ${es.categories.items.plane}`);

            await waitFor(async () => {
                fireEvent.click(category);

                expect(await screen.findByTitle(es.notes.form.title.details)).toBeInTheDocument();
                expect(screen.getByText(es.notes.form.title.create)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.items.title.label)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.items.description.label)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.items.priority.label)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.items.featured.title)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.items.image.title.init)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.items.image.upload.text_1)).toBeInTheDocument();
                expect(await screen.findByTitle(es.notes.form.buttons.create)).toBeInTheDocument();

                expect(screen.getByPlaceholderText(`${es.notes.form.items.title.input}...`)).toBeInTheDocument();
                expect(screen.getByPlaceholderText(`${es.notes.form.items.description.input}...`)).toBeInTheDocument();

                const file = new File(["dummy content"], "imagen.png", { type: "image/png" });
                const fileUpload = screen.getByTestId('file-upload');

                fireEvent.change(fileUpload, { target: { files: [file] } });
                expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);

                const removeFile = await screen.findByTitle(es.notes.form.items.image.button);
                fireEvent.click(removeFile);

                const buttonCreate = screen.getByRole('button', { name: es.notes.form.buttons.create });
                const buttonClose = screen.getByRole('button', { name: es.notes.form.buttons.close });

                expect(buttonCreate).toBeInTheDocument();
                expect(buttonClose).toBeInTheDocument();
                fireEvent.click(buttonClose);
            });
        });

        test('form component create note renders correctly', async () => {
            const category = await screen.findByTitle(`${es.categories.default} ${es.categories.items.plane}`);
            fireEvent.click(category);

            const priority = await screen.findByTitle(es.notes.form.items.priority.options.alta);
            const inputTitle = await screen.findByPlaceholderText(`${es.notes.form.items.title.input}...`);
            const inputDescription = await screen.findByPlaceholderText(`${es.notes.form.items.description.input}...`);
            const buttonCreate = screen.getByText(es.notes.form.buttons.create);

            await userEvent.type(inputTitle, note.title);
            await userEvent.type(inputDescription, note.description);

            expect(inputTitle).toHaveValue(note.title);
            expect(inputDescription).toHaveValue(note.description);

            fireEvent.click(priority);

            await act(async () => {
                fireEvent.click(buttonCreate);
            });
        });
    });
});