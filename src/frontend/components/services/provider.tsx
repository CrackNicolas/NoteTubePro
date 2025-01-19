import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
import { Props_layouts } from '@/frontend/types/props'

const localization = {
    ...esES,
    formFieldInputPlaceholder__emailAddress: "Introduce tu correo electrónico",
}

export default function ComponentTemplateClerkProvider({ children }: Props_layouts): JSX.Element {
    return (
        <ClerkProvider localization={localization}>
            {children}
        </ClerkProvider>
    )
}