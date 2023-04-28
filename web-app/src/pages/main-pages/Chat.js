import React, { useEffect, useRef } from "react";
import "../../app.css";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import Avatar from "../../components/Avatar/Avatar";
import DrawerCom from "../../components/Drawer/Drawer";
import { BiSearch } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { headerHeight } from "./constences";
import { IoEllipsisVertical } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateRoomMutation,
  useCreateChatMessageMutation,
} from "../../redux/services/chatApi";
import { socketServices } from "../../utilits/socketServices";

function Chat({ chatUser = {}, chatMessage = [{}], setChatMessage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");

  const [createChatRoom, response] = useCreateRoomMutation();
  const [createChatMessage, _] = useCreateChatMessageMutation();
  const roomId = useRef();
  const myId = useSelector((state) => state.auth.id);
  const messageReceiverId = chatUser._id;

  useEffect(() => {
    const handleRoom = async () => {
      createChatRoom({ userId: myId, otherUserId: messageReceiverId });
      await socketServices.emit("joinRoom", roomId.current, (sms) => {
        console.log(sms); //TODO
      });
    };
    handleRoom();
  }, [messageReceiverId]);

  useEffect(() => {
    const getAllMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/message/${roomId.current}`
        );
        const data = await response.json();
        setChatMessage([...data.allMessage.messages]);
      } catch (error) {
        console.log(error);
      }
    };
    if (response.data) {
      roomId.current = response.data;
      getAllMessage();
    }
  }, [response, messageReceiverId]);

  const handelSendMessage = async () => {
    inputValue !== "" &&
      setChatMessage((pre) => [...pre, { sender: myId, text: inputValue }]);
    setInputValue("");
    await socketServices.emit("sendMessage", roomId.current, inputValue);

    createChatMessage({
      text: inputValue,
      sender: myId,
      chatRoom: roomId.current,
    });
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
          onChange={(e) => setInputValue(e.target.value)}
        />
        <BsSendFill size={20} color="#537fe7" onClick={handelSendMessage} />
      </Box>
    </Box>
  );
}

export default Chat;
