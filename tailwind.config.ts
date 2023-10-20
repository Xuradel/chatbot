import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'avenir': ['Avenir Next LT Pro', 'sans-serif'],
      },
      fontWeight: {
        'light': '300',
        'regular': '500',
        'medium': '600',
        'bold': '700',
        'black': '900',
      },
      colors: {
        'custom-gray': '#121212',
        'custom-white': '#fdfbf7',
      },
    },
  },
  variants: {},
  plugins: [],
}
export default config
