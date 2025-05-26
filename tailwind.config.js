/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: '#4F46E5',
			sub: '#6366F1',
		  }
		}
	  },
	},
	plugins: [],
  }