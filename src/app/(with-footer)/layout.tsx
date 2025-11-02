import React from 'react';
import Footer from '../../components/Footer';

export default function WithFooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-grow min-h-0">{children}</main>
      <Footer />
    </>
  );
}
