import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'aio-blue': '#1e40af',   // Màu xanh dương logo
        'aio-green': '#84cc16',  // Màu xanh lá logo
        'aio-bg': '#f8fafc',     // Màu nền xám nhẹ
      },
    },
  },
  plugins: [],
};
export default config;