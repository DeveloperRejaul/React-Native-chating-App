import React, { useEffect, useState } from "react";
import "../../app.css";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import Avatar from "../../components/Avatar/Avatar";
import DrawerCom from "../../components/Drawer/Drawer";
import { BiSearch } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { headerHeight } from "./constences";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";

import {
  useCreateChatMessageMutation,
  useCreateRoomMutation,
} from "../../redux/services/chatApi";
import { useChatContext } from "../../context/ChatContext";
import moment from "moment";
import { API_URL } from "../../config/config";
import {
  JOIN_ROOM,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  IS_TYPING,
} from "../../constants/action";

function Chat({ chatUser = {} }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const [createChatMessage, _] = useCreateChatMessageMutation();
  const [createRoom, response] = useCreateRoomMutation();
  const myId = useSelector((state) => state.auth.id);
  const receiveMessageUserId = chatUser._id;
  const { chatMessage, setChatMessage, socket, setIsChatting } =
    useChatContext();

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

  var countResiveMessage = 0;
  useEffect(() => {
    countResiveMessage++;
    if (countResiveMessage == 1) {
      socket.current.on(RECEIVE_MESSAGE, (message) => {
        setChatMessage((pre) => [
          ...pre,
          { sender: receiveMessageUserId, text: message },
        ]);
      });
    }

    return () => {
      setIsChatting(false);
    };
  }, [socket.current]);

  const handelInput = (value) => {
    setInputValue(value);
    // TODO
    // socket.current.emit(IS_TYPING, true);
  };

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
          onChange={(e) => handelInput(e.target.value)}
        />
        <BsSendFill size={20} color="#537fe7" onClick={handelSendMessage} />
      </Box>
    </Box>
  );
}

export default Chat;
