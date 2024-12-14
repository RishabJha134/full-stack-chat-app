import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import sound from "../../assets/notification.mp3"
import { useSocketContextData } from "./SocketContext";

const useGetSocketMessage = () => {
  const { socket } = useSocketContextData();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
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
