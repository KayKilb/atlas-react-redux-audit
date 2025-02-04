// src/components/Header.tsx
import React from "react";
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-off-white-light pb-0 pt-0">
      <img className="mx-auto w-56" src={logo} alt="logo" />
    </header>
  );
};

export default Header;
