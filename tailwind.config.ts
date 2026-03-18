import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu xanh dương đậm từ logo của Minh
        'aio-blue': '#1e40af',  
        // Màu xanh lá tươi từ logo
        'aio-green': '#84cc16', 
        // Màu nền xám cực nhẹ để làm nổi bật thẻ sản phẩm
        'aio-bg': '#f8fafc',    
      },
    },
  },
  plugins: [],
};
export default config;