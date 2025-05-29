import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				nunito: ['Nunito', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				peach: {
					50: '#FFF8F5',
					100: '#FFF1EA',
					200: '#FFE4D5',
					300: '#FFD6C2',
					400: '#FFC7AB',
					500: '#FFAF8A', // base peach
					600: '#FF966B',
					700: '#FF7D4B',
					800: '#FF642C',
					900: '#FF4A0D',
				},
				lilac: {
					50: '#F8F5FF',
					100: '#F1EAFF',
					200: '#E4D6FF',
					300: '#D5C2FF',
					400: '#C7ABFF',
					500: '#B68AFF', // base lilac
					600: '#A56BFF',
					700: '#944BFF',
					800: '#832CFF',
					900: '#720DFF',
				},
				mint: {
					50: '#F5FFF8',
					100: '#EAFFF1',
					200: '#D5FFE4',
					300: '#C2FFD6',
					400: '#ABFFC7',
					500: '#8AFFAF', // base mint
					600: '#6BFF96',
					700: '#4BFF7D',
					800: '#2CFF64',
					900: '#0DFF4A',
				},
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-subtle': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'bounce-in': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'60%': { transform: 'translateY(-5px)', opacity: '1' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
				},
				'pulse-dot': {
					'0%, 80%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
					'40%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'shimmer': 'shimmer 2.5s infinite linear',
				'float': 'float 3s ease-in-out infinite',
				'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
				'pulse-dot': 'pulse-dot 1.4s ease-in-out infinite'
			},
			animationDelay: {
				'0': '0ms',
				'150': '150ms',
				'300': '300ms'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
