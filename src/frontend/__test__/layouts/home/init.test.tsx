import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import es from "@/shared/i18n/es/global.json";

import { fireEvent, render, screen } from "@testing-library/react";

import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import Template from "@/frontend/template/init";
import ComponentInit from '@/frontend/components/layouts/home/init';

describe("Init component", () => {

    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18next}>
                <Template>
                    <ComponentInit />
                </Template>
            </I18nextProvider>
        );
    });

    test("main component renders correctly", async () => {
        expect(await screen.findByText(`Version ${process.env.PROJECT_VERSION}`)).toBeInTheDocument();
    });

    test('nav top component renders correctly', async () => {
        const buttonMain = await screen.findByTitle("NoteTube");
        const loadingUser = await screen.findByTitle(es.menu.top.user);
        const buttonTranslate = await screen.findByTitle(es.menu.top.buttons.translate.title);

        expect(buttonMain).toBeInTheDocument();
        expect(buttonMain).toHaveAttribute('href', APP_ROUTES.home);
        expect(loadingUser).toBeInTheDocument();
        expect(buttonTranslate).toBeInTheDocument();

        fireEvent.click(loadingUser);
        fireEvent.click(buttonTranslate);

        const optionTranslateSpanish = await screen.findByTitle(es.menu.top.buttons.translate.options.spanish);
        const optionTranslateEnglish = await screen.findByTitle(es.menu.top.buttons.translate.options.english);

        expect(optionTranslateSpanish).toBeInTheDocument();
        expect(optionTranslateEnglish).toBeInTheDocument();

        fireEvent.click(optionTranslateSpanish);
    });

    test("nav left component renders correctly", async () => {
        const buttonHome = screen.getByText(es.menu.left.home);
        const buttonTheme = await screen.findAllByTitle(es.menu.left.theme.oscuro);
        const buttoDashboard = screen.getByText(es.menu.left.panel);

        fireEvent.mouseOver(buttonHome);
        fireEvent.mouseLeave(buttonHome);

        expect(buttonHome).toBeInTheDocument();
        expect(buttoDashboard).toBeInTheDocument();
        expect(buttonTheme[0]).toBeInTheDocument();

        fireEvent.click(buttonHome);
    });
});