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
import { BASE_URL } from "../config/config";
import { CONNECT, DIS_CONNECT } from "../constants/action";
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatMessage, setChatMessage] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    const socketInit = () => {
      socket.current = io(BASE_URL);
      socket.current.on(CONNECT, socketConnect);
      socket.current.on(DIS_CONNECT, socketDisconnect);
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
