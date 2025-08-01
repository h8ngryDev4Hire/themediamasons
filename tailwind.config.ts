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
        'media-mason-green': '#09d408',
        'media-masons-purple': '#7c3aed',
        'media-masons-orange': '#f97316',
        'media-masons-green': '#09d408',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
      animation: {
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 1s infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'reverse': 'spin 1s linear infinite reverse',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      const newUtilities = {
        '.backdrop-blur': {
          backdropFilter: 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
        },
        '.backdrop-blur-sm': {
          backdropFilter: 'blur(4px)',
          '-webkit-backdrop-filter': 'blur(4px)',
        },
        '.backdrop-blur-md': {
          backdropFilter: 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
        },
        '.backdrop-blur-lg': {
          backdropFilter: 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
        },
        '.trans-ease': {
          'transition': 'all 0.3s ease',
        },
        // Scroll snap utilities
        '.snap': {
          'scroll-snap-type': 'var(--scroll-snap-direction, both) var(--scroll-snap-constraint, mandatory)',
        },
        '.snap-y': {
          '--scroll-snap-direction': 'y',
        },
        '.snap-x': {
          '--scroll-snap-direction': 'x',
        },
        '.snap-mandatory': {
          '--scroll-snap-constraint': 'mandatory',
        },
        '.snap-proximity': {
          '--scroll-snap-constraint': 'proximity',
        },
        '.snap-start': {
          'scroll-snap-align': 'start',
        },
        '.snap-end': {
          'scroll-snap-align': 'end',
        },
        '.snap-center': {
          'scroll-snap-align': 'center',
        },
        '.snap-align-none': {
          'scroll-snap-align': 'none',
        },
        '.snap-stop-always': {
          'scroll-snap-stop': 'always',
        },
        '.snap-stop-normal': {
          'scroll-snap-stop': 'normal',
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
        '.scroll-mt-16': {
          'scroll-margin-top': '4rem',
        },
        '.scroll-mt-20': {
          'scroll-margin-top': '5rem',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config 