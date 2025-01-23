import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import { APP_ROUTES } from '@/frontend/constant/app_rutes'
import { ItemsMain } from '@/frontend/constant/dashboard'
import { ItemsConfig } from '@/frontend/constant/dashboard'

import ComponentDashboardMain from '@/frontend/components/layouts/dashboard/main'
import ComponentTemplateDashboard from '@/frontend/components/partials/template/dashboard/container'

const mock_push = jest.fn();

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: () => ({
        push: mock_push
    })
}));

describe('Componente <DashboardMain/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<ComponentDashboardMain items={ItemsMain} />);
    });

    test('Renderizacion correcta en el Header', () => {
        Analyze(component);
    });

    test('Renderizacion correcta en los Items', () => {
        ItemsMain.forEach(item => {
            const title = component.getByTitle(item.title);
            const icons = component.getAllByTestId('icon-item');

            expect(title).toHaveAttribute('href', item.url);
            expect(component.getByText(item.title)).toBeInTheDocument();
            expect(component.getByText(item.description)).toBeInTheDocument();

            icons.map(icon => {
                fireEvent.mouseOver(title);
                fireEvent.mouseLeave(title);
                fireEvent.click(icon);
            });
        });
    });

    test('Renderizacion correcta loading Items', () => {
        component.rerender(<ComponentDashboardMain items={[]} />);

        const itemsLoading = component.getAllByTitle('Cargando...');

        itemsLoading.map(item => {
            expect(item).toBeInTheDocument();
        })
    });
})

describe('Componente <DashboardConfig/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<ComponentTemplateDashboard items={ItemsConfig} viewRedirect={true} />);
    });

    test('Renderizacion correcta en el Header', () => {
        Analyze(component);
    });

    test('Renderizacion correcta en los Items', () => {
        ItemsConfig.forEach(item => {
            expect(component.getByText(item.title)).toBeInTheDocument()
            expect(component.getByTitle(item.title)).toHaveAttribute('href', item.url);
            expect(component.getByText(item.description)).toBeInTheDocument()
        })
    });

    test('Redirigir a la ruta correcta', () => {
        const volver = component.getByTitle("Volver atras");

        fireEvent.click(volver);

        expect(mock_push).toHaveBeenCalledWith(APP_ROUTES.dashboard.main);
    });
})

function Analyze(component: RenderResult) {
    const title = component.getByText("Panel de Control");
    const subtitle = component.getByText("Organiza tu mundo, mantente al tanto de lo más importante.");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
}