import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FireBase";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  let navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userDetails) => {
        let userData = userDetails.user;
        console.log(userData);
        
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Sign In
        </h2>

        <div className="mb-5">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold text-lg py-3 rounded-lg transition"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to={"/signUp"} className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
