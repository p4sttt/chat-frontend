import React from "react";
import axios from "axios";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import socket from "./socket";
import { useNavigate } from 'react-router-dom'

export default function JoinRoom() {
  const [userName, setUserName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate()

  const [setName, setRoom] = useStore(
    (state) => [state.setName, state.setRoom],
    shallow
  );

  const handleClick = async () => {
    if (!userName || !roomId) {
      return console.log("error");
    }
    setIsLoading(true);
    await axios
      .post("/connect", { id: roomId })
      .then((res) => {
        setName(userName)
        setRoom(res.data)
      })
      .catch((res) => console.log(res.response.data.message))
      .finally(setIsLoading(false));
    socket.emit("CHAT:JOIN", {roomId, userName});
    navigate("/", {replace: true})
  };

  return (
    <div className="w-1/5 m-auto flex flex-col items-center gap-y-8 mt-24">
      <h1 className="text-4xl font-semibold">Hello world</h1>
      <div className="flex flex-col gap-y-2 items-center w-full">
        <input
          className="outline outline-0 w-full"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="outline outline-0 w-full"
          placeholder="room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button
        className={
          !isLoading
            ? "text-slate-50 bg-indigo-600 py-2 px-6 w-full rounded-full"
            : "text-slate-50 bg-indigo-300 py-2 px-6 w-full rounded-full"
        }
        disabled={isLoading}
        onClick={handleClick}
      >
        {isLoading ? "loading..." : "connect"}
      </button>
    </div>
  );
}
