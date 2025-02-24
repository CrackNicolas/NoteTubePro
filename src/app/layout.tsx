import { Roboto } from 'next/font/google'
import { Metadata } from 'next/types'

import Provider from '@/context/provider'
import ClientOnly from '@/client/only'
import ComponentTemplateClerkProvider from '@/frontend/components/services/provider'

import ILayouts from '@/frontend/interfaces/layouts'

import { Component } from '@/frontend/types/component'
import { Languages } from '@/shared/enums/languages'

import './globals.css'

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'NoteTube',
	description: 'Aplicación de notas para organizar y gestionar tu información de forma eficiente.',
	keywords: ['Notas', 'Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind', 'CSS', 'HTML', 'Productividad', 'Organización'],
	icons: {
		icon: '/favicon.ico'
	},
	openGraph: {
		title: 'NoteTube - Tu aplicación de notas',
		description: 'Organiza tus pensamientos y proyectos con NoteTube, una aplicación simple y eficiente.',
		siteName: 'NoteTube',
		type: 'website'
	}
};

export default function RootLayout({ children }: ILayouts): Component {
	return (
		<html lang={Languages.SPANISH} >
			<head>
				<meta name="theme-color" content="#00ffff" />
			</head>
			<body className={roboto.className}>
				<ClientOnly>
					<ComponentTemplateClerkProvider>
						<Provider>
							{children}
						</Provider>
					</ComponentTemplateClerkProvider>
				</ClientOnly>
			</body>
		</html>
	)
}