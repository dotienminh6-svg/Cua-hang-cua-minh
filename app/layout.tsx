import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Font này tròn và rất sang
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AllInOneVN",
  description: "Dịch vụ mua hộ hàng quốc tế",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}