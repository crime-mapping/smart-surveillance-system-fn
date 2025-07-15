const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  darkMode: ["class", "class"], // Enable dark mode using class strategy
  theme: {
  	extend: {
  		backgroundImage: {
  			primaryBackground: 'linear-gradient(to bottom, var(--primary-gradient-start), var(--primary-gradient-end))',
  			invertedPrimaryBackground: 'linear-gradient(to top, var(--primary-gradient-start), var(--primary-gradient-end))'
  		},
  		colors: {
  			primaryGradientStart: 'var(--primary-gradient-start)',
  			primaryGradientEnd: 'var(--primary-gradient-end)',
  			bg: 'var(--bg-color)',
  			text: 'var(--text-color)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  		}
  	}
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--bg-color": "#ffffff",
          "--bg-color2": "#f3f4f6",
          "--bg-color-hover": "#e5e7eb",
          "--bg-color-dark": "#d1d5db",
          "--text-color": "#1f2937",
          "--card-bg": "#f9fafb",
          "--primary": "#3b82f6",
          "--primary-gradient-start": "#000000",
          "--primary-gradient-end": "#08203E",
          "--primary-background":
            "linear-gradient(to bottom, var(--primary-gradient-start), var(--primary-gradient-end))",
        },
        "[data-theme='dark']": {
          "--bg-color": "#1f2937",
          "--bg-color2": "#2d3748",
          "--bg-color-hover": "#374151",
          "--bg-color-dark": "#111827",
          "--text-color": "#f3f4f6",
          "--card-bg": "#000000",
          "--primary": "#2563eb",
          "--primary-gradient-start": "#000000",
          "--primary-gradient-end": "#08203E",
          "--primary-background":
            "linear-gradient(to bottom, var(--primary-gradient-start), var(--primary-gradient-end))",
        },
      });
    }),
      require("tailwindcss-animate")
],
};
