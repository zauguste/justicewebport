import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#FBFAFA] relative text-center">
      {/* Navigation Bar */}
      <nav className="flex justify-around w-full bg-[#333] text-white flex-wrap sm:flex-col sm:items-center">
        <a href="#" className="text-[#FF4C4F] font-bold text-2xl px-16 py-2 hover:text-[#FF4C4F]">
          Home
        </a>
        <a href="http://www.justiceauguste.art/portfolio.html" className="navbar-item font-bold text-2xl px-16 py-2 hover:text-[#FF4C4F]">
          Personal Work
        </a>
        <a href="#" className="navbar-item font-bold text-2xl px-16 py-2 hover:text-[#FF4C4F]">
          About Me
        </a>
        <a href="#" className="navbar-item font-bold text-2xl px-16 py-2 hover:text-[#FF4C4F]">
          Contact
        </a>
      </nav>
      
      {/* Top Image */}
      <Image
        id="topImage"
        src="/justice_auguste.png"
        alt="Top Image"
        width={350}
        height={200}
        className="w-[350px] h-auto sm:w-full"
      />


      {/* Main Image */}
      <Image
        id="mainImage"
        src="/AUD.gif"
        alt="Main Image"
        width={400}
        height={300}
        className="w-[400px] h-auto mt-5 sm:w-full"
      />

      {/* Footer */}
      <footer className="fixed bottom-0 right-0 p-4 text-[#FF4C4F] opacity-70 hover:opacity-100 transition-opacity">
        &copy; 2024 Justice Auguste. All rights reserved.
      </footer>
    </main>
  );
}
