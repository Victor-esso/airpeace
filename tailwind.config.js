/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        // 'xs' : '470px',
        
        // 'HD':'1280px',

        '3xl':'1920px',
        // 'FHD':'1920px',

        // '4xl':'2560px',
        // 'QHD':'2560px',
        // '2K':'2560px',

        // '5xl':'3840px',
        // 'UHD':'3840px',
        // '4K':'3840px',
      }
    },
  },
  plugins: [],
}

