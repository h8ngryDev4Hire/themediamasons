import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'media-mason-purple': '#7c3aed',
        'media-mason-orange': '#f97316',
        'media-mason-green': '#09d408'
      },
    },
  },
  plugins: [],
}

export default config
