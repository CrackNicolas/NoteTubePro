"use client"

import { Suspense } from 'react'

import { esES, enUS } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'

import { Component } from '@/frontend/types/component'
import { Languages } from '@/shared/enums/languages'

import ILayouts from '@/frontend/interfaces/layouts'
import useAppTranslation from '@/shared/hooks/translation'

import ComponentLoad from '@/frontend/components/partials/load'

export default function ComponentTemplateClerkProvider({ children }: ILayouts): Component {
    const { translate, language } = useAppTranslation();

    const localization = {
        ...(language === Languages.SPANISH) ? { ...esES } : { ...enUS },
        formFieldInputPlaceholder__emailAddress: translate('clerk.signIn.input.placeholder'),
        userButton: {
            action__signOut: translate('clerk.signIn.button_close')
        }
    }

    return (
        <ClerkProvider localization={localization} dynamic>
            <Suspense fallback={<ComponentLoad />} >
                {children}
            </Suspense>
        </ClerkProvider>
    )
}