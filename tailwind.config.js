import flowbitePlugin from 'flowbite/plugin'
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-vue/**/*.{js,ts,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
     flowbitePlugin
  ],
}

