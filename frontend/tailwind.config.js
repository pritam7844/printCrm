export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#264f43',
          dark: '#18392f',
          deep: '#0c251f',
          soft: '#edf8f3',
          line: '#cfe4db',
          mint: '#4db39a'
        },
        accent: {
          DEFAULT: '#e8521a',
          hover: '#f07240',
          light: '#fde8df'
        },
        ink: {
          DEFAULT: '#1f2724',
          muted: '#33423d',
          light: '#5f6e68',
          extra: '#8b9892'
        },
        paper: {
          DEFAULT: '#f7faf8',
          card: '#ffffff',
          soft: '#f1f5f3',
          border: '#d9e2df'
        },
        system: {
          green: '#1a7a4a',
          greenLight: '#d8f0e4',
          amber: '#c47a10',
          amberLight: '#fef0d0',
          red: '#c41a1a',
          redLight: '#fde4e4',
          purple: '#6a1ac4',
          purpleLight: '#ede4fd',
          blue: '#1a4ac4',
          blueLight: '#e4ecfd'
        }
      },
      fontFamily: {
        syne: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      },
      boxShadow: {
        card: '0 2px 14px rgba(24, 57, 47, 0.08)',
        float: '0 14px 40px rgba(24, 57, 47, 0.16)'
      }
    }
  },
  plugins: []
};
