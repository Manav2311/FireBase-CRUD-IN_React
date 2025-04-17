import React from "react";
import { FaUsers } from "react-icons/fa";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 dark:bg-slate-900 text-indigo-400 p-5 shadow-md  w-full">
      <div className="container mx-2 flex items-center justify-left">
        <FaUsers className="text-3xl mr-3" />
        <h1 className="text-3xl font-bold tracking-wide">
          Employee Management System
        </h1>
      </div>
    </header>
  );
}

export default Header;
