import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //user authenticated or not
  // const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/users/verify-token",
          {
            withCredentials: true,
          }
        );

        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          toast.error("invalid Token");
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
        toast.error("something went wrong");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    tokenVerify();

    let id = setInterval(() => {
      tokenVerify();
    }, 1000 * 30);

    return () => {
      clearInterval(id);
    };
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
