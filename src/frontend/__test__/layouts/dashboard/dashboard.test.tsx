import '@testing-library/jest-dom'
import { render, RenderResult } from '@testing-library/react'

import { ItemsMain } from '@/frontend/constant/dashboard'
import { ItemsConfig } from '@/frontend/constant/dashboard'

import ComponentDashboardMain from '@/frontend/components/layouts/dashboard/main'
import ComponentTemplateDashboard from '@/frontend/components/partials/template/dashboard/container'
import { I18nextProvider } from 'react-i18next'

import i18next from "i18next";
import useAppTranslation from '@/shared/hooks/translation'

const mock_push = jest.fn();

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: () => ({
        push: mock_push
    })
}));

const { translate } = useAppTranslation();

describe('Componente <DashboardMain/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<I18nextProvider i18n={i18next}>
            <ComponentDashboardMain items={ItemsMain} />
        </I18nextProvider>);
    });

    test('Renderizacion correcta en el Header', () => {
        Analyze(component);
    });
})

describe('Componente <DashboardConfig/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<I18nextProvider i18n={i18next}>
            <ComponentTemplateDashboard items={ItemsConfig} viewRedirect={true} />
        </I18nextProvider>);
    });

    test('Renderizacion correcta en el Header', () => {
        Analyze(component);
    });
    
})

function Analyze(component: RenderResult) {
    const title = component.getByText(translate('dashboard.title'));
    const subtitle = component.getByText(translate('dashboard.subtitle'));

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
}