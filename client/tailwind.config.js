/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '6/4': '600 / 400'
      },
      border: {
        bottom: 'border border-b-black border-x-0 border-t-0'
      },
      colors: {
        primary: {
          400: 'var(--clr-primary-400)'
        }
      },
      fontFamily: {
        display: 'var(--ff-display)',
        body: 'var(--ff-body)'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.border-bottom': {
          border: '1px solid black',
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0'
        },
        '.border-top': {
          border: '1px solid black',
          borderBottom: '0',
          borderLeft: '0',
          borderRight: '0'
        }
      });
    }
  ]
};

