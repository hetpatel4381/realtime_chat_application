import { useAppStore } from "@/store";
import { config } from "@/utils/config";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo } = useAppStore();
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);

  useEffect(() => {
    if (userInfo && !socket.current) {
      socket.current = io(config.serverOrigin, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to Socket Server");
        setIsSocketInitialized(true);
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
      };

      const handleReceiveChannelMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

      return () => {
        if (socket.current) {
          socket.current.disconnect();
          socket.current = null; // Ensure socket is reset on unmount
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={isSocketInitialized ? socket.current : null}>
      {children}
    </SocketContext.Provider>
  );
};
