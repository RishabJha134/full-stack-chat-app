import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import sound from "../../assets/notification.mp3"
import { useSocketContextData } from "./SocketContext";

const useGetSocketMessage = () => {
  const { socket } = useSocketContextData();
  const { messages, setMessages } = useConversation();
  console.log(messages);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      console.log("new message: " + newMessage);
      const notification = new Audio(sound);
      notification.play();
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useGetSocketMessage;
