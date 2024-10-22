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
      colors: {
        "primary": "#000000",
        "secondary": "#00ffff",
        "tertiary": "#ffffff",
        "room": "#141313",
        "fifth": "#808080",
        "sixth": "#141313a4",
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
  plugins: [],
}
export default config
