module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#e6eeff',
          500: '#6b46ff'
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
        'blue-purple': 'linear-gradient(90deg,#3b82f6 0%,#8b5cf6 100%)'
      }
    }
  },
  plugins: []
}
