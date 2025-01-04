/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	  ],
	theme: {
		extend: {
		  colors: {
			primary: '#1E40AF', // Bleu personnalisé
			secondary: '#F43F5E', // Rouge personnalisé
		  },
		},
	  },
	plugins: [],
  };
  