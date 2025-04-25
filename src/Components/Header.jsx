import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { auth } from "../../FireBase";
import { Link } from "react-router-dom";

function Header() {
  const [userLogIn, setUserLogIn] = useState(false);
  const [userUid, setUserUid] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserLogIn(user);
        setUserUid(uid);
      }
    });
  });
  return (
    <header className="sticky top-0 z-50 bg-gray-900 dark:bg-slate-900 text-indigo-400 p-5 shadow-md  w-full">
      <div className="container mx-2 flex items-center justify-left">
        <FaUsers className="text-3xl mr-3" />
        <h1 className="text-3xl font-bold tracking-wide">
          Employee Management System
        </h1>
      </div>
      <div className="text-2xl font-sami-bold">
        <Link></Link>
      </div>
    </header>
  );
}

export default Header;
