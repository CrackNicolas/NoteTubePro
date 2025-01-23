import '@testing-library/jest-dom'

import { RenderResult, render } from '@testing-library/react'

import { APP_ROUTES } from '@/frontend/constant/app_rutes'

import ComponentHome from '@/frontend/components/layouts/home/container'

describe('Componente <Home/>', () => {
    test('Renderizacion correcta', () => {
        const component = render(<ComponentHome />);
        Analyze(component, APP_ROUTES.dashboard.main);
    })
})

function Analyze(component: RenderResult, url: string): void {
    const logo = component.getByTestId("icon-home");
    const title = component.getByText('Aplicación de notas');
    const subtitle = component.getByText('¡Organiza tu vida, toma notas sin límites!');
    const link = component.getByRole("link");
    const version = component.getByText(`Version ${process.env.PROJECT_VERSION}`);

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', url);
    expect(version).toBeInTheDocument();
}