import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import ComponentList from "@/frontend/components/layouts/category/list/container"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"

import { categorys } from '@/frontend/__test__/mocks/categorys'

const mock = new MockAdapter(axios);

mock.onPut('/api/categorys').reply(200, {
    status: 200,
    info: {
        message: 'Categoria modificada'
    }
});

const mock_push = jest.fn();

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: () => ({
        push: mock_push
    })
}));

describe('Componente <Category/>', () => {
    const setRestart = jest.fn();

    test('Renderizacion correcta en el Header', () => {
        const { getByText } = render(<ComponentHeader title="Categorias de notas" subtitle="Selecciona las categorias que deseas agregar o quitar de tus notas" />)

        const title = getByText("Categorias de notas");
        const subtitle = getByText("Selecciona las categorias que deseas agregar o quitar de tus notas");

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
    });

    test('Renderizacion correcta loading Items', () => {
        const { getAllByTitle } = render(<ComponentList categorys={[]} setRestart={setRestart} />);

        const items_loading = getAllByTitle('Cargando...');

        items_loading.map(item => {
            expect(item).toBeInTheDocument();
        })
    });

    describe('Renderizacion correcta en la <List/>', () => {
        const setRestart = jest.fn();
        let component: RenderResult;

        beforeEach(() => {
            component = render(<ComponentList categorys={categorys} setRestart={setRestart} />);
        });

        test('Redirigir a la ruta correcta', () => {
            const volver = component.getByTitle("Volver atras");

            fireEvent.click(volver);

            expect(mock_push).toHaveBeenCalledWith('/dashboard/config');
        });

    });
})