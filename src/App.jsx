import React from "react";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./authentication/Signin";
import SignUp from "./authentication/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signIn" element={<Signin />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
