import { Nunito } from 'next/font/google';

const nunito = Nunito({ 
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'] 
});

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}