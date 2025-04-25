import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FireBase";

function SignUp() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password == formData.confirmPassword) {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
        .then((user) => {
          updateProfile(auth.currentUser, { displayName: formData.name });
          console.log(user.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("Registering:", formData);
    setFormData({})
    navigate("/")
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Create Account
        </h2>

        <div className="mb-5">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name ? formData.name : ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email ? formData.email : ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password ? formData.password : ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword ? formData.confirmPassword : ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold text-lg py-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to={"/signIn"} className="text-indigo-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
