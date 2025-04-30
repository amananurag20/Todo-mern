import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const HomePage = () => {
  const [text, setText] = useState("");
  const [room, setRoom] = useState("");

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    console.log(text);
    socket.emit("textChange", newText);
  };

  const handleRoomJoin = () => {
    if (!room) return;
    socket.emit("joinRoom", room);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6 space-y-6">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Collaborative Text Editor
        </h1>
        <textarea
          rows={15}
          className="w-full p-4 text-sm font-mono text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Start typing..."
          value={text}
          onChange={handleChange}
        />
      </div>

      <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter room to join"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          onClick={handleRoomJoin}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default HomePage;
