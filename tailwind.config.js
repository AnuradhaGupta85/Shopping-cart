/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-hover': '#1D4ED8',
        text: '#111827',
        muted: '#6B7280',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        border: '#E5E7EB',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
      },
      borderRadius: {
        card: '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [],
}
