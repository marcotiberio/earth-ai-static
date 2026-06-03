/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './slices/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body / UI grotesk. Swap Inter for Earth AI's licensed sans once confirmed.
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        // Editorial display serif used for all headlines (the italic "New Industrial Era").
        // TODO: replace 'Tiempos Headline' with the licensed display face from Figma.
        serif: ['"Tiempos Headline"', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        // Earth AI palette — sampled from the Figma "V4_SCROLL" master frame.
        'ea-navy':  '#050F23', // page background
        'ea-cream': '#FAF3E4', // primary text / display
        'ea-grey':  '#8A93A6', // muted captions on navy
        // Back-compat aliases (older slices referenced these).
        'ea-black': '#050F23',
        'ea-white': '#FAF3E4',
      },
    },
  },
  plugins: [],
}
