import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Quicksand', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Gamification Colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        // Province States
        conquered: "hsl(var(--conquered))",
        unlocked: "hsl(var(--unlocked))",
        locked: "hsl(var(--locked))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.15)',
        'glow-sm': '0 0 10px rgba(192, 57, 43, 0.3)',
        'glow-md': '0 0 20px rgba(192, 57, 43, 0.4), 0 0 40px rgba(192, 57, 43, 0.2)',
        'glow-lg': '0 0 30px rgba(192, 57, 43, 0.5), 0 0 60px rgba(192, 57, 43, 0.3)',
        'success-glow': '0 0 20px rgba(46, 204, 113, 0.4), 0 0 40px rgba(46, 204, 113, 0.2)',
        'warning-glow': '0 0 20px rgba(241, 196, 15, 0.4), 0 0 40px rgba(241, 196, 15, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.5)',
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)',
        '3d': '0 4px 0 hsl(var(--primary) / 0.8), 0 8px 16px rgba(0, 0, 0, 0.15)',
        '3d-hover': '0 6px 0 hsl(var(--primary) / 0.8), 0 12px 24px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(241, 196, 15, 0.4), 0 0 20px rgba(241, 196, 15, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(241, 196, 15, 0.6), 0 0 40px rgba(241, 196, 15, 0.3), 0 0 60px rgba(241, 196, 15, 0.1)' },
        },
        'pulse-success': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(46, 204, 113, 0.4), 0 0 20px rgba(46, 204, 113, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(46, 204, 113, 0.6), 0 0 40px rgba(46, 204, 113, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-down': {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'rotate-scale': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        'sparkle-rotate': {
          '0%, 100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
          '25%': { opacity: '0.8', transform: 'rotate(90deg) scale(1.1)' },
          '50%': { opacity: '0.6', transform: 'rotate(180deg) scale(0.9)' },
          '75%': { opacity: '0.8', transform: 'rotate(270deg) scale(1.1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        'float-slow': "float-slow 4s ease-in-out infinite",
        'pulse-glow': "pulse-glow 2s ease-in-out infinite",
        'pulse-success': "pulse-success 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        'bounce-in': "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        'slide-in-up': "slide-in-up 0.5s ease-out forwards",
        'slide-in-down': "slide-in-down 0.5s ease-out forwards",
        'slide-in-left': "slide-in-left 0.5s ease-out forwards",
        'slide-in-right': "slide-in-right 0.5s ease-out forwards",
        'rotate-scale': "rotate-scale 2s ease-in-out infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        'sparkle-rotate': "sparkle-rotate 3s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        'gradient-shift': "gradient-shift 3s ease-in-out infinite",
        'fade-scale-in': "fade-scale-in 0.3s ease-out forwards",
        'count-up': "count-up 0.4s ease-out forwards",
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
