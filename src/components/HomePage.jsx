import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const HomePage = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    console.log(text);
    socket.emit("textChange", newText);
  };

  useEffect(() => {
    socket.on("updatedText", (data) => {
      setText(data);
      console.log("Updated text received:", data);
    });

    return () => {
      socket.off("updatedText");
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Collaborative Text Editor
        </h1>
        <textarea
          rows={15}
          className="w-full p-4 text-sm font-mono text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Start typing..."
          value={text}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default HomePage;
