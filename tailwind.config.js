const { secondary } = require('daisyui/src/colors/colorNames');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "blue",
          "primary-focus": "mediumblue",
          "base-100": "#F2F2F2"
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#BB86FC",
          "primary-content": "#000000",
          secondary: "#03DAC6",
          "secondary-content": "#000000",
          "base-100": "#121212",
          "base-200": "#121212",
          "base-300": "#121212",
          "base-content": "#FFFFFF"

        }
      }
    ]
  }
}
