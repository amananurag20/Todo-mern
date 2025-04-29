import React from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
const HomePage = () => {
  return <div>HomePage</div>;
};

export default HomePage;
