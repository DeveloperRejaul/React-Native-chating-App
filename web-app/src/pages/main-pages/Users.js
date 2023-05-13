import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { IoSearch } from "react-icons/io5";
import { headerHeight } from "./constences";
import "../../app.css";
import { useSelector } from "react-redux";
import { useChatContext } from "../../context/ChatContext";
import { useGetAllUsersQuery } from "../../redux/services/chatApi";

function Users({ display }) {
  const [users, setUsers] = useState([]);
  const { data, isSuccess } = useGetAllUsersQuery();

  const { setIsChat, setChatUser } = useChatContext();
  const receiveMessageUserId = useRef(null);

  // get user info
  const user = useSelector((state) => state.auth);
  const { id, image } = user;

  useEffect(() => {
    if (data) {
      const newUser = data?.users;
      setUsers([...newUser]);
    }
  }, [isSuccess]);

  const handleClick = (data) => {
    setIsChat(true);
    setChatUser({ ...data });
    receiveMessageUserId.current = data._id;
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
                  isOnline={ele.status == "offline" ? false : true}
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
                  </HStack>
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
