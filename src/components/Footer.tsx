"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0F0F10] text-gray-300 text-center py-3 mt-auto">
      <p className="text-xs">
        © {new Date().getFullYear()} Justice Auguste
      </p>
    </footer>
  );
};




export default Footer;
