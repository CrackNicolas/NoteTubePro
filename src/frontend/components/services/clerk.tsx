'use client'

import { dark } from '@clerk/themes'
import { UserButton, SignIn } from "@clerk/nextjs";

import { APP_ROUTES } from '@/frontend/constant/app_rutes';

import { Component } from '@/frontend/types/component';
import { ThemeName } from "@/frontend/types/theme";

import IContext from '@/context/interfaces/context';
import useAppContext from '@/context/hooks/context';

export function ComponentUserButton(): Component {
    const props: IContext = useAppContext();

    return <UserButton appearance={{
        ...((props.theme == ThemeName.ligth) && { baseTheme: dark }),
        elements: {
            userPreview: "mb-3 px-4",
            userButtonPopoverCard: "mt-1 w-[300px]",
            userButtonPopoverFooter: "hidden",
            userButtonPopoverActionButton: "px-4",
            userButtonPopoverActionButton__manageAccount: "hidden",
            userButtonPopoverActionButtonText__signOut: "text-transparent before:text-tertiary before:content-['Cerrar_sesión']"
        }
    }} />
}
export function ComponentSignIn(): Component {
    const props: IContext = useAppContext();

    return <SignIn fallbackRedirectUrl={APP_ROUTES.home} appearance={{
        ...((props.theme == ThemeName.ligth) && { baseTheme: dark }),
        elements: {
            logoBox: "absolute right-2 top-2",
            alert: "hidden",
            card: "px-7 sm:px-10 pt-7 sm:pt-10 pb-7 sm:pb-10",
            footer: "hidden",
            socialButtons: 'mt-[-25px]',
            dividerText: "hidden",
            headerTitle: "text-transparent text-center flex flex-col items-center before:dark:text-dark-secondary before:text-tertiary before:content-['Iniciar_sesión']",
            headerSubtitle: "my-[-20px] text-sm text-transparent flex flex-col items-center before:text-center before:dark:text-dark-secondary before:text-tertiary before:content-['Continua_con_tu_aplicación_de_notas']",
            formFieldLabel: "text-transparent before:text-tertiary before:dark:text-dark-secondary before:content-['Correo_electrónico']",
            formHeaderTitle: "text-transparent before:text-tertiary before:content-['Código_de_verificación']",
            footerActionText: "hidden",
            footerActionLink: "hidden",
            formResendCodeLink: "before:content-['Reenviar_código'] before:text-blue-500 before:w-full before:text-center flex flex-col hover:no-underline invisible before:visible",
            formHeaderSubtitle: "text-transparent before:text-tertiary before:content-['Ingrese_el_código_de_verificación_enviado_a_su_dirección_de_correo_electrónico']",
            formFieldErrorText: "before:content-['Cuenta_no_encontrada'] before:text-red-500 before:absolute before:ml-6 w-full text-transparent",
            otpCodeFieldErrorText: "before:content-['Código_incorrecto'] before:text-red-500 before:absolute before:ml-6 w-full text-transparent"
        }
    }} />
}