import React, { useState, useRef, useCallback, useEffect } from "react";
import "../../app.css";
import { Box, useDimensions } from "@chakra-ui/react";
import SliderCom from "../../components/Slider/Slider";
import Users from "./Users";
import Chat from "./Chat";
import DefaultChat from "./DefaultChat";
import { useChatContext } from "../../context/ChatContext";

export default function MainScreen() {
  const elementRef = useRef();
  const slider = useRef();
  const { chatMessage, setChatMessage } = useChatContext();

  const [isChat, setIsChat] = useState(false);
  const [chatUser, setChatUser] = useState({});

  const dimensions = useDimensions(elementRef, true);
  const displayCondition = isChat && dimensions?.contentBox.width < 765;

  const handleChat = useCallback(async (data) => {
    setIsChat(true);
    setChatUser({ ...data });
  }, []);

  const handleSlider = useCallback((data) => {
    slider.current = data;
  }, []);

  return (
    <div style={styles.container} ref={elementRef}>
      {/* All user Part */}
      <Users
        handleChat={handleChat}
        display={displayCondition && "none"}
        lastMessage={{
          message: chatMessage[chatMessage?.length - 1],
          id: chatUser?.id,
        }}
        setChatMessage={setChatMessage}
      />

      {/* message part */}
      <Box
        display={["none", "none", "block"]}
        bg={"#f1f5f9"}
        style={{
          display: displayCondition && "block",
        }}
        width={displayCondition ? "100%" : "70%"}
      >
        {isChat ? (
          // Chat UI
          <Chat
            chatUser={chatUser}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
          />
        ) : (
          // Is Not Chat UI
          <DefaultChat />
        )}
      </Box>

      {displayCondition && (
        <SliderCom handleSlider={handleSlider}>
          <Users handleChat={handleChat} display={"block"} slider={slider} />
        </SliderCom>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    height: "100vh",
  },
};