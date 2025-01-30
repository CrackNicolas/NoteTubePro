import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/frontend/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				sz: '1400px'
			},
			boxShadow: {
				'sm': '0 0 7px 0px'
			},
			backgroundImage: {
				'custom-gradient': 'linear-gradient(to right, #3B82F6, #10B981)',
				'custom-gradient-red': 'linear-gradient(to right, #ff0000, #141313)',
				'text-gradient': 'linear-gradient(to right, #3B82F6, #10B981)',
			},
			colors: {
				"primary": "#000000",
				"secondary": "#00ffff",
				"tertiary": "#ffffff",
				"room": "#141313",
				"fifth": "#808080",
				"sixth": "#141313a4",
				"seventh": "#4ade80",
				"error": "#ff0000",
				dark: {
					primary: '#F3F4F6',
					secondary: '#1F2937',
					tertiary: '#4B5563',
					room: '#FFFFFF',
					fifth: '#1F2937',
					sixth: '#FFFFFF',
					error: 'red',
				},
			}
		}
	},
	plugins: [
		function ({ addUtilities }: any) {
			addUtilities({
				'.text-gradient': {
					backgroundImage: 'linear-gradient(to right, #3B82F6, #22C55E)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}
			});
		}
	],
}

export default config