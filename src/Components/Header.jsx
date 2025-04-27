import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { auth } from "../../FireBase";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Header() {
  const [userLogIn, setUserLogIn] = useState({});
  const [userUid, setUserUid] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user;
        setUserLogIn(user);
        setUserUid(uid.uid);
      }
    });
  });

  const logOutUser = () => {
    signOut(auth).then((res) => {
      navigate("/")
    }).catch((err) => {
      console.log(err);

    })
  }
  return (
    <header className="sticky top-0 z-50 bg-gray-900 dark:bg-slate-900 text-indigo-400 p-5 shadow-md  w-full">
      <div className="container mx-2 flex items-center justify-left">
        <FaUsers className="text-3xl mr-3" />
        <h1 className="text-3xl font-bold tracking-wide">
          Employee Management System
        </h1>
      </div>
      <div className="text-2xl font-sami-bold">

        {userUid && <h3>{userLogIn.displayName}</h3>}

        {userLogIn ? <Link><button onClick={() => logOutUser}>SignOut</button></Link> : <Link><button>SignIn</button></Link>}
      </div>
    </header>
  );
}

export default Header;
