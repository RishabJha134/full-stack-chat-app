import { create } from "zustand";

const useConversation = create((set) => ({
  // Initial state
  selectedConversation: null,
  messages: [],

  // Function to update selectedConversation
  setSelectedConversation: (data) => {
    set({ selectedConversation: data });
  },

  // Function to update messages
  setMessages: (data) => {
    set({ messages: data });
  },
}));

export default useConversation;
