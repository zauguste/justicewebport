// justicewebport/src/components/Footer.tsx
"use client";

import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <p className="footer__copy">
        &copy; {new Date().getFullYear()} Justice Auguste. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
