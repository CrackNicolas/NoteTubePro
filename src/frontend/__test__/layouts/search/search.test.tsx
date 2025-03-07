import { act } from 'react-dom/test-utils';

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import es from "@/shared/i18n/es/global.json";

import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from '@testing-library/react'

import { categorys } from '@/frontend/__test__/mocks/categorys';;
import { note, notes } from '@/frontend/__test__/mocks/notes';
import { ValueBoolean } from '@/frontend/enums/boolean';
import { PropsResponse } from '@/shared/types/response';

import ComponentSearch from '@/frontend/components/layouts/search/container';

const mock = new MockAdapter(axios);

mock.onGet("/api/notes").reply(200, { status: 200, details: notes });

mock.onGet(/\/api\/notes\/(.+)/).reply((config) => {
    const segment = config.url?.match(/\/api\/notes\/(.+)/)?.[1];
    const criteria = JSON.parse(segment || "{}");

    return [200, { status: 200, details: notes }];
});

mock.onGet('/api/categorys/true').reply<PropsResponse>(200, {
    status: 200,
    details: categorys
});

mock.onDelete(/\/api\/notes\/(.+)/).reply(() => {
    return [200, { status: 200, details: note }];
});

describe('Search component', () => {

    beforeEach(async () => {
        await act(async () => {
            render(
                <I18nextProvider i18n={i18next}>
                    <ComponentSearch />
                </I18nextProvider>
            );
        });
    });

    describe('nav component', () => {
        test('input search component renders correctly', async () => {
            const inputSearch = screen.getByPlaceholderText(`${es.search.nav.input_search}...`);

            expect(inputSearch).toBeInTheDocument();
            expect(await screen.findByTitle(es.search.nav.icon)).toBeInTheDocument();

            await userEvent.type(inputSearch, notes[0].title);
            expect(inputSearch).toHaveValue(notes[0].title);

            await userEvent.clear(inputSearch);
            expect(inputSearch).toHaveValue("");
            await userEvent.type(inputSearch, "****");

            const classesToError = ['dark:text-dark-error', 'text-error', 'dark:border-dark-error', 'border-error'];

            classesToError.forEach((cls: string) => {
                expect(inputSearch.classList.contains(cls)).toBe(true);
            });
        });

        test('button create component renders correctly', async () => {
            expect(await screen.findByText(es.search.nav.buttons.create)).toBeInTheDocument();
            expect(screen.getByText(es.search.nav.buttons.create)).toBeInTheDocument();
        });

        describe('Correct flow', () => {
            test('button delete component renders correctly', async () => {
                const buttonDelete = await screen.findByTitle(es.search.nav.buttons.delete.text_2);
                expect(buttonDelete).toBeInTheDocument();
                fireEvent.click(buttonDelete);

                const buttonSelectedNotesAll = await screen.findByTitle(es.search.nav.buttons.mark.text_1);
                expect(buttonSelectedNotesAll).toBeInTheDocument();
                fireEvent.click(buttonSelectedNotesAll);

                const buttonConfirmationDeleteNotesAll = await screen.findByTitle(es.search.nav.buttons.delete.text_1);
                expect(buttonConfirmationDeleteNotesAll).toBeInTheDocument();
                fireEvent.click(buttonConfirmationDeleteNotesAll);

                const buttonUnselectedNotesAll = await screen.findByTitle(es.search.nav.buttons.mark.text_2);
                expect(buttonUnselectedNotesAll).toBeInTheDocument();
                fireEvent.click(buttonUnselectedNotesAll);

                const buttonCloseDelete = await screen.findByTitle(es.search.nav.buttons.close.text_2);
                expect(buttonCloseDelete).toBeInTheDocument();
                fireEvent.click(buttonCloseDelete);
            });

            test('modal delete renders correctly', async () => {
                const buttonDelete = await screen.findByTitle(es.search.nav.buttons.delete.text_2);
                fireEvent.click(buttonDelete);

                const buttonSelectedNotesAll = await screen.findByTitle(es.search.nav.buttons.mark.text_1);
                fireEvent.click(buttonSelectedNotesAll);

                const buttonConfirmationDeleteNotesAll = await screen.findByTitle(es.search.nav.buttons.delete.text_1);
                fireEvent.click(buttonConfirmationDeleteNotesAll);

                const modal = await screen.findByTitle('modal');
                expect(modal).toBeInTheDocument();

                const buttonNot = screen.getByRole('button', { name: ValueBoolean.NOT });
                const buttonConfirmationModal = screen.getByRole('button', { name: ValueBoolean.YEAH });

                expect(buttonNot).toBeInTheDocument();
                expect(buttonConfirmationModal).toBeInTheDocument();
                expect(await screen.findByTitle(es.messages.modal.button)).toBeInTheDocument();
                expect(await screen.findByTitle(es.messages.confirmation.title)).toBeInTheDocument();

                fireEvent.click(buttonNot);
            });

            test('modal action delete notes all renders correctly', async () => {
                const buttonDelete = await screen.findByTitle(es.search.nav.buttons.delete.text_2);
                fireEvent.click(buttonDelete);

                const buttonSelectedNotesAll = await screen.findByTitle(es.search.nav.buttons.mark.text_1);
                fireEvent.click(buttonSelectedNotesAll);

                const buttonConfirmationDeleteNotesAll = await screen.findByTitle(es.search.nav.buttons.delete.text_1);
                fireEvent.click(buttonConfirmationDeleteNotesAll);

                const buttonConfirmationDeleteModal = screen.getByRole('button', { name: ValueBoolean.YEAH });

                await act(async () => {
                    fireEvent.click(buttonConfirmationDeleteModal);
                })
            });

            test('modal action delete note renders correctly', async () => {
                const buttonDelete = await screen.findByTitle(es.search.nav.buttons.delete.text_2);
                fireEvent.click(buttonDelete);

                fireEvent.click(screen.getByText(notes[0].title));
                fireEvent.click(screen.getByText(notes[1].title));
                fireEvent.click(screen.getByText(notes[0].title));

                const buttonConfirmationDeleteNotesAll = await screen.findByTitle(es.search.nav.buttons.delete.text_1);
                fireEvent.click(buttonConfirmationDeleteNotesAll);

                const buttonConfirmationDeleteModal = screen.getByRole('button', { name: ValueBoolean.YEAH });

                await act(async () => {
                    fireEvent.click(buttonConfirmationDeleteModal);
                });
            });
        });

        describe('toggle component', () => {
            test('button filter component renders correctly', async () => {
                const buttonToggle = await screen.findByTitle(es.search.toggle.title);

                expect(buttonToggle).toBeInTheDocument();
                fireEvent.click(buttonToggle);

                const buttonClose = await screen.findByTitle(es.search.toggle.buttons.close);
                const buttonRestart = await screen.findByTitle(es.search.toggle.buttons.clean);

                expect(buttonClose).toBeInTheDocument();
                expect(buttonRestart).toBeInTheDocument();

                fireEvent.click(buttonRestart);
                fireEvent.click(buttonClose);
            });

            test('view filter component renders correctly', async () => {
                const buttonToggle = await screen.findByTitle(es.search.toggle.title);

                fireEvent.click(buttonToggle);

                const selectOrder = await screen.findByTitle(es.search.toggle.selects.order.default);
                const selectDate = await screen.findByTitle(es.search.toggle.selects.date.default);
                const selectPriority = await screen.findByTitle(es.search.toggle.selects.priority);
                const selectFeatured = await screen.findByTitle(es.search.toggle.selects.highlight);
                const selectCategory = await screen.findByTitle(es.search.toggle.selects.category);

                expect(selectOrder).toBeInTheDocument();
                expect(selectDate).toBeInTheDocument();
                expect(selectPriority).toBeInTheDocument();
                expect(selectFeatured).toBeInTheDocument();
                expect(selectCategory).toBeInTheDocument();

                fireEvent.click(selectCategory);
                fireEvent.click(selectOrder);

                const selectedItemOrder = await screen.findByTitle(es.search.toggle.selects.order.options['a-z']);

                await act(async () => {
                    fireEvent.click(selectedItemOrder);
                });

                const selectedItemCategory = await screen.findByTitle(es.categories.items.plane);

                await act(async () => {
                    fireEvent.click(selectedItemCategory);
                    fireEvent.click(selectedItemCategory);
                });
            });
        })
    });

    describe('list component', () => {
        test('notes component renders correctly', async () => {
            const timesElapsedDefaultNote = await screen.findAllByTitle(es.notes.form.note.time_elapsed);
            expect(timesElapsedDefaultNote.length).toBe(notes.length);

            const buttonsEditDefaultNote = await screen.findAllByTitle(es.notes.form.note.button);
            expect(buttonsEditDefaultNote.length).toBe(notes.length);

            notes.forEach((note) => {
                expect(screen.getByText(note.title)).toBeInTheDocument();
                expect(screen.getByText(note.description)).toBeInTheDocument();
            });
        });

        test('view note component', async () => {
            fireEvent.click(screen.getByText(notes[0].title));

            expect(await screen.findByTitle(notes[0].title)).toBeInTheDocument();
            expect(await screen.findByTitle(notes[0].description)).toBeInTheDocument();
            expect(await screen.findByTitle(es.notes.form.note.view.date)).toBeInTheDocument();
        });

        test('edit note component', async () => {
            const buttonsEdit = screen.getAllByRole('button', { name: es.notes.form.note.button });
            fireEvent.click(buttonsEdit[0]);
        });
    });
});