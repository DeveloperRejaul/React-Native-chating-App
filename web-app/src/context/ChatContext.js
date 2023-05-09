import { io } from "socket.io-client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { BASE_URL } from "../config/config";
import { CONNECT, DIS_CONNECT } from "../constants/action";
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatMessage, setChatMessage] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const [isChat, setIsChat] = useState(false);
  const socket = useRef(null);
  const slider = useRef();

  useEffect(() => {
    const socketInit = () => {
      socket.current = io(BASE_URL);
      socket.current.on(CONNECT, () => console.log("connected"));
      socket.current.on(DIS_CONNECT, () => console.log("disconnected"));
    };
    socketInit();

    return () => {
      socket.current.off(CONNECT);
      socket.current.off(DIS_CONNECT);
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        socket,
        chatMessage,
        setChatMessage,
        setIsChatting,
        isChatting,
        chatUser,
        setChatUser,
        isChat,
        setIsChat,
        slider,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
