import React from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import socket from "./socket";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [Name, roomId, unsetData] = useStore(
    (state) => [state.Name, state.Room.roomId, state.unsetData],
    shallow
  );
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on("CHAT:JOINED", (useName) =>
      console.log(useName, "joined to chat")
    );
  }, [messages]);
  
  socket.on("MESSAGE:RECIVE", (message) => {
    setMessages([...messages, message])
  })
  
  const sendMessage = () => {
    if (message) {
      socket.emit("MESSAGE:SEND", { message, roomId });
    }
    setMessage("");
  };

  const logout = () => {
    unsetData();
    socket.emit("CHAT:LEAVE", roomId);
    navigate("/", { replace: true });
  };

  return (
    <div className="w-4/6 mx-auto">
      <div className="flex flex-row w-full justify-between py-4 px-8 bg-indigo-600 rounded-b-xl">
        <div className="flex flex-col">
          <h1 className="font-medium text-2xl text-indigo-50">{Name}</h1>
          <h1 className="font-normal text-sm text-indigo-300">{roomId}</h1>
        </div>
        <button onClick={() => logout()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 stroke-indigo-50 ease-linear duration-100 hover:stroke-indigo-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col justify-start align-top h-full mt-8">
        {messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </div>
      <div className="flex flex-row fixed align-center gap-x-2 w-4/6 bottom-4">
        <textarea
          className="w-full form-control px-2 py-1.5 border border-solid border-gray-300 rounded-xl bg-white
        text-gray-700 transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-gray-800 focus:outline-none
"
          value={message}
          placeholder="type your message here"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="w-2/6 h-full border-2 bg-white border-indigo-600 text-indigo-600 rounded-xl font-semibold py-4 hover:bg-indigo-600 hover:text-slate-50 ease-in duration-75"
          onClick={() => sendMessage()}
        >
          send message
        </button>
      </div>
    </div>
  );
}
