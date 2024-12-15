import React from "react";
// import useConversation from "";
// import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

// import profile from "../../../public/user.jpg"; // getting photo from public folder.
import useConversation from "./../../zustand/useConversation";
import { useSocketContextData } from "./../../context/SocketContext";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContextData();
  const getOnlineUsersStatus = (userId) => {
    const result = onlineUsers.includes(userId) ? "Online" : "Offline";
    console.log("result: " + result);
    return result;
  };

  // console.log(selectedConversation.fullname);
  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
        <div
          className={`avatar ${
            getOnlineUsersStatus(selectedConversation._id)==="Online"
              ? "online"
              : "offline"
          }`}
        >
          <div className="w-16 rounded-full">
            <img
              src={
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
