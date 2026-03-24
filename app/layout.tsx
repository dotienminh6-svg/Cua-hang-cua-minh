import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Font này tròn và rất sang
import "./globals.css";
import Script from 'next/script'; // Thêm dòng này ở trên cùng

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {/* THIẾU CÁI NÀY LÀ KHÔNG CHẠY ĐƯỢC */}
        <div id="fb-root"></div>
        
        {/* Script tải SDK - Thay AppID của AllInOneVN vào đây */}
        <Script 
          async 
          defer 
          crossOrigin="anonymous" 
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=1516496857148063" 
          strategy="lazyOnload"
        />

        {children}
      </body>
    </html>
  )
}

