import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/v1/messages/get/${selectedConversation._id}`,
            {
              withCredentials: true,
            }
          );

          setMessages(response.data);
          setLoading(false);
        } catch (error) {
          // console.log("error fetching messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return { loading, messages };
};

export default useGetMessage;
