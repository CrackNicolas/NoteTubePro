import { act } from 'react-dom/test-utils';

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import es from "@/shared/i18n/es/global.json";

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { categorys } from '@/frontend/__test__/mocks/categorys';
import { PropsResponse } from '@/shared/types/response';

import ComponentCategory from '@/frontend/components/layouts/category/container';

const mock = new MockAdapter(axios);

mock.onPut('/api/categorys').reply(200, {
    status: 200,
    info: {
        message: 'Categoria modificada'
    }
});

mock.onGet('/api/categorys').reply<PropsResponse>(200, {
    status: 200,
    details: categorys
});

describe('Category component', () => {

    beforeEach(async () => {
        await act(async () => {
            render(
                <I18nextProvider i18n={i18next}>
                    <ComponentCategory />
                </I18nextProvider>
            );
        });
    });

    test('header component renders correctly', async () => {
        expect(await screen.findByText(es.categories.title)).toBeInTheDocument();
        expect(await screen.findByText(es.categories.subtitle)).toBeInTheDocument();
    });

    describe('List component', () => {
        test('renders correctly button goback', async () => {
            const buttonGoBack = await screen.findByTitle(es.dashboard.button);

            expect(buttonGoBack).toBeInTheDocument();
            fireEvent.click(buttonGoBack);
        });

        test('successful category modification', async () => {
            const selectCategory = await screen.findByTitle(`${es.categories.default} ${es.categories.items.plane}`);

            expect(selectCategory).toBeInTheDocument();
            await waitFor(() => {
                fireEvent.click(selectCategory);
            });
        });
    });
});