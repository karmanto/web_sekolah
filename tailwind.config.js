/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'ol': {
              listStyleType: 'decimal',
              marginLeft: '1.25rem',
            },
            'ol li em': {
              listStyleType: 'disc', 
              display: 'list-item',
              marginLeft: '1.25em',                                             
            },
            'ul': {
              listStyleType: 'disc',
              marginLeft: '1.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
