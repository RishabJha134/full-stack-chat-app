import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/messages/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true,
        }
      );
      console.log("Message sent:", response.data);
      setMessages([...messages, response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessages;
