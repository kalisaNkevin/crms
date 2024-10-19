import React, { FC } from "react";
import MainNav from "./headerDesktop";
import MobileNav from "./headerMobile";

const Header: FC = () => {
  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
