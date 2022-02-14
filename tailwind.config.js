module.exports = {
  content: [
    "./packages/ui/**/*.{js,ts,jsx,tsx}",
    "./apps/market/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/market/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        'custum-aspect': '5 / 4'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
