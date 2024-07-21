import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
      },
      colors: {
        'purple': '#633CFF',
      },
    },
  },
  plugins: [],
};
export default config;
