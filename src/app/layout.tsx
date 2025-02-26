import dynamic from 'next/dynamic'
import Head from 'next/head';

import { Roboto } from 'next/font/google'
import { Metadata } from 'next/types'

const Provider = dynamic(() => import('@/context/provider'), { ssr: false });
const ClientOnly = dynamic(() => import('@/client/only'), { ssr: false });
const ComponentTemplateClerkProvider = dynamic(() => import('@/frontend/components/services/provider'), { ssr: false });

import ILayouts from '@/frontend/interfaces/layouts'

import { Component } from '@/frontend/types/component'

import './globals.css'

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
	display: 'swap' //Evita que la fuente bloqueé el renderizado inicial
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
		<html>
			<Head>
				<meta name="theme-color" content="#00ffff" />
			</Head>
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