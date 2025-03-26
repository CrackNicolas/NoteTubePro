import Head from 'next/head';
import dynamic from 'next/dynamic'

import { Metadata } from 'next/types'

const Provider = dynamic(() => import('@/context/provider'), { ssr: false });
const ClientOnly = dynamic(() => import('@/client/only'), { ssr: false });
const ComponentTemplateClerkProvider = dynamic(() => import('@/frontend/components/services/provider'), { ssr: false });

import ILayouts from '@/frontend/interfaces/layouts'

import { roboto } from '@/frontend/fonts/fonts';
import { Component } from '@/frontend/types/component'
import { Languages } from '@/shared/enums/languages';

import './globals.css'

export const metadata: Metadata = {
	metadataBase: new URL('https://notetubepro.vercel.app'),
	title: 'NoteTube',
	description: 'Aplicación de notas para organizar y gestionar tu información de forma eficiente.',
	keywords: ['Notas', 'Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind', 'CSS', 'HTML', 'Productividad', 'Organización'],
	manifest: "/manifest.json",
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
		<html lang={Languages.SPANISH}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content="#00ffff" />
			</Head>
			<body className={`${roboto.className} antialiased`}>
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