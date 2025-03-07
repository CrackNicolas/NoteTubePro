import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import es from "@/shared/i18n/es/global.json";

import { fireEvent, render, screen } from "@testing-library/react";

import { ItemsMain } from "@/frontend/constant/dashboard";

import ComponentTemplateDashboard from '@/frontend/components/partials/template/dashboard/container';

describe("Dashboard component", () => {
    test("renders correctly", async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ComponentTemplateDashboard header={{ title: es.dashboard.title, subtitle: es.dashboard.subtitle }} items={[]} viewRedirect={true} />
            </I18nextProvider>
        );

        const buttonGoBack = await screen.findByTitle(es.dashboard.button);

        expect(await screen.findByText(es.dashboard.title)).toBeInTheDocument();
        expect(await screen.findByText(es.dashboard.subtitle)).toBeInTheDocument();
        expect(buttonGoBack).toBeInTheDocument();

        fireEvent.click(buttonGoBack);
    });

    describe("Items component", () => {
        test("renders correctly", async () => {
            render(
                <I18nextProvider i18n={i18next}>
                    <ComponentTemplateDashboard header={{ title: es.dashboard.title, subtitle: es.dashboard.subtitle }} items={ItemsMain} viewRedirect={true} />
                </I18nextProvider>
            );

            const buttonTest = await screen.findByText(es.dashboard.sections.create_note.title);

            expect(buttonTest).toBeInTheDocument();
            expect(await screen.findByText(es.dashboard.sections.create_note.description)).toBeInTheDocument();
            expect(await screen.findByText(es.dashboard.sections.list_notes.title)).toBeInTheDocument();
            expect(await screen.findByText(es.dashboard.sections.list_notes.description)).toBeInTheDocument();
            expect(await screen.findByText(es.dashboard.sections.note_settings.title)).toBeInTheDocument();
            expect(await screen.findByText(es.dashboard.sections.note_settings.description)).toBeInTheDocument();

            fireEvent.click(buttonTest);
            fireEvent.mouseOver(buttonTest);
            fireEvent.mouseLeave(buttonTest);
        });
    });
});