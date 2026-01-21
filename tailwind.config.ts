import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// [Careons] Emerald Green Palette
  			emerald: {
  				50: '#ecfdf5',
  				100: '#d1fae5',
  				200: '#a7f3d0',
  				300: '#6ee7b7',
  				400: '#34d399',
  				500: '#10b981',
  				600: '#059669',
  				700: '#047857',
  				800: '#065f46',
  				900: '#064e3b',
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			},
			'text-shimmer': {
				'0%, 100%': {
					'background-position': '0% 50%'
				},
				'50%': {
					'background-position': '100% 50%'
				}
			},
			'blob': {
				'0%': {
					transform: 'translate(0px, 0px) scale(1)'
				},
				'33%': {
					transform: 'translate(30px, -50px) scale(1.1)'
				},
				'66%': {
					transform: 'translate(-20px, 20px) scale(0.9)'
				},
				'100%': {
					transform: 'translate(0px, 0px) scale(1)'
				}
			},
			'blob-slow': {
				'0%': {
					transform: 'translate(0px, 0px) scale(1) rotate(0deg)'
				},
				'25%': {
					transform: 'translate(80px, -100px) scale(1.3) rotate(10deg)'
				},
				'50%': {
					transform: 'translate(-60px, 80px) scale(0.7) rotate(-8deg)'
				},
				'75%': {
					transform: 'translate(50px, 60px) scale(1.2) rotate(12deg)'
				},
				'100%': {
					transform: 'translate(0px, 0px) scale(1) rotate(0deg)'
				}
			},
			'blob-slower': {
				'0%': {
					transform: 'translate(0px, 0px) scale(1) rotate(0deg)'
				},
				'20%': {
					transform: 'translate(-70px, -90px) scale(1.4) rotate(-10deg)'
				},
				'40%': {
					transform: 'translate(100px, 40px) scale(0.6) rotate(15deg)'
				},
				'60%': {
					transform: 'translate(-50px, 110px) scale(1.25) rotate(-12deg)'
				},
				'80%': {
					transform: 'translate(60px, -60px) scale(0.75) rotate(8deg)'
				},
				'100%': {
					transform: 'translate(0px, 0px) scale(1) rotate(0deg)'
				}
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
			'blob': 'blob 7s infinite',
			'blob-slow': 'blob-slow 7s ease-in-out infinite',
			'blob-slower': 'blob-slower 8s ease-in-out infinite'
		}
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
export default config;

