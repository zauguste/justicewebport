import "./globals.css";
import Footer from "../components/Footer";
import SiteNav from "../components/SiteNav";

export const metadata = {
  title: "Justice Auguste Portfolio",
  description: "2D Animation Portfolio of Justice Auguste",
  icons: {
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load Inter directly from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Inter] min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex flex-col flex-grow min-h-0 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
