import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      toast.warning("please fill all the fields");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);
      if (data.success) {
        toast.success("user Logged  successfully");
        navigate("/homepage");
      } else {
        toast.error("something went wrong");
      }
    } catch (e) {
      toast.error("something went wrong");
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          New to this website?{" "}
          <Link to={"/signup"} className="text-blue-600 font-semibold">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
