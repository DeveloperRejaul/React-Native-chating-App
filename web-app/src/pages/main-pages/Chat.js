import React, { useEffect, useRef, useState } from "react";
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

function Chat({ chatUser = {} }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const [createChatMessage, _] = useCreateChatMessageMutation();
  const [createRoom, response] = useCreateRoomMutation();
  const myId = useSelector((state) => state.auth.id);
  const receiveMessageUserId = chatUser._id;
  const roomId = useRef(null);
  const { chatMessage, setChatMessage, socket } = useChatContext();

  useEffect(() => {
    socket.current.emit("joinRoom", "123", (sms) => {
      console.log(sms);
    });
  }, []);

  const handelSendMessage = async () => {
    inputValue !== "" &&
      setChatMessage((pre) => [...pre, { sender: myId, text: inputValue }]);
    setInputValue("");
    socket.current.emit("sendMessage", "123", inputValue);
  };

  var count = 0;
  useEffect(() => {
    count++;
    if (count == 1) {
      socket.current.on("receiveMessage", (message) => {
        setChatMessage((pre) => [
          ...pre,
          { sender: receiveMessageUserId, text: message },
        ]);
      });
    }
  }, [socket.current]);

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
