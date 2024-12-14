import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContextData } from "../../context/SocketContext";

const User = ({ item }) => {
  // console.log("item" + JSON.stringify(item));

  const { selectedConversation, setSelectedConversation } = useConversation();
  // console.log("setSelectedConversation" + JSON.stringify(selectedConversation));
  const isSelected = selectedConversation?._id === item._id;

  const { socket, onlineUsers } = useSocketContextData();
  // console.log("setSocket" + socket);
  // console.log("setOnlineUsers" + onlineUsers);

  const isOnline = onlineUsers.includes(item._id);
  // console.log("isOnline" + isOnline);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => {
        setSelectedConversation(item);
      }}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{item.fullname}</h1>
          <span>{item.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
