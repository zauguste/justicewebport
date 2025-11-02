import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Justice Auguste Portfolio',
  description: '2D Animation Portfolio of Justice Auguste',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="flex flex-col flex-grow min-h-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
