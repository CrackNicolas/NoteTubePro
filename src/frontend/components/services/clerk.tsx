"use client"

import { dark } from '@clerk/themes'
import { UserButton, SignIn } from "@clerk/nextjs";
import { useEffect } from 'react';

import { APP_ROUTES } from '@/frontend/constant/app_rutes';

import { Component } from '@/frontend/types/component';
import { ThemeName } from "@/frontend/types/theme";

import IContext from '@/context/interfaces/context';
import useAppContext from '@/context/hooks/context';
import useAppTranslation from '@/shared/hooks/translation';

export function ComponentUserButton(): Component {
    const { theme }: IContext = useAppContext();

    return <UserButton appearance={{
        ...((theme == ThemeName.ligth) && { baseTheme: dark }),
        elements: {
            userPreview: "mb-3 px-4",
            userButtonPopoverCard: "mt-1 w-[300px]",
            userButtonPopoverActionButton: "px-4",
            userButtonPopoverActionButton__manageAccount: "hidden"
        }
    }} />
}

export function ComponentSignIn(): Component {
    const { theme }: IContext = useAppContext();

    const { translate } = useAppTranslation();

    const titleLogin: string = translate('clerk.signIn.title');
    const descriptionLogin: string = translate('clerk.signIn.description');

    useEffect(() => {
        const styleSheet: HTMLStyleElement = document.createElement('style');
        document.head.appendChild(styleSheet);

        const classContent = {
            ".cl-headerTitle::before": titleLogin,
            ".cl-card::after": descriptionLogin,
        }

        Object.entries(classContent).forEach(([className, content]: [string, string]) =>
            styleSheet.sheet?.insertRule(`${className} { content: "${content}"; }`)
        )

        return () => styleSheet.remove();
    }, [titleLogin, descriptionLogin])

    return <SignIn fallbackRedirectUrl={APP_ROUTES.home} appearance={{
        ...((theme == ThemeName.ligth) && { baseTheme: dark }),
        elements: {
            logoBox: "absolute right-2 top-2",
            card: "pr-6 pt-4 sm:pt-7 pb-4 after:w-full after:text-tertiary after:text-tertiary after:text-opacity-40 after:whitespace-pre-line after:text-sm ",
            headerTitle: "text-transparent mb-[-30px] text-center flex flex-col text-lg items-center before:text-gradient",
            socialButtonsRoot: "sm:flex sm:flex-col sm:gap-y-5",
            socialButtonsIconButton: "sm:w-[60px] sm:h-[50px]"
        }
    }} />
}