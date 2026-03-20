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
        {/* Hệ thống nền của Facebook */}
        <div id="fb-root"></div>
        
        {/* Nhúng bộ SDK của Facebook */}
        <Script 
          async 
          defer 
          crossOrigin="anonymous" 
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0&appId=1516496857148063" 
          strategy="lazyOnload"
        />
        
        {children}
      </body>
    </html>
  );
}

