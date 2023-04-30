import { io } from "socket.io-client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatMessage, setChatMessage] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    const socketInit = () => {
      socket.current = io("http://localhost:3000");
      socket.current.on("connect", socketConnect);
      socket.current.on("disconnect", socketDisconnect);
    };
    socketInit();
  }, []);

  const socketConnect = useCallback(() => {
    console.log("connected");
  }, []);

  const socketDisconnect = useCallback(() => {
    console.log("disconnected");
  }, []);

  return (
    <ChatContext.Provider
      value={{ socket, chatMessage, setChatMessage, setIsChatting, isChatting }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
