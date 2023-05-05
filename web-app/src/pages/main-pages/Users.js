import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { IoSearch } from "react-icons/io5";
import { headerHeight } from "./constences";
import "../../app.css";
import { useSelector } from "react-redux";
import { useChatContext } from "../../context/ChatContext";
import {
  useGetAllUsersQuery,
  useGetAllLastMessageQuery,
} from "../../redux/services/chatApi";
import { Time } from "../../utilits/timeConvater";
import moment from "moment";

function Users({ handleChat, display, slider }) {
  const [users, setUsers] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const { data, isSuccess } = useGetAllUsersQuery();
  const lastMessages = useGetAllLastMessageQuery(userId) || {};
  const { chatMessage, isChatting, socket } = useChatContext();
  const receiveMessageUserId = useRef(null);

  // TODO 
  socket.current?.on("receiveMessage", (message, receiverId) => {
    const updatedData = users.map((data) =>
      data._id === receiverId ? { ...data, message, time: moment() } : data
    );
    setUsers(updatedData);
  });

  // get user info
  const user = useSelector((state) => state.auth);
  const { id, image } = user;

  useEffect(() => {
    if (data) {
      const newUser = data?.users;
      const messages = lastMessages?.data?.lastMessagesInfo || [];
      const updatedUsers = newUser.map((user) => {
        const { _id } = user;
        const lastMessage = messages?.find((m) => m.receiverId === _id);
        return {
          ...user,
          message: lastMessage?.lastMessage,
          time: lastMessage?.time,
        };
      });

      setUsers([...updatedUsers]);
    }
  }, [isSuccess, lastMessages]);

  useEffect(() => {
    if (isChatting) {
      const lastMessage =
        chatMessage[chatMessage.length - 1] !== undefined &&
        chatMessage[chatMessage.length - 1];

      const updatedData = users.map((data) =>
        data._id === lastMessage?.receiverId
          ? { ...data, message: lastMessage.text, time: lastMessage.time }
          : data
      );

      setUsers(updatedData);
    }
  }, [isChatting, chatMessage]);

  const handleClick = (data) => {
    handleChat(data);
    receiveMessageUserId.current = data._id;
    if (slider !== undefined) {
      slider.current();
    }
  };

  return (
    <Box
      width={["100%", "100%", "30%"]}
      style={{
        ...styles.chat,
        display: display,
      }}
    >
      {/* User Header */}
      <div style={styles.header}>
        <Avatar isOnline image={image} />
        <div className="main-search-bar">
          <IoSearch size={28} color={"gray"} />
          <input
            style={styles.searchInput}
            type="text"
            name="search"
            id="main-search"
            placeholder="Search.."
          />
        </div>
      </div>
      {/* chat Body */}
      <div style={styles.chatBody} className="chat-body">
        {users
          ?.filter((data) => data._id !== id)
          .map((ele) => {
            return (
              <div
                key={ele?._id}
                style={styles.userItem}
                onClick={() => handleClick(ele)}
              >
                <Avatar
                  image={ele.profilePicture}
                  isOnline={(ele.status = "ofline" ? false : true)}
                />
                <VStack w={"100%"}>
                  <HStack justifyContent={["space-between"]} width={"100%"}>
                    <Text
                      marginLeft={["2"]}
                      color={"black"}
                      fontSize={["md"]}
                      fontWeight={["medium"]}
                    >
                      {ele.name}
                    </Text>
                    <Text
                      color={"black"}
                      fontSize={["sm"]}
                      fontWeight={["normal"]}
                    >
                      {Time.timeDiff(ele.time)}
                    </Text>
                  </HStack>
                  <Text style={{ marginLeft: "10px" }} alignSelf={"flex-start"}>
                    {ele.message}
                  </Text>
                </VStack>
              </div>
            );
          })}
      </div>
      {/* User Footer */}
      <Stack borderTop={["1px solid #ddd"]}>
        <Text
          textAlign={"center"}
          color={["blackAlpha.600"]}
          fontWeight={"normal"}
          mt={["2"]}
        >
          End-to-end encrypted
        </Text>
      </Stack>
    </Box>
  );
}

export default Users;

const styles = {
  chat: {
    backgroundColor: "#fff",
    borderRightWidth: "1px",
    borderRightColor: "#e5e7eb",
  },
  header: {
    height: headerHeight,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: "1px",
    display: "flex",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  searchInput: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  chatBody: {
    height: "82vh",
    overflowX: "hidden",
    overflowY: "scroll",
    padding: 20,
  },
  userItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    cursor: "pointer",
  },
};
