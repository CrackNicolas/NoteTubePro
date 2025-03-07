import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import es from "@/shared/i18n/es/global.json";

import { fireEvent, render, screen } from "@testing-library/react";

import { APP_ROUTES } from '@/frontend/constant/app_rutes';

import ComponentMainHome from '@/frontend/components/layouts/home/sections/main/container';
import ComponentHeaderHome from '@/frontend/components/layouts/home/header';
import ComponentFooterHome from '@/frontend/components/layouts/home/sections/footer';
import ComponentAditionalHome from '@/frontend/components/layouts/home/sections/aditional';
import ComponentTestimoniesHome from '@/frontend/components/layouts/home/sections/testimonies/container';

describe("Home component", () => {
    test("header component renders correctly", async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ComponentHeaderHome title={es.home.title} subtitle={es.home.subtitle} />
            </I18nextProvider>
        );

        const link = screen.getByRole('link');

        expect(screen.getByTestId('icon-home')).toBeInTheDocument();
        expect(await screen.findByText(es.home.title)).toBeInTheDocument();
        expect(await screen.findByText(es.home.subtitle)).toBeInTheDocument();
        expect(await screen.findByText(es.home.button)).toBeInTheDocument();
        expect(link).toHaveAttribute('href', APP_ROUTES.dashboard.main);
        expect(link).not.toHaveAttribute('onClick');
        expect(link).not.toHaveAttribute('onMouseOver');
        expect(link).not.toHaveAttribute('onMouseLeave');

        fireEvent.mouseOver(link);
        fireEvent.mouseLeave(link);
    });

    test("main component renders correctly", async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ComponentMainHome />
            </I18nextProvider>
        );

        expect(await screen.findByText(es.home.sections.main.article_1.title)).toBeInTheDocument();
        expect(await screen.findByText(es.home.sections.main.article_1.subtitle)).toBeInTheDocument();
    });

    test("testimonies component renders correctly", async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ComponentTestimoniesHome />
            </I18nextProvider>
        );

        expect(await screen.findByText(es.home.sections.testimonies.items.description_1)).toBeInTheDocument();
    });

    test("aditional component renders correctly", async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ComponentAditionalHome />
            </I18nextProvider>
        );

        const link = screen.getByRole('link');

        expect(await screen.findByText(es.home.sections.footer.title)).toBeInTheDocument();
        expect(await screen.findByText(es.home.sections.footer.subtitle)).toBeInTheDocument();
        expect(link).toHaveAttribute('href', APP_ROUTES.dashboard.main);
        expect(link).not.toHaveAttribute('onClick');
        expect(link).not.toHaveAttribute('onMouseOver');
        expect(link).not.toHaveAttribute('onMouseLeave');

        fireEvent.mouseOver(link);
        fireEvent.mouseLeave(link);
    });

    test("footer component renders correctly", async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ComponentFooterHome />
            </I18nextProvider>
        );

        expect(await screen.findByText(componet => componet.includes(es.home.sections.footer.details))).toBeInTheDocument();
    });
});