'use client'

import { dark } from '@clerk/themes'
import { UserButton, SignIn } from "@clerk/nextjs";

import { APP_ROUTES } from '@/frontend/constant/app_rutes';

import { Component } from '@/frontend/types/component';
import { ThemeName } from "@/frontend/types/theme";

import IContext from '@/context/interfaces/context';
import useAppContext from '@/context/hooks/context';

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

    return <SignIn fallbackRedirectUrl={APP_ROUTES.home} appearance={{
        ...((theme == ThemeName.ligth) && { baseTheme: dark }),
        elements: {
            logoBox: "absolute right-2 top-2",
            card: "px-7 sm:px-10 pt-7 sm:pt-10 pb-7 sm:pb-10",
            headerTitle: "text-transparent mb-[-20px] text-center flex flex-col items-center before:dark:text-dark-secondary before:text-tertiary before:content-['Login']",
        }
    }} />
}