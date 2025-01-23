import { Suspense } from 'react'

import { esES } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'

import { Component } from '@/frontend/types/component'

import ILayouts from '@/frontend/interfaces/layouts'

import ComponentLoad from '@/frontend/components/partials/load'

const localization = {
    ...esES,
    formFieldInputPlaceholder__emailAddress: "Introduce tu correo electrónico",
}

export default function ComponentTemplateClerkProvider({ children }: ILayouts): Component {
    return (
        <ClerkProvider localization={localization}>
            <Suspense fallback={<ComponentLoad />} >
                {children}
            </Suspense>
        </ClerkProvider>
    )
}