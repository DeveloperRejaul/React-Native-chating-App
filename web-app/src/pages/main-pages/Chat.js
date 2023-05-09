import React, { useEffect, useState, useRef } from "react";
import "../../app.css";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { headerHeight } from "./constences";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  useCreateChatMessageMutation,
  useCreateRoomMutation,
} from "../../redux/services/chatApi";
import { useChatContext } from "../../context/ChatContext";
import { API_URL } from "../../config/config";
import Avatar from "../../components/Avatar/Avatar";
import DrawerCom from "../../components/Drawer/Drawer";
import typingIndicator from "../../assets/lottie/typingIndicator.json";
import {
  JOIN_ROOM,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  TYPING,
  STOP_TYPING,
} from "../../constants/action";
import LottieCom from "../../components/Lottie/Lottie";

function Chat({ chatUser = {} }) {
  const [typing, setTyping] = useState(false);
  const [typingEffect, setTypingEffect] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const [createChatMessage, _] = useCreateChatMessageMutation();
  const [createRoom, response] = useCreateRoomMutation();
  const myId = useSelector((state) => state.auth.id);
  const receiveMessageUserId = chatUser._id;
  const { chatMessage, setChatMessage, socket, setIsChatting } =
    useChatContext();
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (receiveMessageUserId) {
      createRoom({
        userId: myId,
        otherUserId: receiveMessageUserId,
      });
    }
  }, [receiveMessageUserId]);

  useEffect(() => {
    const init = async () => {
      if (response.status === "fulfilled") {
        try {
          socket.current.emit(JOIN_ROOM, response.data, (sms) => {
            console.log(sms);
          });

          const fetchData = await fetch(`${API_URL}/message/${response.data}`);
          const data = await fetchData.json();
          setChatMessage([...data.allMessage.messages]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    init();
  }, [response.status]);

  const handelSendMessage = async () => {
    socket.current.emit(STOP_TYPING, "stop typing", response.data);
    clearTimeout(timeoutIdRef.current);
    if (inputValue !== "") {
      setChatMessage((pre) => [
        ...pre,
        {
          sender: myId,
          text: inputValue,
          receiverId: receiveMessageUserId,
          time: moment(),
        },
      ]);
      setIsChatting(true);
      setInputValue("");
      if (response.status === "fulfilled") {
        socket.current.emit(
          SEND_MESSAGE,
          response.data,
          inputValue,
          receiveMessageUserId
        );
        createChatMessage({
          text: inputValue,
          sender: myId,
          chatRoom: response.data,
        });
      }
    }
  };

  // handle typing Effect
  const handleTyping = (type, e) => {
    const duration = 3000;
    const lastTyping = new Date().getTime();
    if (type === "KEYDOWN") {
      if (!typing) {
        setTyping(true);
        socket.current.emit(TYPING, "typing", response.data);
      }
    } else {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastTyping;
        if (timeDiff >= duration) {
          if (typing) {
            setTyping(false);
            socket.current.emit(STOP_TYPING, "stop typing", response.data);
          }
        }
      }, duration);
    }
    if (e?.key === "Enter") handelSendMessage();
  };

  useEffect(() => {
    socket.current.on(RECEIVE_MESSAGE, (message) => {
      setChatMessage((pre) => [
        ...pre,
        { sender: receiveMessageUserId, text: message },
      ]);
    });
    socket.current.on(TYPING, () => {
      setTypingEffect(true);
    });

    socket.current.on(STOP_TYPING, () => {
      setTypingEffect(false);
    });
    return () => {
      socket.current.off(RECEIVE_MESSAGE);
      socket.current.off(TYPING);
      socket.current.off(STOP_TYPING);
    };
  }, []);

  return (
    <Box
      width={"100"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100vh"}
      paddingBottom={"10"}
    >
      {/* Chat Header  */}
      <Box
        width={"100"}
        bg={"white"}
        height={headerHeight}
        display={["flex"]}
        alignItems={"center"}
        paddingX={"5"}
        borderBottom={"1px solid #ddd "}
        justifyContent={["space-between"]}
      >
        <Box cursor={"pointer"} display={["flex"]} onClick={() => onOpen()}>
          <Avatar image={chatUser.profilePicture} />
          <Box ml={["2"]}>
            <Text
              fontSize={["md"]}
              fontWeight={["medium"]}
              color={["blackAlpha.600"]}
            >
              {chatUser.name}
            </Text>
            <Text
              fontSize={["sm"]}
              fontWeight={["medium"]}
              color={["blackAlpha.500"]}
            >
              {"chatUser.profusion"}
            </Text>
          </Box>
        </Box>
        <Box display={"flex"}>
          <Box
            ml={"3"}
            padding={"1"}
            borderRadius={"full"}
            _hover={{ bg: "blackAlpha.300" }}
            cursor={"pointer"}
            transition={"ease-in-out .2s"}
          >
            <BiSearch size={23} color={"black"} />
          </Box>
          <Box
            _hover={{ bg: "blackAlpha.300" }}
            cursor={"pointer"}
            ml={"3"}
            padding={"1"}
            borderRadius={"full"}
            transition={"ease-in-out .2s"}
          >
            <IoEllipsisVertical size={23} color={"black"} />
          </Box>
        </Box>
        {/* Drawer  */}
        <DrawerCom
          isOpen={isOpen}
          onClose={onClose}
          size={"xs"}
          userData={chatUser}
        />
      </Box>

      {/* Chat Body  */}
      <Box
        paddingX={10}
        paddingY={5}
        display={"flex"}
        flexDirection={"column-reverse"}
        height="90vh"
        overflowY="scroll"
      >
        {chatMessage
          ?.map((element, index) => {
            return (
              <Box
                className={
                  element?.sender === myId ? "messageRight" : "messageLeft"
                }
                key={index}
              >
                <Text className="message">{element?.text}</Text>
              </Box>
            );
          })
          .reverse()}
      </Box>
      {typingEffect && <LottieCom animation={typingIndicator} />}
      {/* Chat Footer */}
      <Box
        display={"flex"}
        width={"90%"}
        marginX={"auto"}
        alignItems={"center"}
        backgroundColor={"white"}
        borderRadius={"2xl"}
        boxShadow={"sm"}
        overflow={"hidden"}
      >
        <input
          className="chatTextAria"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleTyping("KEYDOWN", e)}
          onKeyUp={() => handleTyping("KEYUP")}
        />
        <BsSendFill size={20} color="#537fe7" onClick={handelSendMessage} />
      </Box>
    </Box>
  );
}

export default Chat;
