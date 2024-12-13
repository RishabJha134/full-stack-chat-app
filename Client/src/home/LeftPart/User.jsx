import React from "react";
import useConversation from "../../zustand/useConversation";

const User = ({ item }) => {
  console.log("item" + JSON.stringify(item));

  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log("setSelectedConversation" + JSON.stringify(selectedConversation))
  const isSelected = selectedConversation?._id === item._id;

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
        <div className="avatar online">
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
