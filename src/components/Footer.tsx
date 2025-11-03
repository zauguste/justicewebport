// justicewebport/src/components/Footer.tsx
"use client";

import Image from "next/image";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <p className="footer__copy">
        &copy; {new Date().getFullYear()} Justice Auguste. All rights reserved.
      </p>
      <Image
        src="/J_LOGO_SIMPLIFIED_WHITE.svg"
        alt="Justice Auguste logo"
        width={36}
        height={36}
        className="footer__logo"
      />
    </div>
  </footer>
);

export default Footer;
