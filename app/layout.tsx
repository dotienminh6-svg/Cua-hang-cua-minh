import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // 1. Import font Nunito
import "./globals.css";

// 2. Cấu hình font
const nunito = Nunito({ 
  subsets: ["latin", "vietnamese"], // Hỗ trợ tiếng Việt
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "AllInOneVN",
  description: "Dịch vụ mua hộ hàng quốc tế",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* 3. Áp dụng font vào thẻ body */}
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}