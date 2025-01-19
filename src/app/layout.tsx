import { Metadata } from 'next/types'
import { Roboto } from 'next/font/google'

import Provider from '@/context/provider'
import ComponentTemplateClerkProvider from '@/frontend/components/services/provider'

import { Props_layouts } from '@/frontend/types/props'

import './globals.css'

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Aplicacion de notas',
	description: 'Creado por Beltran Ricardo Nicolas Alejo',
	keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind', 'CSS', 'HTML'],
	icons: {
		icon: '/favicon.ico'
	}
}

export default function RootLayout({ children }: Props_layouts): JSX.Element {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#00ffff" />
			</head>
			<body className={roboto.className}>
				<ComponentTemplateClerkProvider>
					<Provider>
						{children}
					</Provider>
				</ComponentTemplateClerkProvider>
			</body>
		</html>
	)
}