import React from "react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessages from "../../context/useSendMessages";

const TypeSend = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") {
      alert("Please enter a message");
      return;
    }
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh]  bg-gray-800">
        <div className=" w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
};

export default TypeSend;
